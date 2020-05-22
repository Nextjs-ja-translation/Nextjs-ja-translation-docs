import withPure from './hoc/pure';

export default withPure(({ id, offset, children }) => (
  <div
    id={id}
    style={{
      minHeight: offset ? `calc(100vh - ${offset}px)` : ''
    }}
  >
    <style jsx>
      {`
         {
          width: 100%;
          min-height: 100vh;
        }
      `}
    </style>
    {children}
  </div>
));
