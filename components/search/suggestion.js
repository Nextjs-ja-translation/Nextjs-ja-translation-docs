import Link from 'next/link';
import { Highlight, Snippet } from 'react-instantsearch-dom';

export function getHitLinkProps(hit) {
  const hash = hit.anchor ? `#${hit.anchor}` : '';
  return { href: '/docs/[...slug]', as: hit.path + hash };
}

export default function Suggestion({ hit }) {
  return (
    <Link {...getHitLinkProps(hit)}>
      <a>
        <span className="suggestion__title">
          <Highlight hit={hit} attribute="title" tagName="mark" />
        </span>
        {hit.section && (
          <span className="suggestion__section">
            <Highlight hit={hit} attribute="section" tagName="mark" />
            {hit.subSection && (
              <>
                {' '}
                - <Highlight hit={hit} attribute="subSection" tagName="mark" />
              </>
            )}
          </span>
        )}
        <span className="suggestion__content">
          <Snippet hit={hit} attribute="content" tagName="mark" />
        </span>

        <style jsx>{`
          .suggestion__title {
            font-weight: 500;
            margin-bottom: 0.5rem;
            display: flex;
          }
          .suggestion__section {
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            display: block;
          }
          .suggestion__content {
            color: #333333;
            display: block;
            line-height: 1.6;
          }
        `}</style>
      </a>
    </Link>
  );
}
