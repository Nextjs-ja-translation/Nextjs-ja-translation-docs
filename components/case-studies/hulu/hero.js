import Header from './header';
import Logos from './logos';

const Hero = () => (
  <section>
    <div className="gradient" />

    <Header />

    <div className="img-hero">
      <amp-img
        noloading=""
        width={2880}
        height={3404}
        src="/static/images/case-studies/hulu/hero.jpg"
        sizes="100vw"
      />
    </div>

    <div className="container">
      <div className="title">
        <span>Case Study</span>
        <h1>Hulu</h1>
      </div>

      <div className="macbook">
        <amp-img
          src="/static/images/case-studies/hulu/macbook.jpg"
          alt="Hulu landing page on desktop computer"
          width={1093}
          height={628}
          sizes="(max-width: 480px) 423px, (max-width: 860px) 683px, 76vw"
        />
      </div>

      <div className="about" id="about">
        <Logos />

        <h2>
          Powering the Next Generation <br /> of Entertainment
        </h2>

        <p>
          <a href="https://hulu.tv">Hulu</a> makes TV and movies easily accessible online — a feat
          which would be impossible without powerful engineering practices and tools. While the team
          at Hulu has been using Next.js since it's initial release, they recently made a push to
          spread the framework deeply throughout their organization. Next.js gave Hulu the
          confidence to migrate to a modern frontend environment, all while reducing their code
          surface area and shipping faster in the process.
        </p>
      </div>
    </div>

    <style jsx>
      {`
        h1 {
          line-height: 1.2;
          font-size: 5.5rem;
          margin: 0;
        }

        h2 {
          line-height: 1.2;
          margin: 2rem 0;
        }

        h4 {
          margin: 0 0 1.6rem;
        }

        section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
          overflow: hidden;
        }

        section::before {
          z-index: 1;
          content: '';
          bottom: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          background: linear-gradient(135deg, transparent 50%, #000 50%);
        }

        a {
          color: #fff;
          text-decoration: underline;
        }

        .container {
          z-index: 2;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .img-hero {
          z-index: 0;
          position: absolute;
          max-width: 100%;
          max-height: 100%;
          background: linear-gradient(
            180deg,
            rgba(51, 110, 107, 0.7) 0%,
            rgba(44, 56, 94, 0.7) 51.79%,
            rgba(35, 20, 55, 0.7) 100%
          );
        }

        .img-hero amp-img {
          height: 100%;
        }

        .title {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 7rem 0 0;
        }

        .title span {
          display: block;
          font-size: 1.5rem;
        }

        .macbook {
          display: flex;
          justify-content: center;
          max-width: 2400px;
          margin: 6rem 0;
        }

        .macbook amp-img {
          max-width: 90%;
          border-radius: 4px;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3),
            0 -12px 36px -8px rgba(0, 0, 0, 0.025);
        }

        .about {
          margin: 0 0 12rem 32rem;
          padding: 0 4rem 0 0;
        }

        .about p {
          max-width: 30rem;
        }

        @media screen and (max-width: 1400px) {
          section::before {
            height: 115%;
          }
        }

        @media screen and (max-width: 1080px) {
          section::before {
            height: 120%;
          }
          .macbook {
            margin: 4rem 0;
          }
          .about {
            margin: 0 0 12rem 16rem;
          }
        }

        @media screen and (max-width: 640px) {
          h1 {
            font-size: 4rem;
          }
          section::before {
            height: 125%;
            background: linear-gradient(160deg, transparent 50%, #000 50%);
          }
          br {
            display: none;
          }
          .title {
            margin: 3rem 0 0;
          }
          .about {
            padding: 0 2rem;
            margin: 0 0 4.5rem 0;
          }
          .macbook {
            width: 100%;
            margin: 4rem 0 4rem;
            max-width: unset;
          }
        }
        @media screen and (max-width: 480px) {
          section::before {
            height: 130%;
          }
        }
        @media screen and (max-width: 380px) {
          section::before {
            height: 135%;
          }
        }
        @media screen and (max-width: 340px) {
          section::before {
            height: 140%;
          }
        }

        @media screen and (min-width: 1800px) {
          .title {
            margin: 12rem 0 0;
          }
          .macbook {
            margin: 20rem 0 12rem 0;
          }
          section::before {
            height: 100%;
            background: linear-gradient(155deg, transparent 50%, #000 50%);
          }
        }
      `}
    </style>
  </section>
);

export default Hero;
