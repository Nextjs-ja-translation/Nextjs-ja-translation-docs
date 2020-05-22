/* eslint-disable */
const url = require('url');
const visit = require('unist-util-visit');
const GitHubSlugger = require('github-slugger');

/**
 * 1. relative urls => github urls
 * 2. relative images => github images
 */
const ABSOLUTE_URL = /^https?:\/\/|^\/\//i;
const resolveURL = (base, href) => url.resolve(base, href.replace(/^\//, ''));

const toAbsoluteURL = ({ repo, img }) => node => {
  // match relative url
  if (node.properties) {
    let href = node.tagName === 'a' ? node.properties.href : node.properties.src;
    if (href && href[0] !== '#' && !ABSOLUTE_URL.test(href)) {
      if (node.tagName === 'a') {
        node.properties.href = resolveURL(repo, href);
      } else {
        node.properties.src = resolveURL(img, href);
      }
    }
  }
};

/**
 * tokenizer to match `<details>` or `<summary>`
 */
const C_TAB = '\t';
const C_SPACE = ' ';
const C_NEWLINE = '\n';

function generateTokenizer(name, repo) {
  return function (eat, value) {
    let index = 0;
    let length = value.length;
    let next;
    let line;

    let sequence = [
      new RegExp('^<' + name + '(?=(s|>|$))'),
      new RegExp('</' + name + '>'),
      name.length + 2
    ];

    // eat initial spacing
    while (index < length) {
      let character = value.charAt(index);
      if (character !== C_TAB && character !== C_SPACE) {
        break;
      }
      index++;
    }

    next = value.indexOf(C_NEWLINE, index + 1);
    next = next === -1 ? length : next;
    line = value.slice(index, next);

    if (!sequence[0].test(line)) {
      return;
    }

    index = index + sequence[2];
    let now = eat.now();
    now.column += index;
    now.offset += index;

    let valueStart = index;

    // match content
    while (index < length) {
      next = value.indexOf(C_NEWLINE, index + 1);
      next = next === -1 ? length : next;
      line = value.slice(index + 1, next);

      if (sequence[1].test(line)) {
        if (line) {
          index = next;
        }
        break;
      }

      index = next;
    }

    let subvalue = value.slice(0, index);
    let content = value.slice(valueStart, index - valueStart - 1);

    // trim content
    content = content
      .split('\n')
      .map(str => str.trim())
      .join('\n');

    // match links inside html (`<a></a>`)
    content = content.replace(/<a([^>]*)(>[^<]+<\/a>)/g, function (str, attr, rest) {
      attr = attr.replace(/href=(['"])([^'"]*)\1/, function (str, quote, href) {
        if (href && href[0] !== '#' && !ABSOLUTE_URL.test(href)) {
          return 'href=' + quote + resolveURL(repo, href) + quote;
        }
        return 'href=' + quote + href + quote;
      });

      // add target='_blank'
      if (!attr.match(/target=['"]_blank\1/)) {
        attr += ' target="_blank"';
      }

      return '<a' + attr + rest;
    });

    // return mdast with hast data
    let data = {
      type: name,
      data: {
        hName: name
      }
    };
    if (name === 'details') {
      data.children = this.tokenizeBlock(content, now);
    } else {
      data.children = [
        {
          type: 'html',
          value: content
        }
      ];
    }

    return eat(subvalue)(data);
  };
}

/**
 * Generate headings list
 */
const getHeadings = (ast, level) => {
  let headings = [
    {
      level: 0,
      title: 'Table of Contents'
    }
  ];
  let levelHeads = [headings];
  let tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(0, level);

  visit(
    ast,
    node => tags.indexOf(node.tagName) !== -1,
    node => {
      let level = tags.indexOf(node.tagName) + 1;
      let data = {
        level,
        title: node.children.map(node => node.value).join('')
      };

      do {
        if (!levelHeads.length) {
          break;
        }

        let currentLevelList = levelHeads[levelHeads.length - 1];
        if (!currentLevelList.length || currentLevelList[0].level === level) {
          // empty
          currentLevelList.push(data);
          break;
        } else if (currentLevelList[0].level < level) {
          // add as child
          let newLevelList = [data];
          levelHeads.push(newLevelList);
          currentLevelList.push(newLevelList);
          break;
        } else {
          // pop
          while (currentLevelList.length && currentLevelList[0].level > level) {
            levelHeads.pop();
            currentLevelList = levelHeads[levelHeads.length - 1];
          }
        }
      } while (true);
    }
  );

  return headings.slice(1);
};

/**
 * The plugin
 */
const readme = function (options) {
  if (!options.repo) {
    throw new Error('Please set a GitHub repo name in `options.repo`! e.g. `zeit/next.js`');
  }
  options.branch = options.branch || 'master';
  options.level = options.level || 6;

  // base URL
  let repo = 'https://github.com/' + options.repo + '/blob/' + options.branch + '/';
  let img = 'https://raw.githubusercontent.com/' + options.repo + '/' + options.branch + '/';

  const Parser = this.Parser;

  const tokenizers = Parser.prototype.blockTokenizers;
  tokenizers.details = generateTokenizer('details', repo);
  tokenizers.summary = generateTokenizer('summary', repo);

  const methods = Parser.prototype.blockMethods;
  methods.splice(methods.indexOf('html'), 0, 'summary');
  methods.splice(methods.indexOf('html'), 0, 'details');

  return function (ast) {
    visit(
      ast,
      node => node.tagName === 'a' || node.tagName === 'img',
      toAbsoluteURL({ repo, img })
    );

    let tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(0, options.level);
    const slugger = new GitHubSlugger();

    visit(ast, 'element', node => {
      if (tags.indexOf(node.tagName) !== -1) {
        node.properties.id = slugger.slug(node.children.map(node => node.value).join(''));
      }
    });

    let headings = getHeadings(ast, options.level);
    ast.children.push({
      type: 'export',
      value: 'export const headings = ' + JSON.stringify(headings)
    });
  };
};

module.exports = readme;
