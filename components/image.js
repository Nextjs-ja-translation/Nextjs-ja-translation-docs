import React, { Component } from 'react';
import classNames from 'classnames';
import { useAmp } from 'next/amp';
import Head from 'next/head';
import IObserver from './intersection-observer';

// This component might look a little complex
// because one could argue that keeping the aspect ratio
// of an image can be solved with `height: auto`,
// but it's actually not that easy if you want to prevent
// element flickering

// Because if you want to do that, you need to set the aspect
// ratio of the image's container BEFORE the image loads

class Image extends Component {
  static defaultProps = {
    lazy: true
  };

  state = {
    src: !this.props.lazy ? this.props.videoSrc || this.props.src : undefined
  };

  handleIntersect = entry => {
    if (entry.isIntersecting) {
      this.setState({ src: this.props.videoSrc || this.props.src });
    }
  };

  render() {
    const {
      caption,
      width,
      height,
      isAmp,
      margin = 40,
      video = false,
      videoSrc,
      captionSpacing = null,
      renderImage,
      oversize = true,
      float,
      lazy,
      shadow,
      style,
      ...rest
    } = this.props;

    const aspectRatio = `${String((height / width) * 100)}%`;

    return (
      <IObserver once onIntersect={this.handleIntersect} rootMargin="20%" disabled={!lazy}>
        <figure
          className={classNames({
            oversize: width > 650 && oversize,
            float: float && width < 520
          })}
        >
          <div className="container">
            <div style={isAmp ? undefined : { paddingBottom: aspectRatio, ...style }}>
              {isAmp ? (
                videoSrc || video ? (
                  <>
                    <Head>
                      <script
                        key="amp-video"
                        async
                        custom-element="amp-video"
                        src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
                      />
                    </Head>
                    <amp-video
                      layout="responsive"
                      src={rest.videoSrc || rest.src}
                      width={width}
                      height={height}
                      muted="muted"
                      autoPlay="autoplay"
                      loop="loop"
                    />
                  </>
                ) : (
                  <amp-img
                    layout="responsive"
                    src={rest.src}
                    width={width}
                    height={height}
                    alt={rest.alt}
                  />
                )
              ) : this.state.src ? (
                videoSrc || video ? (
                  <video src={this.state.src} muted autoPlay loop playsInline />
                ) : renderImage ? (
                  renderImage(rest)
                ) : (
                  <img src={this.state.src || null} alt={rest.alt} />
                )
              ) : null}
            </div>

            {caption && (
              <figcaption style={captionSpacing ? { marginTop: captionSpacing } : {}}>
                {caption}
              </figcaption>
            )}
          </div>

          <style jsx>
            {`
              figure {
                display: block;
                text-align: center;
                margin: ${margin}px 0;
              }
              .container {
                margin: 0 auto;
                ${width ? `width: ${width}px;` : ''}
                max-width: 100%;
              }
              @media screen and (max-width: 320px) {
                .container {
                  width: 100%;
                }
              }
              div {
                transform: translate3d(0, 0, 0); /* Work around for Chrome bug */
                position: relative;
              }
              figure :global(img),
              figure :global(video) {
                ${
                  isAmp
                    ? 'position: inherit;'
                    : `
                      height: 100%;
                      left: 0;
                      position: absolute;
                      top: 0;
                      width: 100%;
                      `
                };
                ${shadow ? 'box-shadow: 0 8px 30px rgba(0,0,0,0.12)' : ''}
              }
              figcaption {
                color: #999;
                font-size: 12px;
                margin: 0;
                text-align: center;
              }

              @media (min-width: 1200px) {
                figure.oversize {
                  width: ${width}px;
                  margin: ${margin}px 0 ${margin}px
                    calc(((${width}px - 650px) / 2) * -1);
                }
                figure.float {
                  float: ${float};
                  margin: ${margin}px;
                  margin-${float}: -150px;
                }
              }
            `}
          </style>
        </figure>
      </IObserver>
    );
  }
}

export const Video = props => {
  const isAmp = useAmp();
  return <Image {...props} video isAmp={isAmp} />;
};

export default props => {
  const isAmp = useAmp();
  return <Image {...props} isAmp={isAmp} />;
};
