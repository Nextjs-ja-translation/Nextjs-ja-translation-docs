import withSlot from './slot';
import PackageFile from './file-system-routing/package-file.mdx';
import IndexFile from './file-system-routing/index-file.mdx';
import AboutFile from './file-system-routing/about-file.mdx';

const IndexPage = withSlot(({ A }) => (
  <div>
    <h1>
      Hello Next.js{' '}
      <span role="img" aria-label="Waving Hand">
        👋
      </span>
    </h1>
    <A tab="http://localhost:3000/about">About</A>
  </div>
));

const AboutPage = withSlot(({ A }) => (
  <div>
    <p>This is the about page</p>
    <A tab="http://localhost:3000">Go home</A>
  </div>
));

export default {
  type: ['editor', 'browser'],
  tabs: ['Code', 'Website'],
  editor1: {
    editorTabs: ['pages/index.js', 'pages/about.js', 'package.json'],
    editorMapping: {
      'pages/index.js': IndexFile,
      'pages/about.js': AboutFile,
      'package.json': PackageFile
    }
  },
  browser2: {
    browserTabs: ['http://localhost:3000', 'http://localhost:3000/about'],
    browserMapping: {
      'http://localhost:3000': IndexPage,
      'http://localhost:3000/about': AboutPage
    }
  },
  note: (
    <>
      <p>
        Next.js will serve each file in <code>/pages</code> under a pathname matching the filename.
      </p>
      <p>
        For example, <code>/pages/about.js</code> is served at <code>site.com/about</code>.
      </p>
    </>
  )
};
