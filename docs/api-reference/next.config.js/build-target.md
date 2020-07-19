---
description: Next.jsで使用され、アプリケーションの構築と実行の方法を決定するbuild targetについて学びましょう。
---

# Build Target

Next.jsは様々なビルドターゲットをサポートしています。これらはそれぞれ、あなたのアプリケーションのビルドと実行の方法を変えます。下記で各ターゲットについて説明します。

## `server` ターゲット

> これはデフォルトのターゲットですが、我々は[`serverless` target](#serverless-target)を強くお勧めします。`serverless`ターゲットは、[追加の制約](https://rauchg.com/2020/2019-in-review#serverless-upgrades-itself)を強制することで、あなたを[成功の落とし穴](https://blog.codinghorror.com/falling-into-the-pit-of-success/)にはめてくれます(訳注:成功に導いてくれるということ。)。

このターゲットは、`next start`と[カスタムサーバー](/docs/advanced-features/custom-server.md)の両方の設定と互換性があります。(カスタムサーバーを
使用する場合はこのターゲットが必須)

あなたのアプリケーションは全てのページが1つの大きなアプリケーションとしてビルドされ、デプロイされます。これはデフォルトターゲットで、特に設定は必要ありません。

## `serverless` ターゲット

> [Vercel](https://vercel.com)にデプロイする際は、自動でこのターゲットが有効になります。自分で設定をしないでください。

このターゲットは、モノリシックなサーバーを必要としないような独立したページを出力します。

このターゲットは、`next start`、もしくは[Vercel](https://vercel.com)のようなサーバーレスプラットフォームとしか互換性がありません。- カスタムサーバーを利用できません。

このターゲットを選択するには、`next.config.js`を以下のように設定してください。

```js
module.exports = {
  target: 'serverless'
};
```

## 関連ページ:

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>Introduction to next.config.js:</b>
    <small>Learn more about the configuration file used by Next.js.</small>
  </a>
</div>

<div class="card">
  <a href="/docs/deployment.md">
    <b>Deployment:</b>
    <small>Compile and deploy your Next.js app to production.</small>
  </a>
</div>
