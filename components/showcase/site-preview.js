import { PureComponent } from 'react';
import Router, { withRouter } from 'next/router';
import IObserver from '../intersection-observer';

const GAP_X = 48;
const GAP_Y = 48;

export default withRouter(
  class extends PureComponent {
    state = {
      src: undefined
    };

    loadDetail = ev => {
      if (ev.target.nodeName === 'A') {
        return;
      }
      const item = this.props.siteData.internalUrl;
      Router.push(`/showcase/[item]`, `/showcase/${item}`);
    };

    handleIntersect = entry => {
      if (entry.isIntersecting) {
        const { highlighted, siteData, isTablet } = this.props;

        const useLargeThumbnail = highlighted && !isTablet;
        const src = useLargeThumbnail
          ? siteData.src
          : siteData.src.replace('/showcases/', '/showcase-thumbnails/');

        this.setState({ src });
      }
    };

    render() {
      const { highlighted, siteData, flex, isTablet } = this.props;
      const { src } = this.state;

      return (
        <IObserver once onIntersect={this.handleIntersect} rootMargin="20%">
          <div
            className={`no-tap-callout site-container${
              highlighted && !isTablet ? ' highlighed' : ''
            }`}
            key={`site-${siteData.internalUrl}`}
          >
            <div className="content" ref={el => (this.previewEl = el)}>
              <div className="preview" onClick={this.loadDetail}>
                <div className="shadow">
                  <div className="info">
                    <h3 className={highlighted && !isTablet ? 'f2' : 'f4'}>{siteData.title}</h3>
                    <a
                      href={siteData.link}
                      className="f5"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {siteData.link}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <style jsx>{`
              .site-container {
                position: relative;
                flex: ${flex || 1};
                height: unset;
              }
              .content {
                position: relative;
                width: 100%;
                height: 100%;
              }
              .preview {
                position: absolute;
                top: ${GAP_Y / 2}px;
                bottom: ${GAP_Y / 2}px;
                left: ${GAP_X / 2}px;
                right: ${GAP_X / 2}px;
                background-image: ${src ? `url(${src})` : 'none'};
                background-size: cover;
                background-position: center top;
                background-repeat: no-repeat;
                box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02);
                border-radius: 7px;
                text-align: center;
                overflow: hidden;
                background-color: #ffffff;
                cursor: zoom-in;
              }
              .preview .shadow {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-end;
                height: 100%;
                color: white;
                text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
                background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
                transition: opacity 0.2s ease;
                opacity: 0;
              }
              .info {
                width: 100%;
                padding: 1.5rem;
                background: rgba(0, 0, 0, 0.8);
                text-align: center;
                transition: opacity 0.6s ease;
                opacity: 0;
              }
              .preview:hover {
                box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.12);
              }
              .preview:hover .shadow {
                opacity: 1;
              }
              .preview:hover .info {
                opacity: 1;
              }
            `}</style>
          </div>
        </IObserver>
      );
    }
  }
);
