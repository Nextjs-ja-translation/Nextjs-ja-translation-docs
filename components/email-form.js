// Packages
import React from 'react';
import { validate } from 'email-validator';

// Components
import cn from 'classnames';
import AutoComplete from './auto-complete';
import { FONT_FAMILY_SANS } from './css-config';
import Button from './button';
import EmailClosedIcon from './icons/email-closed';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultEmail: props.defaultEmail,
      email: props.defaultEmail,
      ios: null,
      focus: false,
      shaking: false,
      error: false,
      safari: false
    };

    this.inputRef = null;
  }

  componentDidMount() {
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua);
    const safari = Boolean(ua.match(/Version\/[\d.]+.*Safari/));

    this.setState({
      ios,
      safari
    });
  }

  onRef = input => {
    this.inputRef = input;

    if (this.inputRef && this.props.autoFocus) {
      if (this.props.defaultEmail != null) {
        this.select();
      } else {
        this.focus();
      }
    }
  };

  onInput = email => {
    if (this.state.error) {
      if (validate(email)) {
        this.setState({ error: false });
      }
    }

    this.setState({ email });

    if (this.props.onChange && typeof this.props.onChange === 'function') {
      this.props.onChange({ email });
    }
  };

  onFocus = () => {
    this.setState({ focus: true });
  };

  onBlur = () => {
    this.setState({ focus: false });
  };

  focus() {
    // On mobile, we don't want to auto-focus
    // in order to prevent zooming.
    if (window.innerWidth < 992) {
      return;
    }

    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  select() {
    this.inputRef.select();
  }

  reset() {
    this.inputRef.reset();
  }

  submit = ev => {
    if (ev) ev.preventDefault();

    const { email } = this.state;
    const { onEmail } = this.props;

    if (validate(email)) {
      this.setState({ error: false });
      onEmail(email);
    } else {
      if (this.state.shaking) {
        return;
      }

      this.setState({
        error: true,
        shaking: true
      });

      setTimeout(() => {
        this.setState({
          shaking: false
        });
        this.focus();
      }, 1000);
    }
  };

  render() {
    const classes = [];
    const { ios, safari } = this.state;

    if (ios) {
      classes.push('ios');
    }

    if (safari) {
      classes.push('safari-browser');
    }

    return (
      <form
        method="POST"
        action-xhr="https://api-subscribe-nextjs.zeit.sh/"
        target="_top"
        id={this.props.id}
        className={cn(classes)}
        onSubmit={this.submit}
      >
        {this.props.label ? <p className="label">{this.props.label}</p> : null}
        <div
          className={cn(
            'email',
            this.state.error || this.props.errorMessage ? 'error' : '',
            this.state.focus ? 'focus' : '',
            this.props.loading ? 'loading' : '',
            this.state.shaking ? 'shaking' : '',
            this.props.flex ? 'flex' : ''
          )}
        >
          <label htmlFor="email-input-field">
            {this.props.withIcon && (
              <span className="icon">
                <EmailClosedIcon height="15" width="15" fill="currentColor" />
              </span>
            )}
            <AutoComplete
              ref={this.onRef}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onInput={this.onInput}
              align={this.props.align || 'center'}
            >
              <input
                type="email"
                id="email-input-field"
                defaultValue={this.state.defaultEmail || ''}
                disabled={Boolean(this.props.loading || this.props.disabled)}
                placeholder={this.props.placeholder || 'you@domain.com'}
              />
            </AutoComplete>
          </label>

          {this.props.withButton && (
            <Button
              type="submit"
              disabled={Boolean(this.props.loading || this.props.disabled)}
              width={this.props.flex && 175}
            >
              {this.props.message}
            </Button>
          )}
        </div>

        {this.props.errorMessage && (
          <p className="error-message">
            <span>
              {typeof this.props.errorMessage === 'string'
                ? this.props.errorMessage
                : 'A network error has occurred. Please retry.'}
            </span>
          </p>
        )}

        <style jsx>{`
          form {
            display: inline-block;
            position: relative;
            max-width: 100%;
          }

          form > div {
            width: 240px;
            max-width: 100%;
          }

          form > div.flex {
            display: flex;
            flex-direction: row;
            width: 490px;
            align-items: center;
            justify-content: space-between;
          }

          .email {
            text-align: center;
            margin: auto;
            transition: border-bottom-color 100ms ease-in, color 100ms ease-in;
            width: 100%;
          }

          .email.loading {
            border-bottom-color: #888;
          }

          .email :global(button) {
            height: 45px;
            margin: 10px 0;
            margin-bottom: 0;
            width: ${this.props.flex ? '175px' : '100%'};
            background-color: #000;
            color: #fff;
            border: 1px solid #000;
          }

          .email :global(button:focus),
          .email :global(button:hover) {
            background-color: transparent;
            border-color: #000;
            color: #000;
            outline: none;
          }

          .email.error label {
            border-color: red;
          }

          label {
            background-color: transparent;
            display: flex;
            border-radius: 8px;
            border: 1px solid #999;
            align-items: center;
            margin: 0 auto;
            width: ${this.props.flex ? '275px' : '100%'};
          }

          .focus label {
            background: none;
            transition: border-color 100ms ease-in;
            border-color: #333;
          }

          .error label {
            border-color: red;
          }

          .icon {
            margin: 0 14px;
            display: inline-flex;
          }

          input {
            background-color: transparent;
            border: none;
            border-radius: 0;
            box-sizing: border-box;
            color: #000;
            display: block;
            text-align: ${this.props.align || 'center'};
            font-size: 14px;
            font-family: ${FONT_FAMILY_SANS};
            padding: 4px ${this.props.withIcon ? '0' : '10px'};
            margin: 0 auto;
            height: 37px;
            line-height: 27px;
            width: 100%;
            box-shadow: none;
          }

          .ios input {
            font-size: 16px;
            height: 34px;
            padding-bottom: 4px;
          }

          .focus {
            border-bottom-color: #fff;
          }

          input::placeholder {
            color: #999;
            transition: color 100ms ease-in;
          }

          input:focus::placeholder {
            color: #999;
          }

          input:focus {
            outline: none;
          }

          input:disabled {
            color: #666;
          }

          input::-ms-clear {
            display: none;
          }

          .shaking {
            animation: shake 1s both;
          }

          .loading_anim {
            display: block;
            position: absolute;
            bottom: 0px;
            background: #eee;
            width: 100%;
            height: 1px;
            animation-name: waiting;
            animation-duration: 1s;
            animation-direction: alternate;
            animation-iteration-count: infinite;
            animation-timing-function: cubic-bezier(0, 0, 1, 1);
          }

          .inverse .loading_anim {
            background: #9b9b9b;
          }

          @keyframes waiting {
            0% {
              left: 0;
              width: 50px;
              opacity: 0;
            }

            50% {
              width: 100px;
              opacity: 1;
              left: 50%;
            }

            100% {
              width: 50px;
              opacity: 0;
              left: calc(100% - 50px);
            }
          }

          .label {
            color: #d6d6d6;
            font-size: 12px;
            margin-bottom: 40px;
            text-align: center;
          }

          .error-message {
            position: absolute;
            color: red;
            text-align: center;
            font-size: 12px;
            width: 110%;
            margin: 0;
            margin-left: -5%;
            margin-top: 0.5rem;
          }

          .error-message span {
            position: relative;
            padding-left: 20px;
          }

          .error-message span::before {
            display: block;
            content: '';
            width: 11px;
            background: red;
            border-radius: 2px;
            height: 11px;
            position: absolute;
            left: 0;
            top: 1px;
          }

          .submit {
            background: #fff;
            margin: 0 auto;
            display: block;
            width: 200px;
            height: 50px;
            border: 2px solid #000;
            text-transform: uppercase;
            font-size: 12px;
            margin-bottom: 50px;
            font-weight: bold;
          }

          @keyframes shake {
            0%,
            100% {
              transform: translate3d(0, 0, 0);
            }

            10%,
            30%,
            50%,
            70%,
            90% {
              transform: translate3d(-10px, 0, 0);
            }

            20%,
            40%,
            60%,
            80% {
              transform: translate3d(10px, 0, 0);
            }
          }

          @media (max-width: 700px) {
            form > div.flex {
              display: flex;
              flex-direction: column;
              width: 80vw;
              align-items: center;
              justify-content: space-between;
            }
          }
        `}</style>
      </form>
    );
  }
}

export default EmailForm;
