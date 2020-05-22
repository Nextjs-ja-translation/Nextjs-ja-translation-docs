const path = require('path');
const rehypePrism = require('@mapbox/rehype-prism');
const nextMDX = require('@next/mdx');
const bundleAnalyzer = require('@next/bundle-analyzer');
const rehypeReadme = require('./lib/rehype-readme');

// only enable rehypeReadme for this file
// because the github relative path replacement
// might break things in other markdowns
//
const withGitHubMDX = nextMDX({
  extension: path.join(__dirname, 'components', 'docs', 'docs.mdx'),
  options: {
    hastPlugins: [
      rehypePrism,
      [
        rehypeReadme,
        {
          repo: 'zeit/next.js',
          branch: 'master',
          level: 4
        }
      ]
    ]
  }
});

const withMDX = nextMDX({
  extension: /[/\\](pages|blog|telemetry|components[/\\](home))[/\\](.+)\.mdx?$/,
  options: {
    hastPlugins: [rehypePrism]
  }
});

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const navigateBetweenPagesLessonsRedirect = [
  'adding-link-props',
  'client-side-history',
  'link',
  'hoc',
  'simple-but-powerful',
  'using-link'
].map(page => ({
  source: `/learn/basics/navigate-between-pages/${page}{/}?`,
  permanent: true,
  destination: '/learn/basics/navigate-between-pages'
}));

const apiRoutesLessonsRedirect = [
  'creating-an-api-route',
  'fetching-api-routes',
  'finally',
  'middlewares'
].map(page => ({
  source: `/learn/basics/api-routes/${page}{/}?`,
  permanent: true,
  destination: '/learn/basics/api-routes'
}));

const typeScriptLessonsRedirect = ['finally', 'home-page', 'page-types'].map(page => ({
  source: `/learn/excel/typescript/${page}{/}?`,
  permanent: true,
  destination: '/learn/excel/typescript'
}));

const basicsLessonsRedirect = [].concat(
  ...[
    ['getting-started', 'create-nextjs-app'],
    ['using-shared-components', 'assets-metadata-css'],
    ['create-dynamic-pages', 'dynamic-routes'],
    ['server-side-support-for-clean-urls', 'dynamic-routes'],
    ['clean-urls-with-dynamic-routing', 'dynamic-routes'],
    ['dynamic-routing', 'dynamic-routes'],
    ['fetching-data-for-pages', 'data-fetching'],
    ['styling-components', 'assets-metadata-css'],
    ['deploying-a-nextjs-app', 'deploying-nextjs-app']
  ].map(([before, after]) => [
    {
      source: `/learn/basics/${before}{/}?`,
      permanent: true,
      destination: `/learn/basics/${after}`
    },
    {
      source: `/learn/basics/${before}/:page{/}?`,
      permanent: true,
      destination: `/learn/basics/${after}`
    }
  ])
);

const excelLessonsRedirect = [].concat(
  ...[
    ['static-html-export', '/docs/advanced-features/static-html-export'],
    ['amp', '/docs/advanced-features/amp-support/introduction'],
    ['automatic-static-optimization', '/docs/advanced-features/automatic-static-optimization'],
    ['automatic-prerendering', '/docs/advanced-features/automatic-static-optimization']
  ].map(([before, after]) => [
    {
      source: `/learn/excel/${before}{/}?`,
      permanent: true,
      destination: after
    },
    {
      source: `/learn/excel/${before}/:page{/}?`,
      permanent: true,
      destination: after
    }
  ])
);

const nextConfig = {
  target: 'experimental-serverless-trace', // Not required for Now, but used by GitHub Actions
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx'],
  experimental: {
    modern: true,
    rewrites() {
      return [
        {
          source: '/feed.xml',
          destination: '/_next/static/feed.xml'
        },
        {
          source: '/docs{/}?',
          destination: '/docs/getting-started'
        },
        {
          source: '/docs/tag/:tag{/}?',
          destination: '/docs/tag/:tag/getting-started'
        }
      ];
    },
    redirects() {
      return [
        {
          source: '/learn{/}?',
          permanent: true,
          destination: '/learn/basics/create-nextjs-app'
        },
        ...navigateBetweenPagesLessonsRedirect,
        ...apiRoutesLessonsRedirect,
        ...basicsLessonsRedirect,
        ...excelLessonsRedirect,
        ...typeScriptLessonsRedirect,
        {
          source: '/features{/}?',
          permanent: false,
          destination: '/'
        },
        {
          source: '/features/:path*',
          permanent: false,
          destination: '/'
        },
        {
          source: '/features/ssr{/}?',
          permanent: false,
          destination: '/'
        },
        {
          source: '/case-studies{/}?',
          permanent: false,
          destination: '/case-studies/hulu'
        },
        {
          source: '/api{/}?',
          permanent: false,
          destination: '/docs/api-routes/introduction'
        },
        {
          source: '/docs/api{/}?',
          permanent: false,
          destination: '/docs/api-routes/introduction'
        },
        {
          source: '/discussions',
          destination: 'https://github.com/zeit/next.js/discussions',
          permanent: false
        }
      ];
    }
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      // we're in build mode so enable shared caching for the GitHub API
      process.env.USE_CACHE = 'true';

      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = { ...(await originalEntry()) };

        // These scripts can import components from the app and use ES modules
        entries['./scripts/build-rss.js'] = './scripts/build-rss.js';
        entries['./scripts/index-docs.js'] = './scripts/index-docs.js';

        return entries;
      };
    }

    return config;
  }
};

module.exports = withGitHubMDX(withMDX(withBundleAnalyzer(nextConfig)));
