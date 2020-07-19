import classNames from 'classnames';

export default () => (
  <span className={classNames('fw9', 'fc-w')}>
    Next.js 日本語翻訳プロジェクト
    <style jsx>{`
      .fc-w {
        color: white;
      }
    `}</style>
  </span>
);
