---
description: エラー処理をカスタマイズするために組み込みのエラーページを上書きして拡張しましょう。
---

## 404 ページ

404 ページは頻繁にアクセスされます。アクセスのたびにエラーページをサーバーサイドレンダリングすると、Next.js サーバーの負荷が高くなってしまいます。その結果、コストが増加したり、体験が遅くなったりすることがあります。

これを避けるために、Next.js ではファイルを追加することなく標準で静的な 404 ページを提供しています。

### 404 ページのカスタマイズ

`pages/404.js`ファイルを作成することで、カスタマイズされた 404 ページを作ることができます。このファイルはビルド時に静的に生成されます。

```jsx
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```

## 500 ページ

標準では、Next.js は標準の 404 ページのスタイルと同じ 500 エラーページを提供しています。このページはサーバーサイドのエラーを報告させるため、静的に最適化されません。そのため、404 と 500(その他のエラー)は分けられています。

### エラーページのカスタマイズ

500エラーは`Error`コンポーネントによって、クライアントサイドとサーバーサイドの両方で処理されます。上書きしたいのであれば`pages/_error.js`ファイルを作成し、以下のコードを追加します:

```jsx
function Error({ statusCode }) {
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
```

> `pages/_error.js`は本番環境でのみ使われます。開発時ではエラーがどこから発生したのかを知るためのコールスタックでエラーを取得します。

### 組み込みエラーページの再利用

組み込みエラーページをレンダリングしたい場合は、`Error`コンポーネントをインポートします:

```jsx
import Error from 'next/error';

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/zeit/next.js');
  const errorCode = res.ok ? false : res.statusCode;
  const json = await res.json();

  return {
    props: { errorCode, stars: json.stargazers_count }
  };
}

export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return <div>Next stars: {stars}</div>;
}
```

また、`statusCode`と一緒にテキストメッセージを渡したい場合、`Error`コンポーネントは`title`もプロパティとして受け取ります。
