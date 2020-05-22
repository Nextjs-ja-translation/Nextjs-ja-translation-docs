import GithubSlugger from 'github-slugger';
import Container from '../container';
import ArrowRight from '../icons/arrow-right';

function flattenHeadings(headings) {
  if (!Array.isArray(headings)) {
    return headings;
  }
  return [].concat(...headings.map(flattenHeadings));
}

function slugifyHeadings(headings) {
  const slugger = new GithubSlugger();

  return headings.map(heading => {
    // n.b. mutation is required here unfortunately
    // eslint-disable-next-line no-param-reassign
    heading.id = slugger.slug(heading.title);
    return heading;
  });
}

export function SidebarNavItem({ item }) {
  const href = `#${item.id}`;
  const ampOn = `tap:AMP.navigateTo(url='${href}', target=_top)`;
  if (item.level === 2) {
    return (
      <li>
        <a on={ampOn} className="documentation__sidebar-heading f5">
          {item.title}
        </a>
        <style jsx>{`
          li {
            list-style: none;
          }
          .documentation__sidebar-heading {
            display: inline-block;
            margin-top: 1rem;
            margin-bottom: 4px;
            color: #999;
            text-transform: uppercase;
          }
          a {
            cursor: pointer;
          }
          a:hover {
            color: gray;
          }
        `}</style>
      </li>
    );
  }

  let listStyle = '';
  switch (item.level) {
    case 3:
      listStyle = 'padding: 5px 3px 5px 0; font-size: 15px;';
      break;
    case 4:
      listStyle = 'padding: 3px 3px 3px 15px; font-size: 14px; color: #666;';
      break;
    case 5:
      listStyle = 'padding: 2px 3px 2px 30px; font-size: 13px; color: #666;';
      break;
    case 6:
      listStyle = 'padding: 2px 3px 2px 45px; font-size: 13px; color: #666;';
      break;
    default:
      break;
  }

  return (
    <li>
      <a on={ampOn} className="f-reset">
        {item.title}
      </a>
      <style jsx>{`
        li {
          list-style: none;
        }
        a {
          cursor: pointer;
          display: block;
          color: inherit;
          line-height: 1.4;
          margin: 0.4rem 0;
          ${listStyle};
        }
        a:hover {
          color: gray;
        }
        a.active {
          font-weight: 600;
          color: #0070f3;
        }
      `}</style>
    </li>
  );
}

export function SidebarNavItemContainer({ headings }) {
  if (Array.isArray(headings)) {
    return (
      <ul>
        {headings.map((item, i) => {
          if (Array.isArray(item)) {
            return (
              <li key={i}>
                <SidebarNavItemContainer headings={item} />
              </li>
            );
          }
          return <SidebarNavItemContainer key={i} headings={item} />;
        })}
        <style jsx>{`
          ul {
            margin: 0 0 0.5rem 0;
            padding: 0;
          }
        `}</style>
      </ul>
    );
  }

  return <SidebarNavItem item={headings} />;
}

export default function Sidebar({ headings, mobile, desktop }) {
  slugifyHeadings(flattenHeadings(headings));

  return (
    <>
      {mobile && (
        <>
          <label htmlFor="dropdown-input" className="dropdown-toggle">
            <input id="dropdown-input" type="checkbox" />
            <div className="docs-select f5 fw6">
              <Container>
                <span
                  style={{
                    verticalAlign: 'middle',
                    marginRight: '0.2rem',
                    display: 'inline-block',
                    lineHeight: '1rem'
                  }}
                >
                  <ArrowRight />
                </span>
                Menu
              </Container>
            </div>
            <div className="documentation__sidebar docs-dropdown">
              <Container>
                <nav>
                  <SidebarNavItemContainer headings={headings} />
                </nav>
              </Container>
            </div>
          </label>
        </>
      )}
      <style jsx>{`
        #dropdown-input {
          display: none;
        }
        .dropdown-toggle {
          width: 100%;
          display: block;
        }
        .docs-select {
          height: 3rem;
          width: 100%;
          border-top: 1px solid #eaeaea;
          line-height: 3rem;
          text-align: left;
          cursor: pointer;
        }
        .docs-select img {
          vertical-align: middle;
          margin-top: -2px;
        }
        .docs-dropdown {
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          bottom: 100%;
          background: white;
          border-bottom: 1px solid #eaeaea;
          transition: bottom 0.5s ease;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        #dropdown-input:checked ~ .docs-dropdown {
          bottom: -50vh;
        }
        .documentation__sidebar nav {
          padding-left: 28px;
        }
      `}</style>
      <style jsx global>{`
        // only show in mobile mode
        @media screen and (min-width: 640px) {
          .dropdown-toggle {
            height: 0px;
            overflow: hidden;
          }
        }
      `}</style>

      {desktop && (
        <div className="documentation__sidebar desktop">
          <nav>
            <SidebarNavItemContainer headings={headings} />
          </nav>
        </div>
      )}
      <style jsx>{`
        .documentation__sidebar.desktop {
          width: 312px;
          flex: 0 0 auto;
          position: relative;
          padding-right: 3rem;
        }
        .documentation__sidebar.desktop nav {
          position: sticky;
          /* header height + notification height */
          top: calc(81px + 88px);
          /* Full page - header height - notification height - logo banner */
          height: calc(100vh - 81px - 88px - 50px);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: column;
          width: 288px;
          padding: 2rem 1rem 0 0;
        }
        // CSS only media query for mobile + SSR
        @media screen and (max-width: 640px) {
          .documentation__sidebar.desktop {
            display: none;
          }
          .documentation__sidebar nav {
            position: unset;
            height: unset;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
