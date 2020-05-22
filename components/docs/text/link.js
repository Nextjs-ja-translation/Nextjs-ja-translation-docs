import NativeLink from 'next/link';

export const GenericLink = props => {
  if (props.href.startsWith('/') && !props.href.startsWith('/docs')) {
    return <InternalLink {...props} />;
  }

  if (props.href.includes('@') || props.href.startsWith('#')) {
    return <AnchorLink {...props} />;
  }

  return <ExternalLink {...props} />;
};

export const InternalLink = ({ href, as, children, error = false }) => (
  <NativeLink href={href} as={as}>
    <a>
      {children}

      <style jsx>{`
        a {
          text-decoration: ${error ? 'underline' : 'none'};
          font-size: inherit;
        }

        a:hover {
          text-decoration: none;
        }
      `}</style>
    </a>
  </NativeLink>
);

export const AnchorLink = ({ href, onClick, children }) => (
  <a href={href} onClick={onClick}>
    {children}

    <style jsx>
      {`
        a {
          color: inherit;
          font-size: inherit;
          border-bottom: 1px dotted;
        }

        a:hover {
          color: gray;
          text-decoration: none;
        }
      `}
    </style>
  </a>
);

export const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}

    <style jsx>
      {`
        a {
          text-decoration: none;
          font-size: inherit;
        }
      `}
    </style>
  </a>
);
