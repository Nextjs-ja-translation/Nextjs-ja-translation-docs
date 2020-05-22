import { memo } from 'react';
import Banner from '../banner';
import Nav from '../navbar';
import Notification from './notification';
import Sidebar from './sidebar';
import { headings } from './docs.mdx';

const DocumentationHeader = () => {
  return (
    <>
      <Banner />

      <header>
        <div className="header-nav">
          <Nav />
        </div>
        <div className="header-children">
          <Notification>
            <strong>Note:</strong> You are viewing the old Next.js documentation. For the latest
            features and a better experience please see{' '}
            <a href="/docs/getting-started">the new docs</a>.
          </Notification>
        </div>
      </header>

      <div className="content-mobile">
        <Notification>
          <strong>Note:</strong> You are viewing the old Next.js documentation. For the latest
          features and a better experience please see{' '}
          <a href="/docs/getting-started">the new docs</a>.
        </Notification>
        <Sidebar headings={headings} mobile />
      </div>

      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          background: #fff;
          z-index: 1000;
        }
        .header-nav {
          width: 100%;
          border-bottom: 1px solid #eaeaea;
        }
        .content-mobile {
          display: none;
        }

        @media screen and (max-width: 640px) {
          header {
            position: static;
          }
          .header-children {
            display: none;
          }
          .content-mobile {
            position: sticky;
            display: block;
            top: 0;
            background: #fff;
            padding-top: 1rem;
            z-index: 1000;
          }
        }
      `}</style>
    </>
  );
};

export default memo(DocumentationHeader);
