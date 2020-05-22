import { useState } from 'react';
import cn from 'classnames';
import Search from '../search';

export default function Sidebar({ active, children, fixed }) {
  const [searching, setSearching] = useState(false);

  return (
    <aside className={cn('sidebar', { active, fixed, searching })}>
      <div className="sidebar-search">
        <Search
          id="desktop-search"
          onSearchStart={() => setSearching(true)}
          onSearchClear={() => setSearching(false)}
        />
      </div>
      <div className="sidebar-content">{children}</div>
      <style jsx>{`
        .sidebar {
          background: #fff;
          padding-bottom: 40px;
          padding-right: 1.5rem;
          width: 300px;
          -webkit-overflow-scrolling: touch;
          flex-shrink: 0;
        }
        .sidebar.fixed {
          position: sticky;
          /* content margin + header size */
          top: calc(2rem + 81px);
          margin-right: 1rem;
          /* Full page - content margin - header size - banner */
          height: calc(100vh - 2rem - 81px - 50px);
          padding-bottom: 0;
          display: flex;
          flex-direction: column;
          z-index: 1;
        }
        .sidebar.fixed.searching > .sidebar-content {
          display: none;
        }
        .sidebar-search {
          position: relative;
          margin: 1.5rem 0;
          z-index: 1;
        }
        .sidebar-content {
          overflow-y: auto;
          padding-bottom: 1.5rem;
        }
        @media screen and (max-width: 950px) {
          .sidebar,
          .sidebar.fixed {
            display: none;
          }
          .sidebar.active {
            display: block;
          }
        }
      `}</style>
    </aside>
  );
}
