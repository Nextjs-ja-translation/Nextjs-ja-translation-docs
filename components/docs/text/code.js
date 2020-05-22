export const Code = ({ children, syntax }) => (
  <pre className={syntax ? ` ${syntax}` : ''}>
    <code>{children}</code>
    <style jsx>
      {`
        pre {
          background: #1d1f21;
          color: #f8f8f2;
          white-space: pre;
          overflow: auto;
          padding: 1.5rem;
          margin: 40px 0;
          border-radius: 5px;
          -webkit-overflow-scrolling: touch;
        }

        code {
          font-size: 14px;
          line-height: 20px;
        }
      `}
    </style>
  </pre>
);

export const InlineCode = ({ children, wrap = false }) => (
  <code className={wrap && 'wrap'}>
    {children}
    <style jsx>
      {`
        code {
          color: rgb(212, 0, 255);
          // color: #ca0e0e;
          font-size: 0.875em;
          white-space: pre-wrap;
        }

        code.no-wrap {
          white-space: nowrap;
        }

        code::before {
          content: '\`';
        }

        code::after {
          content: '\`';
        }

        :global(h2) code,
        :global(h3) code,
        :global(h4) code,
        :global(h5) code {
          font-size: unset;
          color: inherit;
        }
      `}
    </style>
  </code>
);
