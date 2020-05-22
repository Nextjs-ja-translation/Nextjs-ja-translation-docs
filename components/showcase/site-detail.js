import { PureComponent } from 'react';
import Router from 'next/router';
import Head from 'next/head';

function clearRoute() {
  Router.router.push('/showcase');
}

export default class extends PureComponent {
  clickOuter = () => {
    clearRoute();
  };

  render() {
    const { siteData } = this.props;

    return (
      <>
        <Head>
          <title>Showcase | {siteData.title}</title>
        </Head>
        <div className="lightbox" onClick={this.clickOuter} ref={el => (this.lightbox = el)}>
          <style jsx>{`
            .lightbox {
              position: fixed;
              z-index: 1010;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              padding: 3rem 3rem 7rem 3rem;
              background-color: rgba(0, 0, 0, 0.9);
              cursor: zoom-out;
            }
            .preview {
              width: 100%;
              height: 100%;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .info {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              padding: 1rem 2rem 2rem;
              text-align: center;
              color: white;
              text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
            }
            img {
              max-width: 100%;
              max-height: 100%;
              border-radius: 7px;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            @media screen and (max-width: 640px) {
              .lightbox {
                padding: 2rem 1rem 3rem 1rem;
              }
            }
          `}</style>
          <div className="preview">
            <img src={siteData.src} alt={siteData.title} />
            <div className="info">
              <h3 className="f4">{siteData.title}</h3>
              <a href={siteData.link} className="f5" rel="noopener noreferrer" target="_blank">
                {siteData.link}
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
