import { Component } from 'react';
import PropTypes from 'prop-types';

function isInDOM(obj) {
  return Boolean(obj.closest('body'));
}

function hasParent(element, root) {
  return root.contains(element) && isInDOM(element);
}

export default class ClickOutside extends Component {
  static propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
    render: PropTypes.func
  };

  static defaultProps = {
    active: true
  };

  constructor(props) {
    super(props);
    this.handleRef = this.handleRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.active) {
      document.addEventListener('mousedown', this.handleClick);
      document.addEventListener('touchstart', this.handleClick);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.active && nextProps.active) {
      document.addEventListener('mousedown', this.handleClick);
      document.addEventListener('touchstart', this.handleClick);
    }

    if (this.props.active && !nextProps.active) {
      document.removeEventListener('mousedown', this.handleClick);
      document.removeEventListener('touchstart', this.handleClick);
    }
  }

  componentWillUnmount() {
    if (this.props.active) {
      document.removeEventListener('mousedown', this.handleClick);
      document.removeEventListener('touchstart', this.handleClick);
    }
  }

  handleRef(element) {
    this.element = element;
  }

  handleClick(event) {
    if (!hasParent(event.target, this.element)) {
      if (typeof this.props.onClick === 'function') {
        this.props.onClick(event);
      }
    }
  }

  render() {
    return this.props.render({
      innerRef: this.handleRef
    });
  }
}
