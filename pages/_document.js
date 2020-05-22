/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useAmp } from 'next/amp';

import { GA_TRACKING_ID } from '../lib/analytics';

function AmpWrap({ ampOnly, nonAmp }) {
  const isAmp = useAmp();
  if (ampOnly) return isAmp && ampOnly;
  return !isAmp && nonAmp;
}

class NextSite extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="https://assets.vercel.com/raw/upload/v1587415301/fonts/2/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#000000" />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

          <AmpWrap
            ampOnly={
              <script
                async
                key="amp-analytics"
                custom-element="amp-analytics"
                src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
              />
            }
          />
          <AmpWrap
            ampOnly={
              <script
                async
                custom-element="amp-form"
                src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
              />
            }
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <AmpWrap
            ampOnly={
              <amp-analytics type="googleanalytics" id="analytics1" data-credentials="include">
                <script
                  type="application/json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      vars: {
                        account: GA_TRACKING_ID,
                        gtag_id: GA_TRACKING_ID,
                        config: {
                          GA_TRACKING_ID: { groups: 'default' }
                        }
                      },
                      triggers: {
                        trackPageview: {
                          on: 'visible',
                          request: 'pageview'
                        }
                      }
                    })
                  }}
                />
              </amp-analytics>
            }
          />
          <AmpWrap
            nonAmp={
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}');
                  `
                  }}
                />
              </>
            }
          />
        </body>
      </Html>
    );
  }
}

export default NextSite;
