export default ({ duration, children }) => {
  const isF = typeof children === 'function';
  const child = num => (isF ? children(num) : children);
  return (
    <div className="slider-container">
      <style jsx>{`
        .slider-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .slider-content-wrapper {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          animation: slide ${duration * 2 || 10}s linear infinite;
        }
        .slider-content-wrapper > div {
          display: inline-block;
        }
        @keyframes slide {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
      <div className="slider-content-wrapper">
        <div>{child(1)}</div>
        <div>{child(2)}</div>
      </div>
    </div>
  );
};
