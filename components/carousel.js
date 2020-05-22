import React from 'react';
import Head from 'next/head';
import ArrowNext from './icons/arrow-next';
import ArrowPrev from './icons/arrow-previous';

const slideWidth = 43.5; // rem
// const tabletSlideWidth = 23; // rem
// const mobileSlideWidth = 18; // rem

export default class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.pivot = Math.floor(props.slides.length / 2);
    this.state = {
      index: this.pivot
    };
    this.carouselIdx = 'c'.concat(Math.random().toString(36).substring(2, 15));
  }

  next = () => {
    const { slides } = this.props;
    this.setState(({ index }) => ({
      index: (index + 1) % slides.length
    }));
  };

  prev = () => {
    const { slides } = this.props;
    this.setState(({ index }) => ({
      index: index === 0 ? slides.length - 1 : index - 1
    }));
  };

  render() {
    const { slides, isAmp } = this.props;
    const { index } = this.state;

    const desktopImgSize = { height: 328, width: 584 };
    const tabletImgSize = { height: 160, width: 304 };
    const mobileImgSize = { height: 128, width: 224 };

    const ampNext = isAmp
      ? `tap:AMP.setState({ ${this.carouselIdx}: {
      selected: (${this.carouselIdx}.selected + 1) % ${slides.length}
    } })`
      : undefined;

    const ampPrev = isAmp
      ? `tap:AMP.setState({ ${this.carouselIdx}: {
      selected: ${this.carouselIdx}.selected == 0 ? ${slides.length - 1} : (${
          this.carouselIdx
        }.selected - 1)
    } })`
      : undefined;

    const Image = props =>
      React.createElement(isAmp ? 'amp-img' : 'img', {
        ...props,
        ...(isAmp
          ? {
              layout: 'responsive'
            }
          : {
              width: undefined,
              height: undefined
            })
      });

    return (
      <div className="container">
        {isAmp && (
          <Head>
            <script
              async
              key="amp-bind"
              custom-element="amp-bind"
              src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
            />
          </Head>
        )}
        <div className="carousel">
          {isAmp && (
            <amp-state id={this.carouselIdx}>
              <script
                type="application/json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({ selected: index })
                }}
              />
            </amp-state>
          )}
          <div
            id="slides"
            className={`focus-${index}`}
            data-amp-bind-class={isAmp ? `'focus-' + ${this.carouselIdx}.selected` : undefined}
          >
            {slides.map(({ image, alt, href, logo }, i) => (
              <div className="slide-content" key={href}>
                <a
                  href={href}
                  className={`slide ${i === index ? 'selected' : 'unselected'}`}
                  data-amp-bind-class={
                    isAmp
                      ? `'slide ' + (${this.carouselIdx}.selected == ${i} ? 'selected' : 'unselected')`
                      : undefined
                  }
                >
                  <Image src={image} alt={alt} {...desktopImgSize} />
                </a>
                <div className="logo">{logo}</div>
              </div>
            ))}
          </div>

          <div className="arrow next" onClick={this.next} on={ampNext}>
            <ArrowNext color="#8c8c8c" />
          </div>
          <div className="arrow previous" onClick={this.prev} on={ampPrev}>
            <ArrowPrev color="#8c8c8c" />
          </div>
        </div>
        <style jsx>{`
          .container {
            height: 25rem;
            width: 100%;
          }

          .carousel {
            position: relative;
            height: 100%;
            width: 100%;
          }
          :global(#slides) {
            display: flex;
            position: absolute;
            top: 0;
            left: 100%;
            transition: transform ease-out 400ms;
            transform: translate3d(calc(-50vw - ${slideWidth / 2 + slideWidth * index}rem), 0, 0);
          }

          .logo {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
            width: 12.5rem;
          }

          :global(#slides .slide) {
            flex-direction: column;
            align-items: center;
            margin: 0 3.5rem;
            pointer-events: none;
            transition: all ease-in 250ms;
            transform-origin: 50% 50%;
          }

          :global(#slides .slide.selected) {
            pointer-events: all;
            opacity: 1;
            transform: scale(1.1);
          }

          :global(#slides .slide.unselected) {
            opacity: 0.3;
            transform: scale(1);
          }

          .slide-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-bottom: 2rem;
          }

          .slide-content :global(img),
          .slide-content :global(amp-img) {
            user-select: none;
            user-drag: none;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center top;
            cursor: pointer;
            border-radius: 7px;
            box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.08);
          }

          .slide-content :global(img:hover),
          .slide-content :global(amp-img:hover) {
            box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.08);
          }

          .slide-content :global(img),
          .slide-content :global(amp-img) {
            width: ${desktopImgSize.width}px;
            height: ${desktopImgSize.height}px;
          }

          .slide-content :global(figure) {
            margin: 0;
          }

          .arrow {
            display: flex;
            position: absolute;
            padding: 0.5rem;
            margin: -0.5rem;
            top: 10rem;
            transform: scale(2.5);
            cursor: pointer;
            user-select: none;
          }

          .arrow:hover :global(> svg *) {
            stroke: #000;
          }

          .next {
            right: 4rem;
          }
          .previous {
            left: 4rem;
          }
          // statically generated for AMP mode, handles 24 slides
          :global(#slides.focus-0) {
            transform: translateX(calc(-50vw - 21.75rem));
          }
          :global(#slides.focus-1) {
            transform: translateX(calc(-50vw - 65.25rem));
          }
          :global(#slides.focus-2) {
            transform: translateX(calc(-50vw - 108.75rem));
          }
          :global(#slides.focus-3) {
            transform: translateX(calc(-50vw - 152.25rem));
          }
          :global(#slides.focus-4) {
            transform: translateX(calc(-50vw - 195.75rem));
          }
          :global(#slides.focus-5) {
            transform: translateX(calc(-50vw - 239.25rem));
          }
          :global(#slides.focus-6) {
            transform: translateX(calc(-50vw - 282.75rem));
          }
          :global(#slides.focus-7) {
            transform: translateX(calc(-50vw - 326.25rem));
          }
          :global(#slides.focus-8) {
            transform: translateX(calc(-50vw - 369.75rem));
          }
          :global(#slides.focus-9) {
            transform: translateX(calc(-50vw - 413.25rem));
          }
          :global(#slides.focus-10) {
            transform: translateX(calc(-50vw - 456.75rem));
          }
          :global(#slides.focus-11) {
            transform: translateX(calc(-50vw - 500.25rem));
          }
          :global(#slides.focus-12) {
            transform: translateX(calc(-50vw - 543.75rem));
          }
          //:global(#slides.focus-13) {
          //  transform: translateX(calc(-50vw - 587.25rem));
          //}
          //:global(#slides.focus-14) {
          //  transform: translateX(calc(-50vw - 630.75rem));
          //}
          //:global(#slides.focus-15) {
          //  transform: translateX(calc(-50vw - 674.25rem));
          //}
          //:global(#slides.focus-16) {
          //  transform: translateX(calc(-50vw - 717.75rem));
          //}
          //:global(#slides.focus-17) {
          //  transform: translateX(calc(-50vw - 761.25rem));
          //}
          //:global(#slides.focus-18) {
          //  transform: translateX(calc(-50vw - 804.75rem));
          //}
          //:global(#slides.focus-19) {
          //  transform: translateX(calc(-50vw - 848.25rem));
          //}
          //:global(#slides.focus-20) {
          //  transform: translateX(calc(-50vw - 891.75rem));
          //}
          //:global(#slides.focus-21) {
          //  transform: translateX(calc(-50vw - 935.25rem));
          //}
          //:global(#slides.focus-22) {
          //  transform: translateX(calc(-50vw - 978.75rem));
          //}
          //:global(#slides.focus-23) {
          //  transform: translateX(calc(-50vw - 1022.25rem));
          //}

          @media screen and (max-width: 960px) {
            .container {
              height: 14rem;
            }
            .next {
              right: 2rem;
            }
            .previous {
              left: 2rem;
            }
            :global(#slides .slide) {
              margin: 0 2rem;
            }

            .slide-content :global(img),
            .slide-content :global(amp-img) {
              width: ${tabletImgSize.width}px;
              height: ${tabletImgSize.height}px;
            }
            .arrow {
              top: 4rem;
              transform: scale(2);
            }
            :global(#slides.focus-0) {
              transform: translateX(calc(-50vw - 11.5rem));
            }
            :global(#slides.focus-1) {
              transform: translateX(calc(-50vw - 34.5rem));
            }
            :global(#slides.focus-2) {
              transform: translateX(calc(-50vw - 57.5rem));
            }
            :global(#slides.focus-3) {
              transform: translateX(calc(-50vw - 80.5rem));
            }
            :global(#slides.focus-4) {
              transform: translateX(calc(-50vw - 103.5rem));
            }
            :global(#slides.focus-5) {
              transform: translateX(calc(-50vw - 126.5rem));
            }
            :global(#slides.focus-6) {
              transform: translateX(calc(-50vw - 149.5rem));
            }
            :global(#slides.focus-7) {
              transform: translateX(calc(-50vw - 172.5rem));
            }
            :global(#slides.focus-8) {
              transform: translateX(calc(-50vw - 195.5rem));
            }
            :global(#slides.focus-9) {
              transform: translateX(calc(-50vw - 218.5rem));
            }
            :global(#slides.focus-10) {
              transform: translateX(calc(-50vw - 241.5rem));
            }
            :global(#slides.focus-11) {
              transform: translateX(calc(-50vw - 264.5rem));
            }
            :global(#slides.focus-12) {
              transform: translateX(calc(-50vw - 287.5rem));
            }
            //:global(#slides.focus-13) {
            //  transform: translateX(calc(-50vw - 310.5rem));
            //}
            //:global(#slides.focus-14) {
            //  transform: translateX(calc(-50vw - 333.5rem));
            //}
            //:global(#slides.focus-15) {
            //  transform: translateX(calc(-50vw - 356.5rem));
            //}
            //:global(#slides.focus-16) {
            //  transform: translateX(calc(-50vw - 379.5rem));
            //}
            //:global(#slides.focus-17) {
            //  transform: translateX(calc(-50vw - 402.5rem));
            //}
            //:global(#slides.focus-18) {
            //  transform: translateX(calc(-50vw - 425.5rem));
            //}
            //:global(#slides.focus-19) {
            //  transform: translateX(calc(-50vw - 448.5rem));
            //}
            //:global(#slides.focus-20) {
            //  transform: translateX(calc(-50vw - 471.5rem));
            //}
            //:global(#slides.focus-21) {
            //  transform: translateX(calc(-50vw - 494.5rem));
            //}
            //:global(#slides.focus-22) {
            //  transform: translateX(calc(-50vw - 517.5rem));
            //}
            //:global(#slides.focus-23) {
            //  transform: translateX(calc(-50vw - 540.5rem));
            //}
          }

          @media screen and (max-width: 640px) {
            .container {
              height: 12rem;
            }
            .next {
              right: 1rem;
            }
            .previous {
              left: 1rem;
            }
            :global(#slides .slide) {
              margin: 0 2rem;
            }

            .slide-content :global(img),
            .slide-content :global(amp-img) {
              width: ${mobileImgSize.width}px;
              height: ${mobileImgSize.height}px;
            }
            .arrow {
              top: 3rem;
              transform: scale(2);
            }
            :global(#slides.focus-0) {
              transform: translateX(calc(-50vw - 9rem));
            }
            :global(#slides.focus-1) {
              transform: translateX(calc(-50vw - 27rem));
            }
            :global(#slides.focus-2) {
              transform: translateX(calc(-50vw - 45rem));
            }
            :global(#slides.focus-3) {
              transform: translateX(calc(-50vw - 63rem));
            }
            :global(#slides.focus-4) {
              transform: translateX(calc(-50vw - 81rem));
            }
            :global(#slides.focus-5) {
              transform: translateX(calc(-50vw - 99rem));
            }
            :global(#slides.focus-6) {
              transform: translateX(calc(-50vw - 117rem));
            }
            :global(#slides.focus-7) {
              transform: translateX(calc(-50vw - 135rem));
            }
            :global(#slides.focus-8) {
              transform: translateX(calc(-50vw - 153rem));
            }
            :global(#slides.focus-9) {
              transform: translateX(calc(-50vw - 171rem));
            }
            :global(#slides.focus-10) {
              transform: translateX(calc(-50vw - 189rem));
            }
            :global(#slides.focus-11) {
              transform: translateX(calc(-50vw - 207rem));
            }
            :global(#slides.focus-12) {
              transform: translateX(calc(-50vw - 225rem));
            }
            //:global(#slides.focus-13) {
            //  transform: translateX(calc(-50vw - 243rem));
            //}
            //:global(#slides.focus-14) {
            //  transform: translateX(calc(-50vw - 261rem));
            //}
            //:global(#slides.focus-15) {
            //  transform: translateX(calc(-50vw - 279rem));
            //}
            //:global(#slides.focus-16) {
            //  transform: translateX(calc(-50vw - 297rem));
            //}
            //:global(#slides.focus-17) {
            //  transform: translateX(calc(-50vw - 315rem));
            //}
            //:global(#slides.focus-18) {
            //  transform: translateX(calc(-50vw - 333rem));
            //}
            //:global(#slides.focus-19) {
            //  transform: translateX(calc(-50vw - 351rem));
            //}
            //:global(#slides.focus-20) {
            //  transform: translateX(calc(-50vw - 369rem));
            //}
            //:global(#slides.focus-21) {
            //  transform: translateX(calc(-50vw - 387rem));
            //}
            //:global(#slides.focus-22) {
            //  transform: translateX(calc(-50vw - 405rem));
            //}
            //:global(#slides.focus-23) {
            //  transform: translateX(calc(-50vw - 423rem));
            //}
          }
        `}</style>
      </div>
    );
  }
}
