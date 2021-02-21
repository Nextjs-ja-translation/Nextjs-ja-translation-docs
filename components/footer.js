import Link from 'next/link';
import { TWITTER_USER_NAME, ORG_NAME, PLATFORM_URL } from '../lib/constants';
import Container from './container';
import withPure from './hoc/pure';
import Logo from './icons/platform-logotype-black';

export default withPure(() => (
  <Container wide gray>
    <Container>
      <footer>
        <style jsx>
          {`
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr 1fr;
              grid-row-gap: 2rem;
            }
            footer {
              padding: 2rem 0 4rem;
              min-height: 400px;
            }
            a,
            p,
            .copyright {
              color: #8c8c8c;
            }
            h4 a {
              color: inherit;
            }
            a:hover {
              color: #111;
            }
            .copyright {
              margin-top: 3rem;
            }
            .copyright div {
              margin-top: 0.5rem;
            }
            h4 {
              margin-bottom: 0.75rem;
            }
            p {
              margin-top: 0;
              margin-bottom: 0.25rem;
            }
            @media screen and (max-width: 700px) {
              .grid {
                grid-template-columns: 1fr 1fr;
              }

              h4,
              p {
                margin: 0;
              }

              a {
                display: block;
                padding-top: 15px;
                padding-bottom: 15px;
              }
            }
          `}
        </style>
        <div className="grid f5">
          <div>
            <h4 className="fw5">サイトコンテンツ</h4>
            <p>
              <Link href="/docs/[...slug]" as="/docs/getting-started">
                <a>ドキュメント</a>
              </Link>
            </p>
            <p>
              <Link href="https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs#contributors-">
                <a>コントリビューター</a>
              </Link>
            </p>
          </div>
          <div>
            <h4 className="fw5">More</h4>
            <p>
              <a href="https://github.com/vercel/next.js" rel="noopener noreferrer" target="_blank">
                Next.js GitHub
              </a>
            </p>
            <p>
              <a
                href="https://nextjs.org/docs/getting-started"
                rel="noopener noreferrer"
                target="_blank"
              >
                Origin Docs
              </a>
            </p>
            <p>
              <a
                href="https://github.com/vercel/next.js/releases"
                rel="noopener noreferrer"
                target="_blank"
              >
                Releases
              </a>
            </p>
          </div>
          <div>
            <h4 className="fw5">翻訳プロジェクトについて</h4>
            <p>
              <a
                href="https://github.com/Nextjs-ja-translation"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </p>
            <p>
              <a
                href="https://join.slack.com/t/nextjs-ja/shared_invite/zt-f9knbi69-AjTZqNZpYv7knG30jPwHcQ"
                rel="noopener noreferrer"
                target="_blank"
              >
                Join our slack !!
              </a>
            </p>
            <p>
              <a
                href="https://vercel.com/?utm_source=Nextjs-ja-translation&utm_campaign=oss"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  src="/static/svg/powered-by-vercel.svg"
                  alt="Vercel社様によるスポンサーシップ"
                />
              </a>
            </p>
          </div>
        </div>
        <div className="copyright f6">
          <Logo />
          <div>
            Copyright © Next.js ドキュメント日本語翻訳プロジェクト, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </Container>
  </Container>
));
