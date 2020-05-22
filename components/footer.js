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
            <h4 className="fw5">General resources</h4>
            <p>
              <a href="/docs">Docs</a>
            </p>
            <p>
              <Link href="/learn/basics/create-nextjs-app" prefetch={false}>
                <a>Learn</a>
              </Link>
            </p>
            <p>
              <Link href="/showcase" prefetch={false}>
                <a>Showcase</a>
              </Link>
            </p>
            <p>
              <Link href="/blog" prefetch={false}>
                <a>Blog</a>
              </Link>
            </p>
          </div>
          <div>
            <h4 className="fw5">More</h4>
            <p>
              <a href="https://github.com/zeit/next.js" rel="noopener noreferrer" target="_blank">
                GitHub
              </a>
            </p>
            <p>
              <a
                href="https://github.com/zeit/next.js/releases"
                rel="noopener noreferrer"
                target="_blank"
              >
                Releases
              </a>
            </p>
            <p>
              <Link href="/telemetry" prefetch={false}>
                <a>Telemetry</a>
              </Link>
            </p>
          </div>
          <div>
            <h4 className="fw5">About {ORG_NAME}</h4>
            <p>
              <a
                href={`${PLATFORM_URL}/oss?utm_source=next-site&utm_medium=footer&utm_campaign=next-website`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open Source Software
              </a>
            </p>
            <p>
              <a href="https://github.com/zeit" rel="noopener noreferrer" target="_blank">
                GitHub
              </a>
            </p>
            <p>
              <a
                href={`https://twitter.com/${TWITTER_USER_NAME}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Twitter
              </a>
            </p>
          </div>
        </div>
        <div className="copyright f6">
          <a
            href={`${PLATFORM_URL}?utm_source=next-site&utm_medium=footer&utm_campaign=next-website`}
            title="Go to the Vercel website"
            rel="noopener noreferrer"
            target="_blank"
            aria-label={ORG_NAME}
          >
            <Logo />
          </a>
          <div>
            Copyright © {`${new Date().getFullYear()}`} {ORG_NAME}, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </Container>
  </Container>
));
