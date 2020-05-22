const courses = [
  {
    id: 'basics',
    name: 'Basics',
    lessons: [
      {
        id: 'create-nextjs-app',
        name: 'Create a Next.js App',
        // 50 points
        steps: [
          {
            id: 'setup',
            points: 20
          },
          {
            id: 'welcome-to-nextjs',
            points: 15
          },
          {
            id: 'editing-the-page',
            points: 15
          }
        ]
      },
      {
        id: 'navigate-between-pages',
        name: 'Navigate Between Pages',
        // 50 points
        steps: [
          {
            id: 'setup',
            points: 5
          },
          {
            id: 'pages-in-nextjs',
            points: 10
          },
          {
            id: 'link-component',
            points: 25
          },
          {
            id: 'client-side',
            points: 10
          }
        ]
      },
      {
        id: 'assets-metadata-css',
        name: 'Assets, Metadata, and CSS',
        // 100 points
        steps: [
          {
            id: 'setup',
            points: 5
          },
          {
            id: 'assets',
            points: 10
          },
          {
            id: 'metadata',
            points: 10
          },
          {
            id: 'css-styling',
            points: 10
          },
          {
            id: 'layout-component',
            points: 15
          },
          {
            id: 'global-styles',
            points: 15
          },
          {
            id: 'polishing-layout',
            points: 20
          },
          {
            id: 'styling-tips',
            points: 15
          }
        ]
      },
      {
        id: 'data-fetching',
        name: 'Pre-rendering and Data Fetching',
        // 100 points
        steps: [
          {
            id: 'setup',
            points: 5
          },
          {
            id: 'pre-rendering',
            points: 10
          },
          {
            id: 'two-forms',
            points: 10
          },
          {
            id: 'with-data',
            points: 10
          },
          {
            id: 'blog-data',
            points: 20
          },
          {
            id: 'implement-getstaticprops',
            points: 25
          },
          {
            id: 'getstaticprops-details',
            points: 10
          },
          {
            id: 'request-time',
            points: 10
          }
        ]
      },
      {
        id: 'dynamic-routes',
        name: 'Dynamic Routes',
        // 100 points
        steps: [
          {
            id: 'setup',
            points: 5
          },
          {
            id: 'page-path-external-data',
            points: 10
          },
          {
            id: 'implement-getstaticpaths',
            points: 15
          },
          {
            id: 'implement-getstaticprops',
            points: 15
          },
          {
            id: 'render-markdown',
            points: 15
          },
          {
            id: 'polishing-post-page',
            points: 15
          },
          {
            id: 'polishing-index-page',
            points: 15
          },
          {
            id: 'dynamic-routes-details',
            points: 10
          }
        ]
      },
      {
        id: 'api-routes',
        name: 'API Routes',
        // 25 points
        steps: [
          {
            id: 'setup',
            points: 5
          },
          {
            id: 'creating-api-routes',
            points: 10
          },
          {
            id: 'api-routes-details',
            points: 10
          }
        ]
      },
      {
        id: 'deploying-nextjs-app',
        name: 'Deploying Your Next.js App',
        // 75 points
        steps: [
          {
            id: 'setup',
            points: 5
          },
          {
            id: 'github',
            points: 20
          },
          {
            id: 'deploy',
            points: 20
          },
          {
            id: 'platform-details',
            points: 10
          },
          {
            id: 'other-hosting-options',
            points: 10
          },
          {
            id: 'finally',
            points: 10
          }
        ]
      }
    ]
  },
  {
    id: 'excel',
    name: 'Excel',
    lessons: [
      {
        id: 'typescript',
        name: 'TypeScript',
        // 50 points
        steps: [
          {
            id: 'setup',
            points: 5
          },
          {
            id: 'create-tsconfig',
            points: 10
          },
          {
            id: 'nextjs-types',
            points: 35
          }
        ]
      }
    ]
  }
];

export default courses;
