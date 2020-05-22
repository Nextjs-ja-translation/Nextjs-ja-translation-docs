import { memo, Component } from 'react';
import cn from 'classnames';
import ClickOutside from './click-outside';
import Button from './button';
import X from './icons/cross-no-fill';
import Checkmark from './icons/checkmark';
import EmojiIcon from './icons/emoji';
import FeedbackContext from './feedback-context';
import { FONT_FAMILY_SANS } from './css-config';

const EMOJIS = new Map([
  ['🤩', 'f929'],
  ['🙂', 'f600'],
  ['😕', 'f615'],
  ['😭', 'f62d']
]);

// gets the emoji from the code
let EMOJI_CODES = null;
function getEmoji(code) {
  if (code === null) return code;

  if (EMOJI_CODES === null) {
    EMOJI_CODES = new Map([...EMOJIS].map(([k, v]) => [v, k]));
  }
  return EMOJI_CODES.get(code);
}

class HeaderFeedback extends Component {
  state = {
    emoji: null,
    loading: false,
    focused: false,
    success: false,
    emojiShown: false,
    errorMessage: null,
    value: null
  };

  clearSuccessTimer = null;

  textAreaRef = null;

  handleTextAreaRef = node => {
    this.textAreaRef = node;
  };

  onFocus = () => {
    this.setState({ focused: true });
  };

  onEmojiShown = () => {
    this.setState({ emojiShown: true });
  };

  onEmojiHidden = () => {
    this.setState({ emojiShown: false });
  };

  onEmojiSelect = emoji => {
    this.setState({ emoji });
    if (this.textAreaRef) {
      this.textAreaRef.focus();
    }
  };

  onErrorDismiss = () => {
    this.setState({ errorMessage: null });
  };

  handleClickOutside = () => {
    this.setState({ focused: false });
    this.textAreaRef.value = '';
  };

  onKeyDown = e => {
    if (e.keyCode === 27) {
      this.setState({ focused: false });
    }
  };

