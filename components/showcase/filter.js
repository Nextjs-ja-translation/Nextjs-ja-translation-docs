import { memo } from 'react';
import { categories, categoriesShort } from '../../showcase-manifest';
import { useIsMobile } from '../media-query';
import Popover from '../popover';
import Container from '../container';
import HeartIcon from '../icons/heart';
import Sticky from '../sticky';
import { links } from '../../site-manifest';

function Filter({ onSelect, selectedId }) {
  const isMobile = useIsMobile();

  return (
    <Sticky offset={isMobile ? 120 : 80}>
      <Container center>
        <div className="categories">
          {categoriesShort.map((_, index) => {
            const id = categories[index];
            return (
              <button
                type="button"
                className={`no-tap-highlight short tab${selectedId === id ? ' selected' : ''} f6`}
                onClick={() => onSelect(id)}
                key={id}
              >
                {_}
              </button>
            );
          })}
          {categories.map((_, index) => {
            const id = categories[index];
            return (
              <button
                type="button"
                className={`no-tap-highlight not-short tab${
                  selectedId === id ? ' selected' : ''
                } f6`}
                onClick={() => onSelect(id)}
                key={id}
              >
                {_}
              </button>
            );
          })}
          <Popover content={<div style={{ whiteSpace: 'nowrap' }}>Share your website!</div>}>
            <a
              href={links.submitShowcase}
              className="not-mobile"
              aria-label="Submit Your Website"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="tab f5" style={{ verticalAlign: 'top' }}>
                <HeartIcon />
              </span>
            </a>
          </Popover>
        </div>
      </Container>

      <style jsx>{`
        .categories {
          display: flex;
          padding: 0.5rem 1rem;
          align-items: baseline;
          justify-content: center;
          font-weight: 500;
        }
        .categories {
          border-top: 1px solid transparent;
        }
        :global(.fixed) .categories {
          border-top: 1px solid transparent;
        }
        .categories *::selection {
          background-color: inherit;
          color: inherit;
        }
        .tab {
          background-color: transparent;
          border: none;
          font-weight: inherit;
          display: inline-block;
          height: 100%;
          line-height: 2rem;
          position: relative;
          text-align: center;
          padding: 0 1.25rem;
          cursor: pointer;
          transition: color 0.5s ease;
          white-space: nowrap;
          text-transform: uppercase;
          border-radius: 7px;
        }
        .tab.selected {
          background: rgba(0, 118, 255, 0.1);
          color: #0070f3;
        }
        .short {
          display: none;
        }

        @media screen and (max-width: 640px) {
          .categories {
            align-items: center;
            justify-content: space-around;
          }
          :global(.fixed) .categories {
            border-top: 1px solid #f5f5f5;
          }
          .tab {
            padding: 0 3px;
            text-transform: unset;
          }
          .not-mobile,
          .not-short {
            display: none;
          }
          .short {
            display: unset;
          }
        }
      `}</style>
    </Sticky>
  );
}

export default memo(Filter);
