import { FONT_FAMILY_MONO, COLOR_CODE_LIGHT } from '../css-config';

export const Code = ({ children, syntax }) => (
  <pre className={(darkBg ? 'dark' : '') + (syntax ? ` ${syntax}` : '')}>
    <code>{children}</code>
    <style jsx>
      {`
        pre {
          border: 1px solid #eaeaea;
          padding: 20px;
          margin: 40px 0;
          white-space: pre;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
        code {
          color: ${COLOR_CODE_LIGHT};
          font-family: ${FONT_FAMILY_MONO};
          font-size: 13px;
          line-height: 20px;
        }
        pre.dark {
          border-color: #333;
        }
        .dark code {
          color: #fff;
        }
        .dark.shell code {
          color: #50e3c2;
        }
      `}
    </style>
  </pre>
);

export const InlineCode = ({ children, noWrap }) => (
  <code className={noWrap ? 'no-wrap' : ''}>
    {children}
    <style jsx>
      {`
        code {
          color: ${COLOR_CODE_LIGHT};
          font-family: ${FONT_FAMILY_MONO};
          font-size: 0.9em;
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

        code.dark {
          color: #50e3c2;
        }

        code.disabled {
          color: #777;
        }
      `}
    </style>
  </code>
);
