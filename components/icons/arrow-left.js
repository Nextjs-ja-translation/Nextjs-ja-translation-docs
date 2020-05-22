export default ({ color }) => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <g fill={color || '#111111'}>
      <path
        fill={color || '#111111'}
        d="M14,17.414l-4.707-4.707c-0.391-0.391-0.391-1.023,0-1.414L14,6.586L15.414,8l-4,4l4,4L14,17.414z"
      />
    </g>
  </svg>
);
