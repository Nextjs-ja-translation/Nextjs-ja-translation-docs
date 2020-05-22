const campaignWords = [
  'Production',
  'Pre-Rendered Apps',
  'Static Websites',
  'the Jamstack',
  'the Enterprise',
  'the Desktop',
  'the Mobile Web',
  'Lightweight Apps',
  'SEO-Friendly Sites',
  'PWAs',
  'Electron'
];

export default () => {
  const animationDuration = 1.8;
  const animationLength = animationDuration * campaignWords.length;
  const endOfAnimation = 100 / campaignWords.length;
  const animationOverlap = 0.1;

  return (
    <div className="slider-container">
      <div className="words">
        {campaignWords.map((word, index) => (
          <span
            key={word}
            style={{
              animationDelay: index === 0 ? '1ms' : `${animationDuration * index}s`
            }}
          >
            {word}
          </span>
        ))}
      </div>
      <style jsx>{`
        .slider-container {
          margin: auto;
          margin-top: 0;
          margin-bottom: 0;
          line-height: 1.2em;
          white-space: nowrap;
          position: relative;
          pointer-events: none;
        }

        .words {
          width: 100%;
          height: 2.8em;
          display: block;
          margin-top: 1rem;
          margin-bottom: 0;
        }

        .words span {
          position: absolute;
          opacity: 0;
          overflow: hidden;
          letter-spacing: -1px;
          animation: slide-word ${animationLength}s linear infinite 0s;
          animation-timing-function: cubic-bezier(0.19, 0.82, 0.84, 1.06);
        }

        @keyframes slide-word {
          0% {
            opacity: 0;
            transform: translate3d(-50%, 25%, 0px);
            visibility: visible;
          }
          ${1 - 1 * animationOverlap}% {
            opacity: 1;
            transform: translate3d(-50%, 75%, 0px);
          }
          ${endOfAnimation}% {
            opacity: 1;
            transform: translate3d(-50%, 75%, 0px);
            visibility: visible;
          }
          ${endOfAnimation + endOfAnimation * animationOverlap}% {
            opacity: 0;
            transform: translate3d(-50%, 135%, 0px);
            visibility: hidden;
          }
          100% {
            opacity: 0;
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
};
