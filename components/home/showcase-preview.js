import React from 'react';
import Link from 'next/link';
import { useAmp } from 'next/amp';
import { sortedByAlexa } from '../../showcase-manifest';
import Image from '../image';

// length should be odd numbers
const DATA = sortedByAlexa.slice(0, 7);
const imgWidth = 330;
const imgHeight = 185;
const margin = 30;

export default () => {
  return (
    <>
      <div className="showcase-container tablet">
        <style jsx>{`
          .showcase-container.tablet {
            position: relative;
            margin: 3rem 0 2rem;
            pointer-events: none;
            line-height: 0;
          }
          .slides {
            display: flex;
            flex-wrap: wrap;
          }
          .slide {
            padding: 0.5rem;
            flex: 1 1 33.33%;
          }
          .tablet :global(img),
          .tablet :global(amp-img) {
            max-width: 100%;
            border-radius: 5px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          }
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 2;
            bottom: -2rem;
            background: linear-gradient(
              to bottom,
              rgba(250, 250, 250, 0) 30%,
              rgba(250, 250, 250, 0.7) 90%,
              rgba(250, 250, 250, 1) 100%
            );
          }
          @media screen and (max-width: 640px) {
            .slide {
              flex: 1 1 100%;
            }
          }
          @media screen and (min-width: 960px) {
            .showcase-container.tablet {
              display: none;
            }
          }
        `}</style>
        <div className="overlay" />
        <div className="slides">
          {DATA.map(item => {
            return (
              <div className="slide" key={`thumbnail-${item.internalUrl}`}>
                <Image
                  margin={0}
                  src={item.src.replace('/showcases/', '/showcase-thumbnails/')}
                  alt={`Showcase ${item.title}`}
                  height={imgHeight}
                  width={imgWidth}
                  layout="responsive"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="showcase-container desktop">
        <style jsx>{`
          .showcase-container.desktop {
            display: none;
            margin: 4rem auto 2rem auto;
            overflow-x: hidden;
          }
          .slides {
            display: flex;
            max-width: 100vw;
            margin: 50px 0 0;
          }
          .slides *::selection {
            background-color: transparent;
          }
          .shadow {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            height: 100%;
            color: white;
            text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
            transition: opacity 0.2s ease;
            opacity: 0;
          }
          .info {
            position: absolute;
            width: 100%;
            bottom: 0;
            padding: 1rem;
            text-align: center;
            color: white;
            background: rgba(0, 0, 0, 0.8);
            transition: opacity 0.6s ease;
            opacity: 0;
          }
          .slide:hover .shadow {
            opacity: 1;
          }
          .slide:hover .info {
            opacity: 1;
          }
          .slide {
            width: ${imgWidth}px;
            height: ${imgHeight}px;
            margin: 0 calc(${50 / DATA.length}vw - ${imgWidth / 2}px);
            border-radius: 7px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 5px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.5s ease;
            cursor: pointer;
            overflow: hidden;
            background: white;
          }
          .slide:hover {
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
          }
          .desktop .slide:hover > :global(img),
          .desktop .slide:hover :global(amp-img) {
            opacity: 1;
          }
          .desktop .slide > :global(img),
          .desktop :global(amp-img) {
            width: 100%;
            opacity: 0.8;
            transition: opacity 0.5s ease;
          }
          @media screen and (min-width: 960px) {
            .showcase-container.desktop {
              display: block;
            }
          }
        `}</style>
        <div className="slides">
          {DATA.map((item, i) => {
            const offset = ~~(DATA.length / 2) - i;
            const z = -Math.abs(offset);
            const top = z * (margin + 5);
            return (
              <Link
                key={`showcase-${item.internalUrl}`}
                href={`/showcase?from=click&item=${item.internalUrl}`}
                as={`/showcase/${item.internalUrl}`}
              >
                <div
                  className="slide"
                  style={{
                    zIndex: DATA.length + z,
                    transform: `scale(${1 + Math.sin(z / 9)}) translate3d(${
                      -Math.sin(offset) * 30
                    }px, ${top}px, 0)`
                  }}
                >
                  <Image
                    margin={0}
                    className="no-drag"
                    src={item.src.replace('/showcases/', '/showcase-thumbnails/')}
                    style={{
                      opacity: z === 0 ? 1 : undefined
                    }}
                    alt={item.title}
                    height={imgHeight}
                    width={imgWidth}
                  />
                  <div className="info">
                    <h3 className="f-reset fw4">{item.title}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
