import { useState, useEffect } from 'react';

import Button from '../button';
import HuluLogo from '../icons/companies/hulu';

const items = [
  {
    name: 'Hulu',
    logo: <HuluLogo color="#000" />
  }
];

const itemDuration = 3300;

export default function CaseStudiesSlider() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (items.length > 1) {
      const timer = setTimeout(() => {
        if (count < items.length - 1) {
          setCount(count + 1);
        } else {
          setCount(0);
        }
      }, itemDuration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [count]);

  return (
    <div className="slider-wrapper">
      <div className="content">
        <div className="slider">
          {items.map((item, index) => (
            <div
              className={count > 0 && count === index ? 'slide active' : 'slide'}
              key={`slide-${index}`}
            >
              {item.logo}
            </div>
          ))}
        </div>
        <Button
          invert
          href={`/case-studies/${items[count].name.toLowerCase()}`}
          className="action"
          amp
        >
          Read Case Study
        </Button>
      </div>
      <style jsx>{`
        .slider-wrapper {
          padding: 16px;
          background-color: #fff;
          box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.12);
          border-radius: 6px;
          max-width: 450px;
          height: 72px;
          margin: 0 auto;
        }
        .content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .slider {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 140px;
          position: relative;
        }
        .slide {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          animation: 3s ease-in-out;
          opacity: 0;
          height: 40px;
        }
        .slide.active {
          animation-name: fade;
        }
        .slide:only-child {
          opacity: 1;
        }
        .slide:not(:last-child) {
          padding-right: 20px;
        }

        @keyframes fade {
          0% {
            opacity: 0;
          }
          25%,
          75% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .slider-wrapper {
            width: 90%;
            max-width: 100%;
            padding: 16px;
            height: auto;
          }
          .content {
            width: 100%;
            flex-direction: column;
          }
          .slider {
            width: 100%;
            margin-bottom: 1rem;
          }
          :global(.action) {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
