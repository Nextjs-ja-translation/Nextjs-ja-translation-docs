export const P = ({ className = '', children, large }) => (
  <p className={className}>
    {children}
    <style jsx>{`
      p {
        font-weight: 400;
        font-size: ${large ? '18px' : '14px'};
        line-height: 24px;
      }
    `}</style>
  </p>
);

export const PDIV = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
      }
    `}</style>
  </div>
);

const B = ({ children }) => (
  <span>
    {children}
    <style jsx>{`
      span {
        font-weight: 600;
      }
    `}</style>
  </span>
);

export const HR = () => (
  <div>
    <style jsx>{`
      div {
        border: 0;
        border-bottom: 1px solid #ccc;
        margin: 50px 30px;
      }
    `}</style>
  </div>
);

export const Quote = ({ children }) => (
  <blockquote>
    {children}
    <style jsx>{`
      blockquote {
        padding: 10px 20px;
        border-left: 5px solid #000;
        margin: 20px 0;
        color: #888;
      }

      blockquote :global(div) {
        margin: 0;
      }
    `}</style>
  </blockquote>
);

P.B = B;
