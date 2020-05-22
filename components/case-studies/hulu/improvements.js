import Rings from './svg/rings';

const Improvements = () => (
  <section>
    <div className="ipad">
      <amp-img
        src="/static/images/case-studies/hulu/ipad-pro.png"
        alt="Hulu on iPad Pro"
        width={822}
        height={632}
        sizes="(max-width: 480px) 300px, 57vw"
      />
    </div>

    <div className="top content" id="improvements">
      <h4>Technical Improvements</h4>

      <h2>Supercharged Applications</h2>

      <p>
        A critical requirement for Hulu was server-side rendering. With data coming from many
        sources and a fundamental need for SEO, server-side rendering was a must. With other
        frameworks, server-rendering pages with complex data dependencies is difficult and error
        prone, if not impossible. Next.js however made the process straightforward.
      </p>

      <div className="quote">
        <p>
          “[Server rendering] was as easy as moving data fetching from one spot to another. Next.js
          dealt with the underlying client hydration, while giving us a single abstraction to handle
          our data fetching logic.”
        </p>
        <span>— Zack Tanner</span>
      </div>

      <p>
        Even when issues arose, Zack found that error tracing with server-rendered pages was far
        superior compared to any other solution he'd tried. By acting as a unified tool for managing
        both client and server-side rendering, Next.js makes it easy for developers to tap into the
        rich benefits of server-side rendering, while still working in familiar territory of writing
        client side code.
      </p>

      <p>
        Finally, by using the CSS-in-JS solution that Next.js provides by default, Zack and team
        were able to implement optimized styles that were code-split automatically. This meant each
        page would load only the CSS it needed, keeping page-size small without compromising on
        functionality. The Hulu teams also extended these defaults using sanctioned{' '}
        <code>next-plugins</code>, enhancing their setup to support existing global Sass files with
        minimal overhead.
      </p>
    </div>

    <div className="img-container">
      <div className="rings-container">
        <Rings />
      </div>
      <amp-img
        src="/static/images/case-studies/hulu/engineers.jpg"
        alt="Hulu engineers working together"
        className="img-engineers"
        width={932}
        height={635}
        sizes="(max-width: 1080px) 90vw, 65vw"
      />
    </div>

    <div className="bottom content">
      <h4>Organizational Improvements</h4>

      <h2>One Framework for Everyone</h2>

      <p>
        Adopting Next.js early on in its history required writing lots of custom code to deal with
        the team's specific use cases. However, as the ecosystem evolved, they were able to chip
        away at old abstractions and let Next.js handle them directly.
      </p>

      <p>
        As the migration progressed, a large amount of technical debt tapered, but another powerful
        benefit arose. The frontend teams at Hulu were unified around a single platform, reducing
        the time it would take developers to be productive in a new codebase. Zack confirms, "devs
        would come and go and switch teams, but everyone understands Next. Everyone is on the same
        page." The number of operational wins Hulu earned were on par with the technical ones.
      </p>
    </div>

    <div className="corner-gradient" />
    <style jsx>
      {`
        section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #fff;
          overflow: hidden;
        }

        section::before {
          content: '';
          top: 36rem;
          width: 100%;
          height: 100%;
          position: absolute;
          background: linear-gradient(135deg, transparent 50%, #1c1c1c 50%);
          z-index: 1;
        }

        h4 {
          color: #aaa;
        }

        p {
          max-width: 35rem;
          margin: 1rem 0;
        }

        a {
          color: #000;
          text-decoration: underline;
        }

        .ipad {
          display: flex;
          justify-content: center;
          max-width: 1440px;
          width: 80%;
          margin: 0;
          padding: 10rem 0;
        }

        .ipad amp-img {
          overflow: hidden;
        }

        .img-engineers {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 56rem;
          margin: 0 auto;
          border-radius: 8px;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3),
            0 -12px 36px -8px rgba(0, 0, 0, 0.025);
        }

        .img-container {
          position: relative;
          padding: 0 2rem;
          margin: 7.5rem 0;
        }

        .rings-container {
          position: absolute;
          z-index: 1;
          top: -10rem;
          right: -11rem;
        }

        .rings-container > :global(svg) {
          position: relative;
          z-index: 0;
          width: 100%;
        }

        .content.top {
          padding: 0rem 2rem;
          color: #000;
        }

        .content {
          z-index: 1;
        }

        .quote {
          margin: 4rem 0;
        }

        .quote p {
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 2rem;
          font-style: italic;
          margin: 0 0 1.5rem 0;
        }

        .quote span {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.4);
          letter-spacing: 1.6px;
          text-transform: uppercase;
        }

        .corner-gradient {
          position: absolute;
          z-index: 0;
          top: 106rem;
          left: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 164.16%), #333333;
        }

        @media screen and (max-width: 1080px) {
          .rings-container {
            transform: scale(0.8);
          }
        }
        @media screen and (max-width: 760px) {
          section::before {
            top: 32rem;
          }
        }

        @media screen and (max-width: 640px) {
          section::before {
            top: 34rem;
            background: linear-gradient(160deg, transparent 50%, #1c1c1c 50%);
          }
          section {
            align-items: flex-start;
          }
          .ipad {
            width: 90%;
            max-width: unset;
            margin: 0 auto;
            padding: 6rem 0;
          }
          .quote {
            margin: 3.5rem 0;
          }

          .img-container {
            padding: 0;
            margin: 7.5rem auto;
          }

          .rings-container {
            width: 100vw;
            top: -14rem;
            right: -8rem;
          }
          .rings-container > :global(svg) {
            transform: scale(1);
          }
          .content.top {
            padding: 0rem 2rem;
            color: #000;
          }
          .corner-gradient {
            display: none;
          }
        }
        @media screen and (max-width: 360px) {
          section::before {
            top: 36.5rem;
          }
        }
        @media screen and (min-width: 1100px) {
          .content.top {
            padding: 0rem 2rem;
          }
          .corner-gradient {
            top: 112rem;
          }
        }
        @media screen and (min-width: 1400px) {
          .corner-gradient {
            top: 120rem;
          }
        }
        @media screen and (min-width: 1600px) {
          .corner-gradient {
            top: 128rem;
          }
        }
        @media screen and (min-width: 1800px) {
          section::before {
            top: 52rem;
            background: linear-gradient(155deg, transparent 50%, #1c1c1c 50%);
          }
        }
      `}
    </style>
  </section>
);

export default Improvements;
