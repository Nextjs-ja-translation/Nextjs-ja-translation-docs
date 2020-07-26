---
description: Next.js で使用され、アプリケーションのビルドと実行方法を決める build target について学びましょう。
---

# Build Target

Next.js は様々なビルドターゲットをサポートしています。これらはそれぞれ、あなたのアプリケーションのビルドと実行方法を変えます。下記でそれぞれのターゲットについて説明します。

## `server` ターゲット

これはデフォルトのターゲットですが、我々は [`serverless` ターゲット](#serverless-target)を強くお勧めします。`serverless` ターゲットは、[追加の制約](https://rauchg.com/2020/2019-in-review#serverless-upgrades-itself)を強制することで、あなたを[成功の落とし穴(原文: Pit of Success)](https://blog.codinghorror.com/falling-into-the-pit-of-success/)にはめてくれます。

このターゲットは、 `next start` と[カスタムサーバー](/docs/advanced-features/custom-server.md)の両方の設定と互換性があります。(カスタムサーバーを使用する場合はこのターゲットが必須)

あなたのアプリケーションは全てのページが 1 つの大きなアプリケーションとしてビルドされ、デプロイされます。これはデフォルトのターゲットで、特に設定の必要はありません。

## `serverless` ターゲット

> [Vercel](https://vercel.com) にデプロイする際は、自動でこのターゲットが有効になります。自分で設定をしないでください。

このターゲットは、モノリシックなサーバーを必要としないような独立したページを出力します。

このターゲットは、`next start`、もしくは [Vercel](https://vercel.com) のようなサーバーレスプラットフォームとしか互換性がありません。- カスタムサーバーを利用できません。

このターゲットを選択するには、 `next.config.js` を以下のように設定してください:

```js
module.exports = {
  target: 'serverless'
};
```

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の紹介</b>
    <small>Next.js で使われる設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/deployment.md">
    <b>デプロイ</b>
    <small>Next.js のアプリをコンパイルし開発環境へデプロイしましょう。</small>
  </a>
</div>