  onSubmit = () => {
    const value = this.textAreaRef?.value.trim();

    if (!value.length) {
      this.setState({
        errorMessage: "Your feedback can't be empty"
      });
      return;
    }
    if (value.split(' ').length < 2) {
      this.setState({
        errorMessage: 'Please use at least 2 words'
      });
      return;
    }

    this.setState({ loading: true }, () => {
      fetch('https://api.nextjs.org/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: window.location.toString(),
          note: value,
          emotion: getEmoji(this.state.emoji),
          label: this.context?.label,
          ua: `${this.props.uaPrefix || ''} + ${navigator.userAgent} (${
            navigator.language || 'unknown language'
          })`
        })
      })
        .then(() => {
          this.setState({ loading: false, success: true });
        })
        .catch(err => {
          this.setState({
            loading: false,
            errorMessage: err?.message || 'An error ocurred. Try again in a few minutes.'
          });
        });
    });
  };

  handleChange = e => {
    if (this.state.focused) {
      this.setState({
        value: e.target.value
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.focused) {
      // textarea was hidden if we were showing an error message and
      // now we hide it
      if (prevState.errorMessage != null && this.state.errorMessage == null && this.textAreaRef) {
        this.textAreaRef.focus();
      }

      if (!prevState.focused) {
        window.addEventListener('keydown', this.onKeyDown);
      }

      // If a value exists, add it back to the textarea when focused
      this.textAreaRef.value = this.state.value;
    } else if (prevState.focused && this.textAreaRef) {
      // needed for when we e.g.: unfocus based on pressing escape
      this.textAreaRef.blur();

      // Remove value visibly from textarea while it's unfocused
      this.textAreaRef.value = '';

      // if we unfocused and there was an error before,
      // clear it
      if (prevState.errorMessage && this.textAreaRef) {
        this.setState({ errorMessage: null }); // eslint-disable-line react/no-did-update-set-state
      }

      // if we had a success message
      // clear it
      if (prevState.success) {
        this.setState({ success: false }); // eslint-disable-line react/no-did-update-set-state
      }

      window.removeEventListener('keydown', this.onKeyDown);
    }

    if (this.state.success && this.textAreaRef) {
      // forget about input state
      this.textAreaRef.value = '';

      // collapse in 5s
      this.clearSuccessTimer = window.setTimeout(() => {
        if (!document.hidden) {
          this.setState({ success: false });
        }
      }, 5000);
    } else {
      if (prevState.success) {
        window.clearTimeout(this.clearSuccessTimer);
        this.clearSuccessTimer = null;
      }

      if (prevState.success && this.state.focused) {
        this.setState({ focused: false }); // eslint-disable-line react/no-did-update-set-state
      }
    }
  }

  componentWillUnmount() {
    if (this.clearSuccessTimer !== null) {
      clearTimeout(this.clearSuccessTimer);
      this.clearSuccessTimer = null;
    }

    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    const { className, open, ...props } = this.props;
    const { focused } = this.state;
    delete props.onFeedback;

    return (
      <ClickOutside
        active={focused}
        onClick={this.handleClickOutside}
        render={({ innerRef }) => (
          <div
            ref={innerRef}
            title="Share any feedback about our products and services"
            className={cn(
              'geist-feedback-input',
              {
                focused: focused || open,
                error: this.state.errorMessage,
                loading: this.state.loading,
                success: this.state.success
              },
              className
            )}
            {...props}
          >
            <div className="textarea-wrapper">
              <textarea
                ref={this.handleTextAreaRef}
                placeholder={focused ? '' : 'Feedback'}
                onFocus={this.onFocus}
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.metaKey) {
                    this.onSubmit();
                  }
                }}
                onChange={this.handleChange}
                aria-label="Feedback input"
                disabled={this.state.loading === true || this.state.errorMessage != null}
              />

              {this.state.errorMessage != null && (
                <div className="error-message">
                  <span>{this.state.errorMessage}</span>
                  <Button
                    invert
                    small
                    onClick={e => {
                      e.preventDefault();
                      this.onErrorDismiss();
                    }}
                  >
                    GO BACK
                  </Button>
                </div>
              )}

              {this.state.success && (
                <div className="success-message">
                  <Checkmark size="2rem" className="checkmark" />
                  <p>Your feedback has been received!</p>
                  <p>Thank you for your help.</p>
                </div>
              )}

              {this.state.errorMessage == null && !this.state.success && (
                <div className="controls">
                  <span className="emojis">
                    {focused ? (
                      <EmojiSelector
                        onShow={this.onEmojiShown}
                        onHide={this.onEmojiHidden}
                        onSelect={this.onEmojiSelect}
                        loading={this.state.loading}
                      />
                    ) : null}
                  </span>
                  <span className={`buttons ${this.state.emojiShown ? 'hidden' : ''}`}>
                    <Button
                      invert
                      small
                      loading={this.state.loading}
                      onClick={this.onSubmit}
                      width={60}
                    >
                      Send
                    </Button>
                  </span>
                </div>
              )}
            </div>
            <style jsx>
              {`
                .geist-feedback-input {
                  --open-width: 310px;
                  --open-height: 174px;
                  --closed-width: 90px;
                  --closed-height: 32px;
                  --padding: 4px 10px;

                  margin-right: 8px;
                  padding: 0;
                  position: relative;
                  height: var(--closed-height);
                  width: var(--closed-width);
                  display: inline-block;
                  font-family: ${FONT_FAMILY_SANS};
                  text-rendering: optimizeLegibility;
                  -webkit-font-smoothing: antialiased;
                }

                textarea {
                  appearance: none;
                  border-width: 0;
                  background: #fff;
                  border: 1px solid #eaeaea;
                  padding: var(--padding);
                  line-height: 1.5;
                  font-size: 0.875rem;
                  border-radius: 5px;
                  font-family: ${FONT_FAMILY_SANS};
                  width: var(--closed-width);
                  height: var(--closed-height);
                  resize: none;
                  height: 100%;
                  /* fixes a bug in ff where the animation of the chat
                * counter appears on top of our input during its transition */
                  z-index: 100;
                  outline: 0;
                  color: #000;
                  overflow-y: hidden;
                  transition: border-color 0.2s ease-in-out;
                }

                .geist-feedback-input:hover textarea {
                  border-color: #000;
                }

                .geist-feedback-input:hover textarea::placeholder {
                  color: #000;
                }

                .geist-feedback-input.error textarea,
                .geist-feedback-input.loading textarea,
                .geist-feedback-input.success textarea {
                  pointer-events: none;
                }

                .geist-feedback-input.error textarea,
                .geist-feedback-input.success textarea {
                  color: transparent;
                  user-select: none;
                }

                .geist-feedback-input.loading textarea {
                  color: #999999;
                }

                textarea::placeholder {
                  color: #666666;
                  transition: color 0.2s ease-in-out;
                }

                .textarea-wrapper {
                  height: var(--closed-height);
                  width: var(--closed-width);
                  transition: all 150ms ease-in-out, border-radius 150ms step-start;
                }

                .geist-feedback-input.focused .textarea-wrapper {
                  transform: translateX(calc((var(--closed-width) - var(--open-width)) / 2));
                  display: flex;
                  flex-direction: column;
                  border: none;
                  width: var(--open-width);
                  height: var(--open-height);
                  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
                  background: #fff;
                  border-radius: 4px;
                  overflow: hidden;
                  position: relative;
                  z-index: 1000;
                  transition: all 150ms ease-in-out, border-radius 150ms step-end;
                }

                .geist-feedback-input.focused .textarea-wrapper textarea {
                  width: var(--open-width);
                  border-color: #fff;
                  border-radius: 5px 5px 0 0;
                  background: #fff;
                  padding: var(--padding);
                  overflow-y: visible;
                  transition: none;
                }

                .error-message,
                .success-message {
                  z-index: 1001;
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: var(--open-width);
                  font-size: 0.875rem;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  text-align: center;
                  padding: 20px;
                  flex-direction: column;
                }

                .success-message p {
                  margin: 0;
                  opacity: 0;
                  white-space: nowrap;
                  animation: appear 500ms ease forwards;
                }

                .success-message :global(.checkmark) {
                  opacity: 0;
                  animation: appear 200ms 100ms ease forwards;
                }

                .success-message p:first-of-type {
                  margin-top: 8pt;
                  margin-bottom: 4pt;
                  animation-delay: 300ms;
                }

                .success-message p:nth-of-type(2) {
                  animation-delay: 500ms;
                }

                .error-message span {
                  color: #ee0000;
                  margin-bottom: 8pt;
                }

                .error-message a {
                  color: #000;
                  text-decoration: none;
                }

                .geist-feedback-input.focused .controls {
                  display: flex;
                }

                .controls {
                  pointer-events: none;
                  visibility: hidden;
                  width: var(--closed-width);
                  background-color: #fff;
                  display: flex;
                  align-items: center;
                  border-bottom-left-radius: 5px;
                  border-bottom-right-radius: 5px;
                }

                .controls .emojis {
                  width: 160px;
                }

                .controls .buttons {
                  flex: 1;
                  text-align: right;
                  transition: opacity 200ms ease;
                }

                .emojis,
                .buttons {
                  opacity: 0;
                }

                .geist-feedback-input.focused .emojis,
                .geist-feedback-input.focused .buttons {
                  animation: appear 150ms 250ms ease-in-out forwards;
                }

                .buttons.hidden {
                  opacity: 0;
                }

                .geist-feedback-input.focused .controls {
                  padding: 8pt;
                  pointer-events: inherit;
                  visibility: visible;
                  width: var(--open-width);
                }

                @keyframes appear {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }
              `}
            </style>
          </div>
        )}
      />
    );
  }
}

