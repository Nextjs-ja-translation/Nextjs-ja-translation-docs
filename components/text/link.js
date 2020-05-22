// Packages
import NativeLink from 'next/link';

export const GenericLink = props => {
  if (
    props.href.startsWith('/') &&
    !props.href.startsWith('/docs') &&
    !props.href.startsWith('/api')
  ) {
    return <InternalLink {...props} />;
  }

  if (props.href.includes('@') || props.href.startsWith('#')) {
    return <AnchorLink {...props} />;
  }

  return <ExternalLink {...props} />;
};

export const InternalLink = ({ href, as, children, error = false, underlineOnHover = true }) => (
  <NativeLink href={href} as={as}>
    <a
      className={`
      ${underlineOnHover ? '' : 'no-underline'}
    `}
    >
      {children}

      <style jsx>{`
        a {
          text-decoration: ${error ? 'underline' : 'none'};
          color: ${error ? 'red' : '#067df7'};
          font-size: inherit;
        }

        a:not(.no-underline):hover {
          text-decoration: underline;
        }
      `}</style>
    </a>
  </NativeLink>
);

export const AnchorLink = ({ href, onClick, children, underlineOnHover = true }) => (
  <a href={href} onClick={onClick}>
    {children}

    <style jsx>
      {`
        a {
          text-decoration: none;
          color: #067df7;
          font-size: inherit;
          cursor: pointer;
        }

        ${underlineOnHover
          ? `
          a:hover {
            text-decoration: underline;
          }
        `
          : null};
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
          color: #067df7;
          font-size: inherit;
        }

        a:hover {
          text-decoration: underline;
        }
      `}
    </style>
  </a>
);
