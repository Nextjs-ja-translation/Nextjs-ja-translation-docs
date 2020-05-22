import { ellipsis } from 'polished';
import Container from './container';
import withPure from './hoc/pure';

export default withPure(({ href, title, titleMobile, children }) => (
  <div className="notification f6" title={title}>
    <style jsx>
      {`
        .notification {
          width: 100%;
          height: 50px;
          text-align: center;
          background: #fafafa;
          border-bottom: 1px solid #eaeaea;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        a {
          color: #6a6a6a;
          font-size: 0.875rem;
        }
        :global(.highlight) {
          margin: 0 1rem;
          color: #0070f3;
          transition: opacity 200ms ease;
        }
        a:hover :global(.highlight) {
          opacity: 0.8;
        }
      `}
    </style>
    <Container style={ellipsis()}>
      {titleMobile ? (
        <>
          <a href={href} className="display-mobile">
            {titleMobile}
          </a>
          <a href={href} className="hide-mobile">
            {children}
          </a>
        </>
      ) : (
        <a href={href}>{children}</a>
      )}
    </Container>
  </div>
));
