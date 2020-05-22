import React from 'react';
import { FONT_FAMILY_SANS } from './css-config';

export default function Window(props) {
  const {
    titleColor,
    backgroundColor,
    borderColor,
    boxShadow,
    titleBg,
    height: propHeight,
    scroll,
    title,
    children
  } = props;

  const height = propHeight != null ? `${propHeight}px` : null;
  const noScroll = scroll === false;

  const classes = ['window'];

  return (
    <div className={classes.join(' ')} style={{ backgroundColor, borderColor, height, boxShadow }}>
      <div className="header">
        <span className="icon close" />
        <span className="icon minimize" />
        <span className="icon fullScreen" />
        <div className={`title ${titleBg ? 'title-bg' : ''}`} style={{ color: titleColor }}>
          {title}
        </div>
      </div>

      <div className={`body ${noScroll ? 'noScroll' : ''}`}>{children}</div>

      <style jsx>
        {`
          .window {
            border: 1px solid #333;
            width: 100%;
            height: 100%;
            position: relative;
            border-radius: 5px;
            box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.1);
          }
          .header {
            width: 100%;
            height: 36px;
            position: absolute;
          }
          .body {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            padding-top: 43px;
            position: absolute;
            overflow: auto;
          }
          .body.noScroll {
            overflow: hidden;
          }
          .icon {
            border-radius: 50%;
            display: inline-block;
            width: 12px;
            height: 12px;
            position: absolute;
            top: 52%;
            transform: translateY(-50%);
          }
          .close {
            background-color: #ff5f56;
            left: 13px;
          }
          .minimize {
            background-color: #ffbd2e;
            left: 33px;
          }
          .fullScreen {
            background-color: #27c93f;
            left: 53px;
          }
          .title {
            color: #999;
            font-size: 12px;
            font-family: ${FONT_FAMILY_SANS};
            position: absolute;
            top: 3px;
            left: 0;
            right: 0;
            text-align: center;
            width: 200px;
            margin: auto;
            border-radius: 4px;
            padding: 4px;
          }
          .title-bg {
            background-color: #f7f7f7;
          }
        `}
      </style>
    </div>
  );
}
