import BackgroundSlider from '../background-slider';

import OpenCollective from '../icons/companies/opencollective';
import Eaze from '../icons/companies/eaze';
import MagicLeap from '../icons/companies/magic-leap';
import Trulia from '../icons/companies/trulia';
import Netflix from '../icons/companies/netflix';
import GitHub from '../icons/companies/github';
import Scale from '../icons/companies/scale';
import Auth0 from '../icons/companies/auth0';
import Ticketmaster from '../icons/companies/ticketmaster';
import Twitch from '../icons/companies/twitch';

import Tencent from '../icons/companies/tencent';
import Jet from '../icons/companies/jet';
import Coinbase from '../icons/companies/coinbase';
import Docker from '../icons/companies/docker';
import Invision from '../icons/companies/invision';
import Binance from '../icons/companies/binance';
import Hulu from '../icons/companies/hulu';
import Pling from '../icons/companies/pling';
import Starbucks from '../icons/companies/starbucks';
import Uber from '../icons/companies/uber';
import Trovit from '../icons/companies/trovit';
import Sesame from '../icons/companies/sesame';

export default function CompanySlider() {
  return (
    <div className="company-slider">
      <BackgroundSlider duration={40}>
        <div className="company-logos-container">
          <div>
            <OpenCollective />
          </div>
          <div>
            <Eaze />
          </div>
          <div>
            <MagicLeap />
          </div>
          <div>
            <Trulia />
          </div>
          <div>
            <Netflix />
          </div>
          <div>
            <GitHub />
          </div>
          <div>
            <Scale />
          </div>
          <div>
            <Ticketmaster />
          </div>
          <div>
            <Twitch />
          </div>
          <div>
            <Sesame />
          </div>
          <div>
            <Pling />
          </div>
        </div>
      </BackgroundSlider>
      <div style={{ marginBottom: '1rem' }} />
      <BackgroundSlider duration={50}>
        {num => (
          <div className="company-logos-container">
            <div>
              <Auth0 />
            </div>
            <div>
              <Tencent />
            </div>
            <div>
              <Jet />
            </div>
            <div>
              <Starbucks />
            </div>
            <div>
              <Docker id={`docker-${num}`} />
            </div>
            <div>
              <Hulu />
            </div>
            <div>
              <Coinbase />
            </div>
            <div>
              <Uber />
            </div>
            <div>
              <Invision />
            </div>
            <div>
              <Trovit />
            </div>
            <div>
              <Binance />
            </div>
          </div>
        )}
      </BackgroundSlider>

      <style jsx>{`
        .company-slider {
          margin-top: 2rem;
          margin-bottom: 4rem;
        }
        .company-logos-container {
          white-space: nowrap;
          overflow: hidden;
        }
        .company-logos-container > div {
          display: inline-block;
          padding: 0 2.2rem;
          vertical-align: middle;
          opacity: 0.25;
          outline: none;
          cursor: default;
          transition: opacity 0.2s ease;
        }
        .company-logos-container > div:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
