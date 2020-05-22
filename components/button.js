import Link from 'next/link';
import classNames from 'classnames';
import css from 'styled-jsx/css';

import withPure from './hoc/pure';
import LoadingDots from './loading-dots';

const cachedStyles = css`
  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    margin: -0.25rem -0.5rem;
    border-radius: 7px;
    color: #0070f3;
    background-color: transparent;
    border: none;
    font-size: inherit;
    line-height: inherit;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    outline: none;
  }
  .btn:hover {
    color: #0070f3;
    background: rgba(0, 118, 255, 0.1);
  }
  .btn.invert {
    margin: 0;
    padding: 0 3.5rem;
    height: 2.81rem;
    line-height: 2.8rem;
    border-radius: 7px;
    background-color: #0070f3;
    box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);
    color: white;
  }
  .btn.invert:hover {
    background: rgba(0, 118, 255, 0.9);
    box-shadow: 0 6px 20px rgba(0, 118, 255, 0.23);
  }
  .btn.invert:active {
    background: #006ae6;
  }
  .btn.invert.outline {
    background: #fff;
    color: #696969;
    box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  }
  .btn.invert.outline:hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgba(93, 93, 93, 0.23);
  }
  .btn.small {
    font-size: 0.875rem;
    height: 1.5rem;
    padding: 0 0.75rem;
    line-height: inherit;
    border-radius: 5px;
  }
  .btn.loading {
    background: #fafafa;
    color: #888888;
    border: 1px solid #000;
    border-color: #eaeaea;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
  }
  .btn.loading > .text {
    visibility: hidden;
  }
  .btn > .loading-dots {
    position: absolute;
  }
`;

export default withPure(function Button({
  children,
  invert,
  outline,
  small,
  href,
  as,
  className,
  amp,
  loading,
  ...props
}) {
  const cachedClassNames = classNames(className, 'btn', 'fw4 no-drag', {
    outline,
    invert,
    small,
    loading
  });

  if (href) {
    const isExternal = href && href.startsWith('http');
    const a = (
      <a className={cachedClassNames} href={href} {...props}>
        {children}
        <style jsx>{cachedStyles}</style>
      </a>
    );

    return amp || isExternal ? (
      a
    ) : (
      <Link href={href} as={as} passHref>
        {a}
      </Link>
    );
  }

  return (
    <button type="button" className={cachedClassNames} {...props}>
      <span className="text">{children}</span>
      {loading && (
        <span className="loading-dots">
          <LoadingDots size={4} />
        </span>
      )}
      <style jsx>{cachedStyles}</style>
    </button>
  );
});
