import { useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import ArrowRightSidebar from '../icons/arrow-right-sidebar';

export default function Category({ isMobile, level = 1, title, selected, opened, children }) {
  const ref = useRef();
  const [{ toggle, shouldScroll = false }, setToggle] = useState({ toggle: selected || opened });
  const toggleCategory = () => {
    setToggle({ toggle: !toggle, shouldScroll: true });
  };
  const levelClass = `level-${level}`;

  // If a category is selected indirectly, open it. This can happen when using the search input
  useEffect(() => {
    if (selected) {
      setToggle({ toggle: true });
    }
  }, [selected]);

  // Navigate to the start of the category when manually opened
  useEffect(() => {
    if (toggle && shouldScroll) {
      const content = document.querySelector(isMobile ? '.docs-dropdown' : '.sidebar-content');
      // 10 is added for better margin
      const height = ref.current.offsetTop - (isMobile ? 10 : content.offsetTop);

      content.scrollTop = height;
      setToggle({ toggle });
    }
  }, [toggle, shouldScroll, isMobile]);

  return (
    <div ref={ref} className={cn('category', levelClass, { open: toggle, selected })}>
      <a className="label" onClick={toggleCategory}>
        <ArrowRightSidebar fill="#999" />
        {title}
      </a>
      <div className="posts">{children}</div>
      <style jsx>{`
        .category {
          margin: 18px 0;
        }
        .category:first-child {
          margin-top: 0;
        }
        .category:last-child {
          margin-bottom: 0;
        }
        .label {
          font-size: 1rem;
          line-height: 1.5rem;
          font-weight: 400;
          cursor: pointer;
          display: flex;
          align-items: center;
          color: #444444;
        }
        .label > :global(svg) {
          margin-right: 14px;
          transition: transform 0.15s ease;
        }
        .selected > .label {
          font-weight: 600;
          color: #000;
        }
        .open > .label {
          color: #000;
        }
        .open > .label > :global(svg) {
          margin-left: 1px;
          margin-right: 13px;
          transform: rotate(90deg);
        }
        .level-2 .label {
          text-transform: none;
          letter-spacing: 0;
        }
        .label:hover {
          color: #000;
        }
        .separated {
          margin-bottom: 32px;
        }
        .posts {
          border-left: 1px solid #eaeaea;
          margin-top: 0;
          height: 0;
          overflow: hidden;
          padding-left: 19px;
          margin-left: 3px;
        }
        .open > .posts {
          margin-top: 18px;
          height: auto;
        }
        @media screen and (max-width: 950px) {
          .category {
            margin: 24px 0;
          }
        }
      `}</style>
    </div>
  );
}
