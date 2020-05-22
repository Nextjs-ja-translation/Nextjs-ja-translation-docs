/* eslint-disable no-await-in-loop */
import algoliasearch from 'algoliasearch';
import unified from 'unified';
import markdown from 'remark-parse';
import toString from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';
import md5 from 'md5';
import { removeFromLast } from '../lib/docs/utils';
import { getCurrentTag, fetchDocsManifest } from '../lib/docs/page';
import { getRawFileFromRepo } from '../lib/github/raw';

const processor = unified().use(markdown);

function flattenRoutes(carry, { path, routes }) {
  if (path) {
    carry.push(path);
  } else if (routes) {
    routes.forEach(route => {
      flattenRoutes(carry, route);
    });
  }
  return carry;
}

function getText(node) {
  // Replace non-breaking spaces (char code 160) with normal spaces to avoid style issues
  return toString(node).replace(/\xA0/g, ' ');
}

async function addRecords(filePath, tag) {
  const md = await getRawFileFromRepo(filePath, tag);
  const tree = await processor.parse(md);
  const slugger = new GithubSlugger();
  const records = [];
  let record = {};
  let position = 0;
  const headings = {
    1(value) {
      record = { title: value };
    },
    2(value) {
      record.section = value;
      record.anchor = slugger.slug(value);

      delete record.subSection;
    },
    3(value) {
      record.subSection = value;
      record.anchor = slugger.slug(value);
    }
  };
  const addRecord = node => {
    const content = getText(node);
    const path = removeFromLast(filePath, '.');
    const objectID = `${path}-${md5(content)}`;

    records.push({ ...record, content, path, objectID, position });
    position += 1;
  };
  const handleNode = node => {
    if (node.type === 'heading') {
      const value = getText(node);

      if (headings[node.depth]) {
        headings[node.depth](value);
      } else {
        // Unhandled headings are added in its own record as the content
        record.anchor = slugger.slug(value);
        addRecord(node);
      }
    } else if (node.type === 'paragraph' || node.type === 'blockquote') {
      addRecord(node);
    } else if (node.type === 'list' || node.type === 'listItem') {
      if (node.children) {
        node.children.forEach(handleNode);
      }
    }
  };

  tree.children.forEach(handleNode);

  return records;
}

async function indexDocs() {
  const client = algoliasearch('NNTAHQI9C5', process.env.ALGOLIA_API_KEY);
  // Init the docs index, this will throw if the index doesn't exist
  const index = await client.initIndex('nextjs_docs');
  const tag = await getCurrentTag();
  const manifest = await fetchDocsManifest(tag);
  const files = manifest.routes.reduce(flattenRoutes, []);
  const recordsByFile = await Promise.all(files.map(filePath => addRecords(filePath, tag)));
  // Group all records into a single array
  const objects = recordsByFile.reduce((records, record) => {
    records.push(...record);
    return records;
  }, []);
  // Init a temporal index which will receive the objects
  const tmpIndex = await client.initIndex('nextjs_docs_tmp');

  // Copy the settings from the main index to the temporal index
  await client.copyIndex(index.indexName, tmpIndex.indexName, ['settings', 'rules']);

  while (objects.length) {
    const { taskID } = await tmpIndex.addObjects(objects.splice(0, 1000));
    await tmpIndex.waitTask(taskID);
  }

  // Move the temporal index to the docs index, this will rename the temporal index
  // so we don't have to remove it
  await client.moveIndex(tmpIndex.indexName, index.indexName);
}

indexDocs();
