import NextLogo from '../../icons/next-logo';

const Header = () => (
  <header>
    <NextLogo color="#fff" />
    <nav>
      <a href="#about">About</a>
      <a href="#process">Process</a>
      <a href="#improvements">Technology</a>
      <a href="#conclusion">Conclusion</a>
    </nav>
    <style jsx>{`
      header {
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 64rem;
        width: 100%;
        padding: 0 2rem;
        margin: 2rem 0 0 0;
      }

      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        transition: 200ms ease-in-out;
      }

      a:not(:last-child) {
        margin: 0 1.5rem 0 0;
      }

      a:hover {
        text-decoration: none;
        opacity: 0.7;
      }

      @media screen and (max-width: 640px) {
        nav {
          display: none;
        }
        header {
          justify-content: center;
          padding: 0 2rem;
        }
      }

      @media screen and (max-width: 1200px) {
        a {
          font-size: 1.125rem;
        }
      }
    `}</style>
  </header>
);

export default Header;
