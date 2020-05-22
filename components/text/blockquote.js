const Blockquote = ({ children }) => (
  <blockquote>
    {children}

    <style jsx>{`
      blockquote {
        color: #4a4a4a;
        font-style: italic;
        margin: 30px 20px;
      }

      blockquote:before,
      blockquote:after {
        content: '';
        background: #eaeaea;
        height: 1px;
        width: 50%;
        display: block;
        margin: 0 auto;
      }

      blockquote:before {
        margin-bottom: 25px;
      }

      blockquote:after {
        margin-top: 25px;
      }

      blockquote :global(> div > div) {
        font-size: 16px;
        line-height: 27px;
        text-align: center;
      }

      @media (min-width: 768px) {
        blockquote {
          max-width: 650px;
          margin: 45px 30px;
        }

        blockquote:before,
        blockquote:after {
          width: 100px;
        }

        blockquote:before {
          margin-bottom: 35px;
        }

        blockquote:after {
          margin-top: 35px;
        }

        blockquote :global(> div > div) {
          font-size: 20px;
          line-height: 30px;
        }
      }

      @media (min-width: 992px) {
        blockquote {
          width: 775px;
          max-width: none;
          margin-left: calc(((775px - 650px) / 2) * -1);
          margin-right: 0;
        }
      }
    `}</style>
  </blockquote>
);

export default Blockquote;
