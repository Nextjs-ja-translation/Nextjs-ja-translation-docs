import { useState, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import cn from 'classnames';
import Container from '../container';
import ArrowRightSidebar from '../icons/arrow-right-sidebar';
import Search from '../search';

export default function SidebarMobile({ children }) {
  const [opened, setOpen] = useState(false);
  const menuRef = useRef();
  const searchRef = useRef();
  const openMenu = () => {
    disableBodyScroll(menuRef.current);
    setOpen(true);
  };
  const closeMenu = () => {
    enableBodyScroll(menuRef.current);
    setOpen(false);
  };
  const toggleOpen = () => {
    if (opened) closeMenu();
    else openMenu();
  };
  // In the following events, only do updates, don't use local states that aren't shared
  // with the Search component, because they won't be updated once the event happens.
  const onSearchStart = () => {
    disableBodyScroll(searchRef.current);
    closeMenu();
  };
  const onSearchClear = () => {
    enableBodyScroll(searchRef.current);
  };
  const onRouteChange = () => {
    closeMenu();
  };

  return (
    <Container>
      <div className="sidebar-search">
        <Search
          id="mobile-search"
          isMobile
          containerRef={searchRef}
          onSearchStart={onSearchStart}
          onSearchClear={onSearchClear}
          onRouteChange={onRouteChange}
        />
      </div>
      <label htmlFor="dropdown-input" className={cn('dropdown-toggle', { opened })}>
        <input id="dropdown-input" type="checkbox" checked={opened} onChange={toggleOpen} />
        <div className="docs-select">
          <ArrowRightSidebar fill="#999" />
          Menu
        </div>
      </label>
      <div className="docs-dropdown" ref={menuRef}>
        <Container>
          <nav>{children}</nav>
        </Container>
      </div>
      <style jsx>{`
        .sidebar-search {
          display: none;
          padding: 0.5rem 0;
          z-index: 1;
        }
        .sidebar-search :global(.react-autosuggest__suggestions-container),
        .sidebar-search :global(.no-results) {
          top: calc(100% - 40px); /* 40px is the size of the menu */
          bottom: 100%;
          left: 0;
          right: 0;
          max-height: none;
        }
        .sidebar-search :global(.react-autosuggest__suggestions-container--open),
        .sidebar-search :global(.no-results) {
          min-height: 80px;
          bottom: calc(153px - 90vh);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .sidebar-search :global(.react-autosuggest__suggestion) {
          padding: 0;
        }
        #dropdown-input {
          display: none;
        }
        .dropdown-toggle {
          width: 100%;
          display: none;
        }
        .docs-select {
          display: flex;
          height: 2.5rem;
          width: 100%;
          line-height: 3rem;
          align-items: center;
          text-align: left;
          cursor: pointer;
        }
        .docs-dropdown {
          display: none;
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          bottom: 100%;
          background: white;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .docs-dropdown nav {
          padding: 10px 0;
        }
        .opened ~ .docs-dropdown {
          min-height: 80px;
          bottom: calc(153px - 90vh);
          border-top: 1px solid #eaeaea;
        }
        .docs-select :global(svg) {
          margin-left: 1px;
          margin-right: 14px;
          transition: transform 0.15s ease;
        }
        .opened > .docs-select :global(svg) {
          transform: rotate(90deg);
        }
        @media screen and (max-width: 950px) {
          .sidebar-search,
          .dropdown-toggle,
          .docs-dropdown {
            display: block;
          }
        }
        @media screen and (max-width: 640px) {
          .sidebar-search :global(.react-autosuggest__suggestions-container--open),
          .sidebar-search :global(.no-results),
          .opened ~ .docs-dropdown {
            bottom: calc(203px - 90vh);
          }
        }
      `}</style>
    </Container>
  );
}
