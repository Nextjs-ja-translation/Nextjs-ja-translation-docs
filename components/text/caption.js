import { FONT_FAMILY_MONO } from '../css-config';

const Caption = ({ children }) => (
  <p>
    {children}
    <style jsx>
      {`
        p {
          color: #999;
          font-size: 12px;
          margin: -20px 0 40px 0;
          text-align: center;
        }
      `}
    </style>
  </p>
);

const Code = ({ children }) => (
  <code>
    {children}
    <style jsx>
      {`
        code {
          color: #666;
          font-family: ${FONT_FAMILY_MONO};
        }

        code::before {
          content: '\`';
        }

        code::after {
          content: '\`';
        }
      `}
    </style>
  </code>
);

Caption.Code = Code;

export default Caption;
