export default function ArrowRight({ fill, width = 6, height = 10 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7" stroke={fill} strokeLinecap="square" />
    </svg>
  );
}