class EmojiSelector extends Component {
  state = {
    shown: false,
    current: null,
    currentSetAt: null
  };

  onMouseEnter = () => {
    this.setState(prevState => {
      if (!prevState.shown && Date.now() - (prevState.currentSetAt || 0) > 100) {
        return { shown: true };
      }
      return prevState;
    });
  };

  onMouseLeave = () => {
    this.setState(prevState => {
      if (prevState.shown) {
        return { shown: false };
      }

      return prevState;
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onShow && !prevState.shown && this.state.shown) {
      this.props.onShow();
    }

    if (this.props.onHide && prevState.shown && !this.state.shown) {
      this.props.onHide();
    }

    if (this.props.onSelect && prevState.current !== this.state.current) {
      this.props.onSelect(this.state.current);
    }
  }

  onSelect = current => {
    this.setState({
      current,
      currentSetAt: Date.now(),
      shown: false
    });
  };

  render() {
    return (
      <main
        className={cn('geist-emoji-selector', {
          shown: this.state.shown,
          loading: this.props.loading
        })}
      >
        <button
          className={this.state.current !== null ? 'active' : ''}
          onMouseEnter={this.onMouseEnter}
          onTouchStart={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          type="button"
          onClick={
            this.state.current !== null && this.state.shown
              ? () => this.onSelect(null)
              : this.state.shown
              ? this.onMouseLeave
              : this.onMouseEnter
          }
        >
          <span className="inner icon">
            {this.state.current === null ? (
              <EmojiIcon width="16px" height="16px" />
            ) : this.state.shown ? (
              <X />
            ) : (
              <Emoji code={this.state.current} />
            )}
          </span>
        </button>

        {Array.from(EMOJIS.values()).map(emoji => (
          <button
            type="button"
            className="option"
            key={emoji}
            onMouseEnter={this.onMouseEnter}
            onTouchStart={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={this.onSelect.bind(this, emoji)}
          >
            <span className="inner">
              <Emoji code={emoji} />
            </span>
          </button>
        ))}

        <style jsx>
          {`
            .geist-emoji-selector {
              display: flex;
              width: 210px;
              pointer-events: none;
            }

            .geist-emoji-selector.loading {
              filter: grayscale(100%);
              -webkit-filter: grayscale(100%);
              cursor: default;
              pointer-events: none;
            }

            .geist-emoji-selector > button {
              outline: none;
              background: transparent;
              border: 0;
              padding: 0;
              margin: 0;
            }

            .geist-emoji-selector > button,
            .geist-emoji-selector > button .inner {
              display: inline-flex;
            }

            .geist-emoji-selector > button {
              cursor: pointer;
              text-align: center;
            }

            .geist-emoji-selector > button:not(:last-child) {
              padding-right: 2px;
            }

            .geist-emoji-selector > button:not(:first-child) {
              padding-left: 2px;
            }

            .geist-emoji-selector.loading > button {
              cursor: default;
            }

            .geist-emoji-selector > button:first-child {
              outline: none;
              pointer-events: all;
            }

            .geist-emoji-selector.loading > button:first-child {
              outline: none;
              pointer-events: none;
            }

            .geist-emoji-selector > button .inner {
              height: 24px;
              width: 24px;
              border-radius: 4px;
              border: 1px solid #eaeaea;
              justify-content: center;
              align-items: center;
              padding: 3px;
            }

            .geist-emoji-selector > button .inner.icon {
              padding: 3px 2px 2px 2px;
            }

            .geist-emoji-selector > button.active .inner,
            .geist-emoji-selector > button:hover .inner {
              border-color: #f7b955;
            }

            .geist-emoji-selector > button.option {
              opacity: 0;
              transform: translate3d(-10px, 0px, 0px);
              transition: all ease 100ms;
              pointer-events: none;
            }

            .geist-emoji-selector.shown > button.option {
              pointer-events: all;
            }

            .geist-emoji-selector.shown > button.option {
              opacity: 1;
              transform: translate3d(0, 0px, 0px);
            }
          `}
        </style>
      </main>
    );
  }
}

HeaderFeedback.contextType = FeedbackContext;

const Emoji = memo(({ code }) => (
  <img
    decoding="async"
    width={code === 'f600' || code === 'f62d' || code === 'f615' ? 18.5 : 16}
    height={code === 'f600' || code === 'f62d' || code === 'f615' ? 18.5 : 16}
    src={`https://assets.vercel.com/twemoji/1${code}.svg`}
    alt="emoji"
    loading="lazy"
    style={{
      transform: code === 'f600' || code === 'f615' ? 'translateY(0.5px)' : 'none'
    }}
  />
));

export default HeaderFeedback;
