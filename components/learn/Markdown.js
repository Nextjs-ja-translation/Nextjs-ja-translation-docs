import React from 'react';
import { MDXProvider } from '@mdx-js/tag';

const A = ({ children, ...props }) => (
  <a target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
);

export const H2 = ({ children }) => (
  <h2>
    {children}
    <style jsx>{`
      h2 {
        margin-top: 2rem;
        font-size: 1.25rem;
      }
    `}</style>
  </h2>
);

const H3 = ({ children }) => (
  <h3>
    {children}
    <style jsx>{`
      h3 {
        margin-top: 2rem;
        font-size: 1.125rem;
      }
    `}</style>
  </h3>
);

const Hr = () => (
  <>
    <hr />
    <style jsx>{`
      hr {
        margin: 3rem 0;
        border: none;
        border-bottom: 1px solid #dadada;
      }
    `}</style>
  </>
);

const Img = ({ ...props }) => (
  <>
    <img {...props} alt={props.alt || ''} />
    <style jsx>{`
      img {
        max-width: 100%;
      }
    `}</style>
  </>
);

const Blockquote = ({ children }) => (
  <blockquote>
    {children}
    <style jsx>{`
      blockquote {
        margin: 2rem 0;
        padding: 1rem 1.25rem;
        background: #f7f7f7;
      }
      blockquote :global(p:first-child) {
        margin-top: 0;
      }
      blockquote :global(p:last-child) {
        margin-bottom: 0;
      }
    `}</style>
  </blockquote>
);

const Code = ({ children }) => (
  <pre>
    <code>{children}</code>
    <style jsx>{`
      pre {
        background: #1d1f21;
        color: #f8f8f2;
        white-space: pre;
        overflow: auto;
        padding: 1.5rem;
        margin: 40px 0;
        border-radius: 5px;
        -webkit-overflow-scrolling: touch;
      }
      pre code {
        padding: 0;
        border-radius: 0;
      }
      pre code::before {
        content: '';
      }
      pre code::after {
        content: '';
      }
      /* Allow selecting all text for easy copy-pasting.
         Right now, only enable it for CSS / Markdown because
         for JS code, you might not want to copy
         all the lines in a snippet.

         Workaround: For shell scripts,
         - Use "shell" for one-liners to allow users to copy easily
         - Use "bash" for multi-liners so they can select each line
         */
      :global(.language-css) pre,
      :global(.language-shell) pre,
      :global(.language-md) pre {
        user-select: all;
      }
    `}</style>
  </pre>
);

const InlineCode = ({ children }) => (
  <code>
    {children}
    <style jsx>{`
      code {
        color: rgb(212, 0, 255);
        font-size: 0.875em;
        white-space: pre-wrap;
      }
      code::before {
        content: '\`';
      }
      code::after {
        content: '\`';
      }

      :global(a) code {
        color: inherit;
      }
    `}</style>
  </code>
);

const components = {
  a: A,
  blockquote: Blockquote,
  code: Code,
  h2: H2,
  h3: H3,
  img: Img,
  hr: Hr,
  inlineCode: InlineCode
};

const Markdown = ({ children }) => <MDXProvider components={components}>{children}</MDXProvider>;

export default Markdown;
