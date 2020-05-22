export default ({ large, children }) => (
  <div className="icon">
    {children}
    <style jsx>
      {`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${large ? '80px' : '64px'};
          height: ${large ? '80px' : '64px'};
          background-color: #fff;
          border-radius: 50%;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.24);
        }
      `}
    </style>
  </div>
);
