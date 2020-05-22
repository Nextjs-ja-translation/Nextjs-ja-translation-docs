import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSlug, removeFromLast, addTagToSlug } from '../../lib/docs/utils';
import { GITHUB_URL, REPO_NAME } from '../../lib/github/constants';
import addLinkListener from '../../lib/add-link-listener';
import Notification from './notification';
import FooterFeedback from '../footer-feedback';
import Button from '../button';
import ArrowIcon from '../arrow-icon';
import RightArrow from '../icons/arrow-right';
import LeftArrow from '../icons/arrow-left';

function areEqual(prevProps, props) {
  return prevProps.route.path === props.route.path;
}

function DocsPage({ route, html, prevRoute, nextRoute }) {
  const { query } = useRouter();
  const { tag, slug } = getSlug(query);
  const href = '/docs/[...slug]';
  const editUrl = `${GITHUB_URL}/${REPO_NAME}/edit/canary${route.path}`;

  useEffect(() => {
    const listeners = [];

    document.querySelectorAll('.docs-content a.relative').forEach(node => {
      const nodeHref = node.getAttribute('href');
      // Exclude paths like #setup and hashes that have the same current path
      if (nodeHref && nodeHref[0] !== '#' && !nodeHref.startsWith(slug)) {
        if (nodeHref.startsWith('/docs')) {
          // Handle relative documentation paths
          const as = addTagToSlug(nodeHref, tag);
          listeners.push(addLinkListener(node, { href, as }));
        } else {
          // Handle any other relative path
          listeners.push(addLinkListener(node, { href: nodeHref }));
        }
      }
    });

    return () => {
      listeners.forEach(cleanUpListener => cleanUpListener());
    };
  }, [slug]);

  return (
    <div className="docs">
      {/* eslint-disable-next-line */}
      <div className="docs-content" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="page-nav">
        {prevRoute ? (
          <Button href={href} as={addTagToSlug(removeFromLast(prevRoute.path, '.'), tag)}>
            <ArrowIcon left flex>
              <LeftArrow color="#0070f3" />
            </ArrowIcon>
            {prevRoute.title}
          </Button>
        ) : (
          <span />
        )}
        {nextRoute && (
          <Button href={href} as={addTagToSlug(removeFromLast(nextRoute.path, '.'), tag)}>
            {nextRoute.title}
            <ArrowIcon right flex>
              <RightArrow color="#0070f3" />
            </ArrowIcon>
          </Button>
        )}
      </div>

      <hr />

      <FooterFeedback />

      <footer>
        {tag ? (
          <Link href="/docs/[...slug]" as={slug}>
            <a>Go to the live version of this page</a>
          </Link>
        ) : (
          <a href={editUrl} target="_blank" rel="noopener noreferrer">
            Edit this page on GitHub
          </a>
        )}
      </footer>

      <style jsx>{`
        .docs {
          /* 300px is the sidebar width and its margin */
          min-width: calc(100% - 300px - 1rem);
        }
        .page-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
        }
        footer {
          display: flex;
          font-size: 0.875rem;
          justify-content: flex-end;
          border-top: 1px solid #eaeaea;
          padding: 1.25rem 0;
          margin-top: 2rem;
          margin-bottom: 5rem;
        }
      `}</style>
      <style jsx global>{`
        /* Headings */
        .docs h1 {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.35;
          margin-top: 0.75rem;
        }
        .docs h2 {
          font-size: 2rem;
          line-height: 1.5;
        }
        .docs h3 {
          font-size: 1.5rem;
          line-height: 1.6;
        }
        .docs h4 {
          font-size: 1.2rem;
        }
        .docs h5 {
          font-size: 1rem;
        }
        .docs .heading {
          margin: 3.5rem 0 2rem 0;
          font-weight: 600;
        }
        .docs .heading > span[id] {
          display: block;
          position: absolute;
          visibility: hidden;
          margin-top: -128px;
          padding-top: 128px;
        }
        .docs .heading > a {
          color: inherit;
        }
        .docs .heading > a:hover {
          color: inherit;
          border-bottom: 1px dotted;
        }
        .docs .heading > a:hover ~ .permalink {
          visibility: visible;
        }
        .docs .heading > .permalink {
          visibility: hidden;
          display: none;
        }

        @media (min-width: 992px) {
          .docs .heading > a {
            margin-right: 0.5rem;
          }
          .docs .heading > .permalink {
            display: inline-block;
          }
        }

        .docs p {
          margin: 1.25rem 0;
        }

        /* Inline code */
        .docs code.inline {
          color: rgb(212, 0, 255);
          font-size: 0.9em;
          white-space: pre-wrap;
          transition: color 0.2s ease;
        }

        /* Code */
        .docs pre {
          background: #1d1f21;
          color: #f8f8f2;
          white-space: pre;
          overflow: auto;
          padding: 1.5rem;
          margin: 1.5rem 0;
          border-radius: 3px;
          -webkit-overflow-scrolling: touch;
        }
        .docs pre > code {
          font-size: 14px;
          line-height: 20px;
        }

        /* Links */
        .docs a.absolute > code.inline {
          color: #0074de;
        }
        .docs a.absolute:hover > code.inline {
          color: #68b5fb;
        }
        .docs a.relative {
          color: inherit;
          font-size: inherit;
          border-bottom: 1px dotted;
        }
        .docs a.relative:hover {
          color: gray;
          text-decoration: none;
        }
        .docs a.relative:hover > code.inline {
          color: gray;
        }

        /* details */
        .docs details {
          margin: 1.5rem 0;
          padding: 0.5rem 1rem;
          background: #fafafa;
          border: 1px solid #eaeaea;
          border-radius: 3px;
        }
        .docs details[open] {
          overflow: hidden;
        }
        .docs details > summary {
          font-weight: 500;
          outline: none;
          cursor: pointer;
        }

        /* Quotes */
        .docs blockquote {
          color: #666666;
          background: #fafafa;
          border: 1px solid #eaeaea;
          border-radius: 3px;
          padding: 1rem 1.25rem;
          margin: 1.5rem 0;
        }
        .docs blockquote p {
          margin: 0;
        }

        /* Card */
        .docs .card {
          margin: 1.5rem 0;
          border-radius: 5px;
          border: 1px solid #eaeaea;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          transition: box-shadow 0.2s ease;
        }
        .docs .card:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }
        .docs .card > a {
          display: flex;
          flex-direction: column;
          width: 100%;
          color: #666666;
          padding: 1.5rem;
          border: none;
          transition: color 0.2s ease;
        }
        .docs .card > a:hover {
          color: #111;
        }
        .docs .card > a > h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #111;
          margin-top: 0;
          margin-bottom: 0.25rem;
        }
        .docs .card > a > small {
          font-size: 0.875rem;
          color: inherit;
        }

        /* Misc */
        .docs hr {
          border: 0;
          border-top: 1px solid #eaeaea;
          margin: 1.25rem 0;
        }
        .docs ul,
        .docs ol {
          padding-left: 1.5rem;
          margin: 1.25rem 0;
        }
        .docs ul {
          list-style-type: none;
        }
        .docs li {
          margin-bottom: 0.625rem;
        }
        .docs ul li:before {
          content: '-';
          color: #999999;
          position: absolute;
          margin-left: -1rem;
        }
      `}</style>
    </div>
  );
}

export default memo(DocsPage, areEqual);
