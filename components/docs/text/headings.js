const H1 = ({ children, ...props }) => (
  <h1 {...props}>
    {children}

    <style jsx>{`
      font-size: 1.8rem;
      font-weight: 400;
      margin-top: 0;
    `}</style>
  </h1>
);

const H2 = ({ children, ...props }) => (
  <h2 {...props}>
    {children}

    <style jsx>{`
      font-size: 1.625rem;
      font-weight: 500;
    `}</style>
  </h2>
);

const H3 = ({ children, ...props }) => (
  <h3 {...props}>
    {children}

    <style jsx>{`
      font-size: 1.4rem;
      font-weight: 600;
    `}</style>
  </h3>
);

const H4 = ({ children, ...props }) => (
  <h4 {...props}>
    {children}

    <style jsx>{`
      font-size: 1.15rem;
      font-weight: 600;
    `}</style>
  </h4>
);

const H5 = ({ children, ...props }) => (
  <h5 {...props}>
    {children}

    <style jsx>{`
      font-size: 1rem;
      font-weight: 700;
      margin-top: 2rem;
    `}</style>
  </h5>
);

export { H1, H2, H3, H4, H5 };
