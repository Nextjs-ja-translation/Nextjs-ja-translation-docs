import { useState, useEffect } from 'react';
import Link from 'next/link';
import formatDate from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import cn from 'classnames';

import Container from '../container';
import Button from '../button';

export default ({ type, thumbnail, detail, link, title, date, alt, children }) => {
  const [dateDistance, setDateDistance] = useState('');
  useEffect(() => {
    setDateDistance(distanceInWordsToNow(date));
  }, [date]);

  return (
    <div className="post-preview">
      <style jsx>{`
        .post-preview {
          padding: 2.5rem 0;
          margin-bottom: -1px;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          transition: all 0.2s ease;
        }
        .post-preview:hover {
          box-shadow: 0 5px 40px rgba(0, 0, 0, 0.04);
        }
        .post-title {
          display: inline-block;
        }
        .post-title a {
          color: inherit;
        }
        .read-more {
          margin-top: 2rem;
        }
        .date {
          margin-top: 0.4rem;
          margin-bottom: 1rem;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .date-visible {
          opacity: 1;
        }
        .icon {
          line-height: 0;
          vertical-align: middle;
        }
        .thumbnail {
          width: 280px;
          margin-left: 1rem;
        }
        .thumbnail img {
          width: 100%;
          max-width: 50vw;
        }
        .preview-layout {
          display: flex;
          align-items: center;
        }
        .preview-content {
          flex: 1;
        }
        .post-type {
          display: block;
          text-transform: uppercase;
          font-size: 12px;
          color: #0070f3;
        }
        // CSS only media query for mobile
        @media screen and (max-width: 640px) {
          .post-preview {
            padding: 1.5rem 0;
          }
          .preview-layout {
            flex-direction: column-reverse;
            align-items: flex-start;
          }
          .thumbnail {
            width: 100%;
            margin-left: 0;
            margin-bottom: 1rem;
          }
          .thumbnail img {
            max-width: 100%;
          }
        }
      `}</style>
      <Container small>
        <div className="preview-layout">
          <div className="preview-content">
            {type && <span className="post-type mute fw6">{type}</span>}
            <h3 className="f2 fw6 post-title">
              <Link href={link}>
                <a>{title}</a>
              </Link>
            </h3>
            <p
              className={cn('f6 date mute', {
                'date-visible': dateDistance
              })}
            >
              {formatDate(date, 'dddd, MMMM Do YYYY')} ({dateDistance} ago)
            </p>
            {detail && <section className="description f5">{children}</section>}
            <div className="read-more">
              <Button href={link}>Read More →</Button>
            </div>
          </div>
          {thumbnail && (
            <div className="thumbnail">
              <img src={thumbnail} alt={alt || ''} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
