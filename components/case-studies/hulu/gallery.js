const Gallery = () => (
  <section>
    <div className="wrapper">
      <amp-img
        width={860}
        height={492}
        className="devices"
        src="/static/images/case-studies/hulu/devices.jpg"
        alt="Hulu displayed on all your devices"
        sizes="(max-width: 1080px) 90vw, 60vw"
      />
    </div>
    <style jsx>
      {`
        section {
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-x: hidden;
          padding: 5rem 0 7rem;
        }

        .wrapper {
          position: relative;
          z-index: 1;
        }

        .rings {
          position: absolute;
          z-index: -1;
          top: -8%;
          left: 27%;
        }

        @media screen and (max-width: 860px) {
          section {
            overflow: hidden;
          }
          .devices {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
          }
          .rings {
            display: none;
          }
        }

        @media screen and (max-width: 640px) {
          section {
            padding: 3rem 0 5rem 0;
          }
        }
      `}
    </style>
  </section>
);

export default Gallery;
