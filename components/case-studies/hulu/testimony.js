const Testimony = () => (
  <section>
    <div className="container">
      <p>
        “Productivity has skyrocketed. We’re able to focus on feature development and improving our
        product, while Next.js handles the more difficult tooling for us.”
      </p>
      <span>Zack Tanner, Hulu Senior Software Engineer</span>
    </div>

    <p>
      Zack also found that Next.js helps developers avoid common pitfalls. By having a single
      abstraction for handling difficult UI tasks, Next.js prevents developers from introducing
      problems incidentally—for example from over-fetching deep in the component tree. If a
      developer needed to fetch new data, they knew exactly where to look. Nobody needed to learn
      any of the cumbersome underlying APIs and the team could trust Next.js to handle the hard
      parts.
    </p>

    <style jsx>
      {`
        section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 2rem;
          background: linear-gradient(
              180deg,
              rgba(130, 130, 130, 0.18) 0%,
              rgba(255, 255, 255, 0) 100%
            ),
            #ededed;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 4rem 3rem;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.12);
        }

        .container p {
          text-align: center;
          line-height: 1.5;
          font-size: 1.4rem;
          font-weight: 500;
          margin: 0 0 1.5rem 0;
          max-width: 38rem;
        }

        span {
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.4);
          letter-spacing: 1.6px;
          text-transform: uppercase;
        }

        p:last-child {
          margin: 3rem 0 0 0;
          text-align: center;
          max-width: 32rem;
        }

        @media screen and (max-width: 640px) {
          .container {
            padding: 3.5rem 1.5rem;
          }

          .container p {
            max-width: unset;
            font-size: 18px;
          }

          p:last-child {
            text-align: left;
            align-self: flex-start;
          }
        }
      `}
    </style>
  </section>
);

export default Testimony;
