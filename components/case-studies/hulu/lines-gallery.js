import Lines from './svg/lines';

const LinesGallery = () => (
  <div className="container">
    <div className="images">
      <div>
        <amp-img
          width={282}
          height={166}
          src="/static/images/case-studies/hulu/lines-0.jpg"
          alt="Hulu lifestyle image"
          sizes="(min-width: 1440px) 282px, 18.5vw"
        />
      </div>
      <div>
        <amp-img
          width={282}
          height={166}
          src="/static/images/case-studies/hulu/lines-1.jpg"
          alt="Hulu lifestyle image"
          sizes="(min-width: 1440px) 282px, 18.5vw"
        />
      </div>
      <div>
        <amp-img
          width={282}
          height={166}
          src="/static/images/case-studies/hulu/lines-2.jpg"
          alt="Hulu lifestyle image"
          sizes="(min-width: 1440px) 282px, 18.5vw"
        />
      </div>
      <div>
        <amp-img
          width={282}
          height={166}
          src="/static/images/case-studies/hulu/lines-3.jpg"
          alt="Hulu lifestyle image"
          sizes="(min-width: 1440px) 282px, 18.5vw"
        />
      </div>
      <div>
        <amp-img
          width={282}
          height={166}
          src="/static/images/case-studies/hulu/lines-4.jpg"
          alt="Hulu lifestyle image"
          sizes="(min-width: 1440px) 282px, 18.5vw"
        />
      </div>
    </div>

    <div className="lines-container">
      <Lines />
    </div>
    <style jsx>{`
      .container {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 12rem 0 8rem;
        background: #1c1c1c;
      }

      .images {
        max-width: 1440px;
        display: flex;
      }

      .lines-container {
        top: 0.5rem;
        left: 0;
        display: flex;
        position: absolute;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
      }

      .lines-container > :global(svg) {
        width: 100%;
      }

      .images > div {
        flex: 1;
      }

      .images > div:not(:last-child) {
        margin-right: 16px;
      }

      amp-img,
      img {
        width: 100%;
        box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
      }

      .images > div:nth-of-type(2n) {
        transform: translateY(-36px);
      }

      .images > div:nth-of-type(2n -1) {
        z-index: 2;
      }

      @media screen and (max-width: 640px) {
        .container {
          padding: 10rem 0 6rem;
        }
        .images {
          max-width: unset;
          min-width: 107%;
        }
        .lines-container {
          top: 2rem;
        }
        .images > div:nth-of-type(2n) {
          transform: translateY(-12px);
        }
        .images > div:not(:last-child) {
          margin-right: 6px;
        }
      }
    `}</style>
  </div>
);

export default LinesGallery;
