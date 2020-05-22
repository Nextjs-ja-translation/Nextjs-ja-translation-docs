export default ({ inverse, dark }) => (
  <svg width="36" height="36" viewBox="0 -3 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path
        d="M18 30C25.732 30 32 23.732 32 16C32 8.26801 25.732 2 18 2C10.268 2 4 8.26801 4 16C4 23.732 10.268 30 18 30Z"
        fill={inverse ? '#007AFF' : dark ? '#000' : '#fff'}
      />
      <path
        d="M13 16.3333L15.9167 19.25L22.1667 13"
        stroke={inverse || dark ? '#fff' : '#000'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  </svg>
);
