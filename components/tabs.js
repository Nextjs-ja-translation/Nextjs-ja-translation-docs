/* global window */
import { PureComponent } from 'react';
import Router from 'next/router';
import { useAmp } from 'next/amp';
import GithubSlugger from 'github-slugger';

class TabsWrapper extends PureComponent {
  constructor(props) {
    super();

    this.state = {
      selected: props.data[0]
    };
  }

  componentDidMount() {
    const slugger = new GithubSlugger();
    const { anchor, data } = this.props;

    if (anchor) {
      const index = data.map(tab => slugger.slug(tab)).indexOf(window.location.hash.slice(1));
      if (index !== -1) {
        this.setState({
          selected: data[index]
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.setState({ selected: data[0] });
    }
  }

  onSelect = id => {
    const { data, selected, anchor } = this.props;
    if (data.indexOf(id) === -1) {
      return;
    }
    if (selected === id) {
      return;
    }
    if (anchor) {
      // wait 300ms for re-render
      // for the performance reason
      setTimeout(() => {
        const slugger = new GithubSlugger();

        Router.replace(
          window.location.pathname,
          `${window.location.pathname}#${slugger.slug(id)}`,
          { shallow: true }
        );
      }, 300);
    }
    this.setState({
      selected: id
    });
  };

  render() {
    const { data, children } = this.props;
    if (!data.length) {
      return null;
    }

    let { selected } = this.state;
    const index = data.indexOf(selected);
    if (index === -1) {
      // eslint-disable-next-line prefer-destructuring
      selected = data[0];
    }

    if (typeof children !== 'function') {
      return null;
    }
    return children(this.onSelect, selected, index);
  }
}

function UnrollTabs({ ampKey, data, children }) {
  if (typeof children !== 'function') {
    return null;
  }

  const mutations = [];

  data.forEach((possibility, index) =>
    mutations.push([possibility, children(() => {}, possibility, index)])
  );

  return (
    <>
      <amp-state id={ampKey}>
        <script
          type="application/json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ selected: data[0] })
          }}
        />
      </amp-state>
      {mutations.map(([currentKey, mutation], index) => (
        <div
          className={index === 0 ? '' : 'display-none'}
          data-amp-bind-class={`${ampKey}.selected == ${JSON.stringify(
            currentKey
          )} ? '' : 'display-none'`}
        >
          {mutation}
        </div>
      ))}
    </>
  );
}

export default function Tabs({ ampKey, ...props }) {
  const isAmp = useAmp();
  if (isAmp) {
    if (!ampKey) {
      // TODO: React.error();
      throw new Error('invariant');
    } else {
      return <UnrollTabs ampKey={ampKey} {...props} />;
    }
  }
  return <TabsWrapper {...props} />;
}
