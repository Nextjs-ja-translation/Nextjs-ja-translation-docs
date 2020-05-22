import * as React from 'react';

const Emoji = ({ height, width, stroke, fill, label, darkBg: darkBg_, ...props }, context) => {
  const darkBg = darkBg_ || context.darkBg;

  return (
    <svg
      width={width || '14px'}
      height={height || '14px'}
      viewBox="0 0 14 14"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-label={label || 'emoji'}
      {...props}
    >
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <path
          d="M3.3 8.1c0-.4.4-.3.7-.4h1l.3-.1h4.3l.7.2c.2 0 .4 0 .5.3v.4c0 1.2-1 2.3-2.4 2.7h-.6l-.2.1a2 2 0 0 1-1 0h-.3c-1.6-.3-2.7-1.3-3-2.6V8m6.4-3.7c.4.1.7.3.8.8v.5c-.1.5-.6.8-1 .8-.6 0-1-.5-1.1-1 0-.5.3-1 .8-1.1h.5m-4.2.9c.1.4-.2 1-.6 1.1-.6.2-1.1 0-1.4-.5V5c0-.5.3-.7.7-.8h.5c.4 0 .7.3.8.8v.1"
          fill={darkBg ? '#FF' : fill || '#000'}
          fillRule="nonzero"
          strokeWidth="0"
        />
        <circle stroke={darkBg ? '#FFF' : stroke || '#000'} cx={7} cy={7} r="6.5" />
      </g>
    </svg>
  );
};

export default Emoji;
