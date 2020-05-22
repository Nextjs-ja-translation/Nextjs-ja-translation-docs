import Link from 'next/link';

export default () => (
  <div className="container">
    <div>
      <h2>
        Find Out How Next.js Can <br /> Empower Your Team Today
      </h2>
      <Link href="/learn/basics/create-nextjs-app">
        <a>
          <button type="button">Learn More</button>
        </a>
      </Link>
    </div>

    <style jsx>
      {`
        .container {
          display: flex;
          justify-content: center;
          background-color: #1c1c1c;
          border-bottom: 2px solid #333333;
        }

        .container > div {
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 64rem;
          width: 100%;
          padding: 5rem 2rem;
          border-top: 1px solid #000;
        }

        a {
          height: unset;
          width: unset;
          margin-left: 4rem;
        }

        h2 {
          line-height: 1.4;
          margin: 0;
        }

        @media screen and (max-width: 640px) {
          .container h2 {
            text-align: center;
            margin-bottom: 3.125rem;
          }

          .container > div {
            flex-direction: column;
          }

          a {
            margin: 0;
          }
        }
      `}
    </style>
  </div>
);
