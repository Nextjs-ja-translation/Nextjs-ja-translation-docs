---
description: Next.jsアプリケーションに環境変数を追加してアクセスする方法を学びます。
---

# 環境変数

> このドキュメントは、Next.jsバージョン9.4以上を対象としています。古いバージョンのNext.jsを使用している場合は、アップグレードするか、[next.config.jsの環境変数](/docs/api-reference/next.config.js/environment-variables.md)を参照してください。

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/environment-variables">環境変数</a></li>
  </ul>
</details>

Next.js には、環境変数のビルトインサポートがあり、次のことが可能です:

- [ `.env.local` を使用して環境変数をロードする](#loading-environment-variables)
- [ブラウザに環境変数を公開する](#exposing-environment-variables-to-the-browser)

## 環境変数のロード

Next.js には、環境変数を `.env.local` ファイルから `process.env` にロードするためのビルトインサポートがあります。

`.env.local`ファイルの例:

```bash
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

この例では、Node.js 環境の環境変数として `process.env.DB_HOST` 、`process.env.DB_USER`、`process.env.DB_PASS`が自動的にロードされます。環境変数は[データフェッチ](/docs/basic-features/data-fetching)と[API ルート](/docs/api-routes/introduction)で使用できます。

例えば、[`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation)で次のように使用できます:

```js
// pages/index.js
export async function getStaticProps() {
  const db = await myDB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  // ...
}
```

## ブラウザに環境変数を公開する

デフォルトでは、`.env.local`からロードされた環境変数は、Node.js 環境でのみ使用できます。つまり、ブラウザには公開されません。

変数をブラウザに公開するには、変数の前に `NEXT_PUBLIC_` を付ける必要があります。例えば:

```bash
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

こうすることで、`process.env.NEXT_PUBLIC_ANALYTICS_ID`が Node.js 環境に自動で読み込まれ、コードの任意の場所で使用できるようになります。`NEXT_PUBLIC_`を付けることで、ブラウザへ送信される JavaScript に値がインライン化されます。

```js
// pages/index.js
import setupAnalyticsService from '../lib/my-analytics-service'

// NEXT_PUBLIC_ を付けることで、 NEXT_PUBLIC_ANALYTICS_ID は、この場所で使用可能になります
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)

function HomePage() {
  return <h1>Hello World</h1>
}

export default HomePage
```

## デフォルトの環境変数

通常、必要なのは `.env.local` ファイルだけです。しかし、`development` (`next dev`) や `production` (`next start`) 環境で、デフォルト値を追加したい場合があります。

Next.js では、`.env`(すべての環境)、`.env.development`(開発環境)、および `.env.production` (本番環境)でデフォルト値を設定できます。

`.env.local` は常にデフォルト値を上書きします。

> **備考**: `.env`、`.env.development`、`.env.production`ファイルは、デフォルト値を定義する場合にはリポジトリに含めるべきです。無視されることが意図されている**`.env*.local`ファイルは `.gitignore` に追加するべき**です。`.env.local`ファイルはシークレット値を保存できる場所です。

## Vercelの環境変数

[Vercel](https://vercel.com)にデプロイする場合、Vercel のダッシュボードのプロジェクトの[Environment Variables](https://vercel.com/docs/v2/build-step#environment-variables)セクションでシークレット値を設定できます。

デフォルト値を追加するのに `.env` 、`.env.development`、`.env.production`も使用できます。

[Development Environment Variables](https://vercel.com/docs/v2/build-step#development-environment-variables)を設定している場合、それらをローカルマシンで使用するには、次のコマンドで `.env.local` にプルできます:

```bash
vercel env pull .env.local
```

## テスト環境変数

`development`環境と `production` 環境とは別に、3 番目のオプションとして `test` 環境を利用できます。開発環境や本番環境でデフォルト値を設定できるのと同じ方法で、テスト環境の `.env.test` ファイルでも同じことができます(ただし、前の 2 つほど一般的ではありません)。

これは、テスト目的のために特定の環境変数を設定する必要がある `jest` や `cypress` などのツールを使用してテストを実行する場合に便利です。`NODE_ENV`に `test` が設定されている場合にテストのデフォルト値が読み込まれますが、通常はテストツールが自動で読み込むため、手動で設定する必要はありません。

`test`環境と、`development``production`環境の間には覚えておくべき小さな違いがあります。テストはすべての人に同じ結果をもたらすことが期待されるため、テスト環境では `.env.local` はロードされません。(デフォルト値のセットを上書きすることを目的としている)`.env.local`を無視することで、すべてのテスト実行は異なる実行においても同じデフォルト値が使用されることになります。

> **備考**: デフォルトの環境変数と同様に、`.env.test`ファイルはリポジトリに含めるべきですが、`.env.test.local`は含めないでください。`.env*.local`は `.gitignore` によって無視されることが意図されています。
