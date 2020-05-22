import { useAmp } from 'next/amp';

const makeLink = (onSelect, ampKey) => ({ tab, children }) => {
  const isAmp = useAmp();

  if (isAmp) {
    return (
      <>
        <button
          type="button"
          on={`tap:AMP.setState({ ${ampKey}: { selected: ${JSON.stringify(tab)} } })`}
        >
          {children}
        </button>
        <style jsx>{`
          button {
            align-items: normal;
            background-color: rgba(0, 0, 0, 0);
            border-color: rgb(0, 0, 238);
            border-style: none;
            box-sizing: content-box;
            color: rgb(0, 0, 238);
            cursor: pointer;
            display: inline;
            font: inherit;
            height: auto;
            padding: 0;
            perspective-origin: 0 0;
            text-align: start;
            text-decoration: underline;
            transform-origin: 0 0;
            width: auto;
          }
        `}</style>
      </>
    );
  }

  const handleClick = e => {
    e.preventDefault();
    onSelect(tab);
  };

  return (
    <a href={tab} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Comp => ({ onSelect, ampKey }) => (
  <div style={{ margin: 8 }}>
    <div style={{ all: 'initial' }}>
      <Comp A={makeLink(onSelect, ampKey)} />
    </div>
  </div>
);
