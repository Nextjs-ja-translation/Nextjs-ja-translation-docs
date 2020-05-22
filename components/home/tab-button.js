import classNames from 'classnames';

export default function TabButton({ small, light, invert, selected, onClick, on, type, children }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={classNames('fw4 no-drag no-tap-highlight', {
        selected,
        f5: small
      })}
      onClick={onClick}
      on={on}
      type={type}
    >
      <style jsx>{`
        button {
          display: inline-block;
          border-radius: 7px;
          cursor: pointer;
          text-decoration: none;
          padding: 0.25rem 0.5rem;
          margin: ${small ? '.25rem' : '0 1rem'};
          color: ${invert ? '#8D8D8D' : '#999'};
          transition: all 0.2s ease;
          background-color: transparent;
          font-size: inherit;
          border: none;
          line-height: inherit;
          flex: ${small ? '0 0 100%' : 'initial'};
        }
        @media screen and (max-width: 960px) {
          button {
            margin: 0.25rem;
            flex: 0 0 100%;
            font-size: 0.8888888888888888em;
          }
        }
        button:hover {
          // color;
          ${light
            ? 'opacity: 1;'
            : invert
            ? 'background-color: rgba(255, 255, 255, .05)'
            : 'background-color: rgba(0, 0, 0, .05)'};
        }
        button.selected {
          color: ${invert ? '#efefef' : 'inherit'};
          ${light
            ? 'opacity: 1;'
            : invert
            ? 'background-color: rgba(255, 255, 255, .1)'
            : 'background-color: rgba(0, 0, 0, .1)'};
        }
      `}</style>
      {children}
    </button>
  );
}
