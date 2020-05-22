import React, { useMemo } from 'react';
import hljs from 'highlight.js';

export default function Highlight({ children, language, ...props }) {
  const highlighted = useMemo(() => {
    const html = children;
    return hljs.highlightAuto(html, ['javascript']).value;
  }, [children]);

  return (
    <pre>
      {/* eslint-disable react/no-danger */}
      <code
        {...props}
        dangerouslySetInnerHTML={{
          __html: highlighted
        }}
      />
    </pre>
  );
}
