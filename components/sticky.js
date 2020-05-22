import cn from 'classnames';

const Sticky = ({ offset, children, shadow }) => {
  return (
    <div style={{ top: offset || 0 }} className={cn({ shadow })}>
      {children}

      <style jsx>{`
        div {
          background: #fff;
          position: sticky;
          z-index: 1000;
        }
        div.shadow {
          box-shadow: rgba(0, 0, 0, 0.06) 0px 6px 20px;
        }
      `}</style>
    </div>
  );
};

export default Sticky;
