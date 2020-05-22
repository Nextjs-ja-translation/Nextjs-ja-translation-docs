import Logo from './icons/platform-logotype-white';
import { PLATFORM_URL } from '../lib/constants';

const Banner = () => {
  return (
    <div className="banner">
      <div className="inner">
        <a
          href={`${PLATFORM_URL}?utm_source=next-site&utm_medium=banner&utm_campaign=next-website`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Logo />
        </a>

        <a
          href={`${PLATFORM_URL}/import?filter=next.js&utm_source=next-site&utm_medium=banner&utm_campaign=next-website`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            Deploy <b>Next.js</b> on the platform it was made for →
          </p>

          <p className="mobile">
            Deploy <b>Next.js</b> in seconds →
          </p>
        </a>
      </div>

      <style jsx>{`
        .banner {
          width: 100%;
          background: #000;
          color: #fff;
          height: 50px;
          display: flex;
          align-items: center;
        }

        .inner {
          width: 100%;
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        a {
          display: inline-flex;
        }

        p {
          color: #fff;
          margin: 0;
          transition: color 0.15s ease;
        }

        .mobile {
          display: none;
        }

        @media (max-width: 640px) {
          p {
            font-size: 14px;
          }

          p {
            display: none;
          }

          .mobile {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
