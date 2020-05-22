import GithubSlugger from 'github-slugger';

const PermalinkIcon = () => (
  <span>
    <svg viewBox="0 0 16 16" width="16" height="16">
      <g strokeWidth="1" fill="#000000" stroke="#000000">
        <path
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"
        />
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"
        />
      </g>
    </svg>
  </span>
);

function Heading(props) {
  const { component, className, children, ...rest } = props;
  return React.cloneElement(
    component,
    {
      className: [className, component.props.className || ''].join(' '),
      ...rest
    },
    children
  );
}

export default props => {
  const { offsetTop } = props;
  const component = props.children;
  const children = component.props.children || '';

  let { id } = props;
  let text = children;

  const slugger = new GithubSlugger();

  if (id == null) {
    // If there are sub components, convert them to text
    if (Array.isArray(children)) {
      text = children
        .map(child => {
          return typeof child === 'object' ? child.props.children : child;
        })
        .join('');
    }

    id = slugger.slug(text);
  }

  const targetStyle =
    offsetTop != null ? { marginTop: `${-offsetTop}px`, paddingTop: `${offsetTop}px` } : null;
  return (
    <Heading className={props.lean ? 'lean' : ''} component={component} data-components-heading>
      <span id={id} className="target docs-anchor-target" style={targetStyle} />
      <a href={`#${id}`}>{children}</a>
      <span className="permalink">
        <PermalinkIcon />
      </span>
      <style jsx>
        {`
          a {
            color: inherit;
          }

          a:hover {
            color: inherit;
            border-bottom: 1px dotted;
          }

          :global(h1[data-components-heading]) a::before {
            content: '# ';
          }

          :global(h2[data-components-heading]) a::before {
            content: '## ';
          }

          :global(h3[data-components-heading]) a::before {
            content: '### ';
          }

          :global(.lean[data-components-heading]) a::before {
            content: '';
          }

          :global(h1[data-components-heading]::before),
          :global(h2[data-components-heading]::before),
          :global(h3[data-components-heading]::before),
          :global(h4[data-components-heading]::before) {
            display: none;
          }

          :global(h3[data-components-heading]) {
            border-top: 1px solid #f3f3f3;
            padding-top: 2rem;
          }

          .target {
            display: block;
            margin-top: -160px;
            padding-top: 160px;
            visibility: hidden;
            position: absolute;
          }

          .permalink {
            text-align: center;
            vertical-align: middle;
            visibility: hidden;
            display: none;
          }

          a:hover ~ .permalink {
            visibility: visible;
          }

          @media (min-width: 992px) {
            a {
              margin-right: 10px;
            }

            .permalink {
              display: inline-block;
            }
          }
        `}
      </style>
    </Heading>
  );
};
