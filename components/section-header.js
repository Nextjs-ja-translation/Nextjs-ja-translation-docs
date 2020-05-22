import withPure from './hoc/pure';

export default withPure(({ anchor, id, title, description, margin = '0 0 5rem 0', innerRef }) => (
  <div ref={innerRef}>
    <style jsx>
      {`
        h2 {
          font-size: 2rem;
          letter-spacing: -1px;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        div {
          position: relative;
          text-align: center;
          margin: ${margin};
        }
        .anchor {
          position: absolute;
          top: -9rem;
        }
        @media screen and (max-width: 640px) {
          div {
            padding: 0 10px;
          }
        }
      `}
    </style>
    {anchor && <span id={anchor} className="anchor" />}
    <h2 id={id} className="fw7">
      {title}
    </h2>
    {description && <h3 className="f-reset subtitle fw4">{description}</h3>}
  </div>
));
