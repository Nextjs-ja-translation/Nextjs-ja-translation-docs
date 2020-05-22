export default () => (
  <div className="container">
    <amp-img
      width={1442 / 427}
      height={1}
      src="/static/images/case-studies/hulu/hulu.jpg"
      alt="Hulu logo"
      layout="responsive"
    />
    <div className="svg-container">
      <amp-img src="/static/images/case-studies/hulu/next.js.svg" width={432} height={432} />
    </div>

    <style jsx>{`
      amp-img {
        height: 100%;
        width: 100%;
      }

      .container {
        z-index: 2;
        position: relative;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        max-width: 1440px;
      }

      .svg-container {
        position: absolute;
        top: -13rem;
        width: 100%;
        display: flex;
        justify-content: center;
      }

      .svg-container amp-img {
        flex-shrink: 0;
        width: 100%;
        margin-right: 38rem;
      }

      @media screen and (max-width: 760px) {
        .svg-container amp-img {
          margin-right: 28rem;
        }
      }
      @media screen and (max-width: 640px) {
        .svg-container {
          display: none;
        }
      }
      @media screen and (min-width: 1440px) {
        .container > amp-img {
          border-radius: 8px;
        }
      }
    `}</style>
  </div>
);
