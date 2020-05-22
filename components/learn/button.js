import { PureComponent } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { transparentize, darken } from 'polished';

function withPure(Comp) {
  return class extends PureComponent {
    render() {
      return <Comp {...this.props} />;
    }
  };
}

export default withPure(
  ({
    children,
    disabled,
    invert,
    light,
    large,
    href,
    as,
    color,
    shadowColor,
    noHover,
    flat,
    full,
    wide,
    className,
    ...props
  }) => {
    const isExternal = href && href.startsWith('http');
    const a = (
      <a
        href={href}
        className={classNames(className, 'fw4 no-drag', { invert, disabled })}
        role="button"
        tabIndex="0"
        {...props}
      >
        {children}
        <style jsx>{`
          a {
            display: inline-block;
            cursor: pointer;
            text-decoration: none;
            padding: 0.25rem 0.5rem;
            margin: -0.25rem -0.5rem;
            border-radius: 7px;
            color: ${color || '#0070f3'};
            transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
            ${full
              ? `
            margin: 0;
            height: 2.5rem;
            padding: 0 1rem;
            line-height: 2.5rem;
          `
              : ''}
            ${wide ? `padding: 0.25rem 0.8rem; margin: -0.25rem -0.3rem;` : ''}
          }
          a:hover {
            color: ${color || '#0070f3'};
            background: ${shadowColor || 'rgba(0,118,255,0.1)'};
          }
          a.invert {
            margin: 0;
            ${wide ? `margin: -0.25rem -0.3rem;` : ''}
            border-radius: 7px;
            color: white;
            background: ${color || '#0070f3'};
            ${flat
              ? `box-shadow: 0 2px 6px 0 ${shadowColor || 'rgba(0, 0, 0, 0.12)'};`
              : light
              ? `
              box-shadow: 0 2px 6px 0 ${shadowColor || 'rgba(0,118,255,0.39)'};
            `
              : `
              box-shadow: 0 4px 14px 0 ${shadowColor || 'rgba(0,118,255,0.39)'};
            `}
            ${light
              ? ''
              : `
              padding: 0 2rem;
              height: 2.5rem;
              line-height: 2.5rem;
            `}
          }
          a.invert:hover {
            ${noHover
              ? ''
              : `
            background: ${color ? transparentize(0.1, color) : 'rgba(0,118,255,0.9)'};
            box-shadow: 0 6px 20px ${shadowColor || 'rgba(0,118,255,0.23)'};
          `}
          }
          a.invert:active {
            background: ${color ? darken(0.05, color) : '#006ae6'};
          }
          a.disabled {
            color: #c7c7c7;
          }
          a.disabled:hover {
            background: #f5f5f5;
          }
        `}</style>
      </a>
    );

    if (href && !isExternal) {
      return (
        <Link href={href} as={as}>
          {a}
        </Link>
      );
    }
    return a;
  }
);
