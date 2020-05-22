export const Blockquote = ({ children, ...props }) => (
  <blockquote {...props}>
    {children}

    <style jsx>{`
      blockquote {
        margin: 2rem 0;
        padding: 1rem 1.25rem;
        background: #f7f7f7;
      }

      blockquote :global(p) {
        margin: 0;
      }

      blockquote :global(pre) {
        background: white;
      }
    `}</style>
  </blockquote>
);
