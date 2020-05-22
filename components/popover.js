import { PureComponent } from 'react';
import classNames from 'classnames';

export default class Popover extends PureComponent {
  state = {
    show: false,
    top: true,
    left: false
  };

  onMouseEnter = () => {
    let top = Infinity;
    let right = Infinity;
    let left = 0;

    if (this.containerEl) {
      const bounding = this.containerEl.getBoundingClientRect();
      top = bounding.top;
      right = window.innerWidth - bounding.right;
      left = bounding.left;
    }

    this.setState({
      show: true,
      left: right < 100,
      right: left < 100,
      bottom: top < (this.props.top || 110)
    });
  };

  onMouseLeave = () => {
    this.setState({ show: false });
  };

  handleClickOutside = ev => {
    if (
      this.state.show &&
      this.containerEl &&
      (this.containerEl === ev.target || this.containerEl.contains(ev.target))
    ) {
      this.onMouseLeave();
    }
  };

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener('touchstart', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
    window.removeEventListener('touchstart', this.handleClickOutside);
  }

  render() {
    const { bottom: _bottom, left: _left, right: _right, content, children } = this.props;
    const { show, left, right, bottom } = this.state;

    return (
      <div
        className={classNames('container', { show })}
        ref={el => {
          this.containerEl = el;
        }}
        onTouchStart={this.onMouseEnter}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <style jsx>
          {`
            .container {
              position: relative;
              display: inline-block;
              overflow: hidden;
            }
            .popover {
              position: absolute;
              left: 50%;
              padding: 0.5rem 1rem;
              border-radius: 7px;
              background: white;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 0 8px rgba(0, 0, 0, 0.1);
              transition: opacity 0.2s ease;
              transform: translateX(-50%);
              opacity: 0;
              visibility: hidden;
              z-index: 1011;
            }
            .popover.top {
              bottom: 100%;
              margin-bottom: 10px;
            }
            .popover.bottom {
              top: 100%;
              bottom: unset;
              margin-top: 10px;
            }
            .popover:after {
              content: '';
              position: absolute;
              width: 8px;
              height: 8px;
              background: white;
              transform: translateX(-50%) translateY(-50%) rotate(45deg);
            }
            .popover.top:after {
              top: 100%;
              left: 50%;
            }
            .popover.bottom:after {
              top: 0;
              left: 50%;
            }
            .popover.left {
              left: calc(50% + 17px);
              transform: translateX(-100%);
            }
            .popover.left:after {
              right: 10px;
              left: unset;
              transform: translateX(-50%) translateY(-50%) rotate(45deg);
            }
            .popover.right {
              left: calc(50% - 17px);
              transform: translateX(0%);
            }
            .popover.right:after {
              right: unset;
              left: 10px;
              transform: translateX(-50%) translateY(-50%) rotate(45deg);
            }
            .popover.show {
              opacity: 1;
              visibility: visible;
            }
            .container.show {
              overflow: visible;
            }
          `}
        </style>
        {children}
        <div
          className={classNames('popover top', 'f6', {
            show,
            bottom: _bottom || bottom,
            left: _left || left,
            right: _right || right
          })}
        >
          {content}
        </div>
      </div>
    );
  }
}
