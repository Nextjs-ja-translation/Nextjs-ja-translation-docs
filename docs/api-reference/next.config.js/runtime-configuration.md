---
description: クライアント側とサーバー側のランタイム設定を Next.js アプリケーションに追加します。
---

# ランタイム設定

> 一般的には、 [環境変数](/docs/api-reference/next.config.js/environment-variables.md) を使用して設定を行うのがいいでしょう。なぜなら、ランタイム設定はレンダリング / 初期化時の余計な処理につながり、また [Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md) と互換性がないからです。

> ランタイム設定は [`serverless` target](/docs/api-reference/next.config.js/build-target.md#serverless-target) のときは利用できません。

ランタイム設定を追加するためには、`next.config.js` に `publicRuntimeConfig` と `serverRuntimeConfig` を記述してください:

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

サーバー側だけで利用する値であれば、ランタイムの設定は `serverRuntimeConfig` に記述してください。

クライアント側とサーバー側のどちらのコードからも使う値であれば、 `publicRuntimeConfig` に記述してください。

> `publicRuntimeConfig` に依存しているページは [Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md) の対象から除外するために、 **必ず** `getInitialProps` を使ってください。 ランタイム設定は `getInitialProps` を使っていないページ（またはページ内のコンポーネント）では利用できません。

アプリケーション内でランタイムの設定を利用するためには `next/config` を以下のように記述してください:

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
    <b>next.config.js の紹介:</b>
    <small>Next.js の設定ファイルについて学ぶ。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/api-reference/next.config.js/environment-variables.md">
    <b>環境変数:</b>
    <small>Next.js アプリケーションのビルド時に環境変数を利用する。</small>
  </a>
</div>
