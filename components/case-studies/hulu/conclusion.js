export default () => (
  <section id="conclusion">
    <div className="content">
      <h4>The benefits of Next.js</h4>

      <h2>A Happier, More Productive Org</h2>

      <p>
        One year into their journey, Zack credits Next.js for fewer bugs, greater productivity, and
        a happier engineering organization. As Next.js continues to improve, the Hulu team is
        excited to continually reap the rewards, passing them on to their users in the form of a
        more robust, and featureful platform.
      </p>

      <p>
        Interested in working with modern technology on a world-class team? Check out the{' '}
        <a href="https://hulu.com/jobs">Hulu jobs page</a> or their{' '}
        <a href="https://medium.com/hulu-tech-blog">tech blog</a> for more info on joining the Hulu
        team!
      </p>
    </div>

    <style jsx>{`
      section {
        z-index: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 0 8rem;
        background: #1c1c1c;
      }

      @media screen and (max-width: 640px) {
        section {
          padding-bottom: 5rem;
        }
      }

      a {
        text-decoration: underline;
        color: #fff;
      }
    `}</style>
  </section>
);
