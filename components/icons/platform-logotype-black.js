import classNames from 'classnames';

export default () => (
  <span className={classNames('fw9', 'fc-b')}>
    Next.js 日本語翻訳プロジェクト
    <style jsx>{`
      .fc-b {
        color: black;
      }
    `}</style>
  </span>
);
