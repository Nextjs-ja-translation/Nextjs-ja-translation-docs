import { PureComponent } from 'react';

export default function (Comp) {
  return class extends PureComponent {
    render() {
      return <Comp {...this.props} />;
    }
  };
}
