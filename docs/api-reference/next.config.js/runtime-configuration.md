---
description: クライアント側とサーバー側のランタイムの設定をあなたの Next.js アプリケーションに追加します。
---

# Runtime configuration

> 一般的に、あなたの Next.js アプリケーションに設定値を渡すためには [build-time environment variables](/docs/api-reference/next.config.js/environment-variables.md) を使いたいです。なぜなら、 Runtime configuration は レンダリング / 初期化 のオーバーヘッドにつながるからであり、また [Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md) は互換性がないからです。

> Runtime configuration は [`serverless` target](/docs/api-reference/next.config.js/build-target.md#serverless-target) のときは利用できません。

Runtime configuration をあなたのアプリケーションに追加するためには、 `next.config.js` に `publicRuntimeConfig` と `serverRuntimeConfig` を記述してください:

```js
module.exports = {
  serverRuntimeConfig: {
    // サーバー側でのみ使えます
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET // 環境変数から渡す
  },
  publicRuntimeConfig: {
    // サーバー側、クライアント側の両方で使えます
    staticFolder: '/static'
  }
};
```

サーバー側だけで利用する値であれば、 Runtime config は `serverRuntimeConfig` に記述します。

クライアント側とサーバー側のどちらのコードからも使う値であれば、 `publicRuntimeConfig` に記述しましょう。

> `publicRuntimeConfig` を使用しているページは [Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md) の対象から除外するために、 **必ず** `getInitialProps` を使ってください。 Runtime configuration は `getInitialProps` を使っていないページ（またはページ内のコンポーネント）では利用できません。

あなたのアプリケーションで Runtime config を利用するためには `next/config` を以下のように記述してください:

```jsx
import getConfig from 'next/config';

// serverRuntimeConfig と publicRuntimeConfig だけを保持している
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
// サーバー側でのみ使えます
console.log(serverRuntimeConfig.mySecret);
// サーバー側、クライアント側の両方で使えます
console.log(publicRuntimeConfig.staticFolder);

function MyImage() {
  return (
    <div>
      <img src={`${publicRuntimeConfig.staticFolder}/logo.png`} alt="logo" />
    </div>
  );
}

export default MyImage;
```

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の概要:</b>
    <small>Next.js の設定ファイルについてもっと学ぶ。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/api-reference/next.config.js/environment-variables.md">
    <b>環境変数:</b>
    <small>あなたの Next.js アプリケーションのビルド時に環境変数を利用する。</small>
  </a>
</div>
