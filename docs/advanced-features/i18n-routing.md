---
description: Next.js には国際化されたルーティングと言語検出のビルトインサポートがあります。詳細はこちらをご覧ください。
---

# 国際化されたルーティング

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/i18n-routing">i18n ルーティング</a></li>
  </ul>
</details>

Next.js には `v10.0.0` から国際化（[i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization#Naming)）ルーティングのビルトインサポートがあります。ロケールの一覧やデフォルトのロケール、特定ドメインのロケールを指定すると、Next.js がルーティングを自動的に処理してくれます。

i18n ルーティングは、ルートとロケールの解析を効率化することで、`react-intl`, `react-i18next`, `lingui`, `rosetta` やその他の既存 i18n ライブラリによる実装を補完することを目的としています。

## はじめに

まずはじめに、`next.config.js` ファイルに `i18n` の設定を追加します。

ロケールには、ロケールを定義するための標準化されたフォーマットである UTS ロケール識別子（[UTS Locale Identifiers](https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers)）を用います。

一般的にロケール識別子は、ダッシュ区切りの言語、地域、スクリプトで構成されます: `language-region-script`。地域とスクリプトは任意項目です。例としては、以下のようになります:

- `en-US` - アメリカで話されている英語
- `nl-NL` - オランダで話されているオランダ語
- `nl` - 地域指定のないオランダ語

```js
// next.config.js
module.exports = {
  i18n: {
    // アプリケーションでサポートしたいすべてのロケール
    locales: ['en-US', 'fr', 'nl-NL'],
    // ロケールのプレフィックスを持たないパスを訪れる際に使用したい
    // デフォルトのロケール。例 `/hello`
    defaultLocale: 'en-US',
    // ロケールドメインの一覧と、それらが扱うべきデフォルトのロケールの一覧
    // （ドメインルーティングを設定する場合にのみ必要）
    // 注：サブドメインは、一致させるドメインの値に含まれている必要があります。例 "fr.example.com"
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.nl',
        defaultLocale: 'nl-NL',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
      },
    ],
  },
}
```

## ロケール戦略

ロケールを扱う戦略は 2 つあります: サブパスルーティングとドメインルーティングです。

### サブパスルーティング

サブパスルーティングはロケールを URL パスに含めます。

```js
// next.config.js
module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
  },
}
```

上記の設定では、`en-US`, `fr`, `nl-NL` がルーティング先として利用できます。そして `en-US` がデフォルトのロケールです。`pages/blog.js` がある場合は、以下のような URL が利用できます:

- `/blog`
- `/fr/blog`
- `/nl-nl/blog`

デフォルトのロケールはプレフィックスがありません。

### ドメインルーティング

ドメインルーティングを用いると、異なるドメインごとにロケールを設定できます。

```js
// next.config.js
module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL', 'nl-BE'],
    defaultLocale: 'en-US',

    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
      },
      {
        domain: 'example.nl',
        defaultLocale: 'nl-NL',
        // このドメインにリダイレクトすべき他のロケールを指定
        locales: ['nl-BE'],
      },
    ],
  },
}
```

例えば `pages/blog.js` の場合、以下のような URL が利用できます:

- `example.com/blog`
- `example.fr/blog`
- `example.nl/blog`
- `example.nl/nl-BE/blog`

## ロケールの自動検出

ユーザーがアプリケーションのルート（通常は `/`）にアクセスすると、Next.js は [`Accept-Language`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language) ヘッダーと現在のドメインに基づいて、ユーザーが好むロケールを自動的に検出しようとします。

デフォルトのロケール以外のロケールが検出された場合、ユーザーはいずれかのロケールにリダイレクトされます:

- **サブパスルーティングを使用する場合:** 該当するロケールのプレフィックスパス
- **ドメインルーティングを使用する場合:** 該当するロケールをデフォルトに指定するドメイン

ドメインルーティングを使用している場合、`Accept-Language` ヘッダー `fr;q=0.9` のユーザーが `example.com` を訪れると、そのドメインは `fr` ロケールをデフォルトとするため、ユーザーは `example.fr` にリダイレクトされます。

サブパスルーティングを使用している場合、ユーザーは `/fr` にリダイレクトされます。

### ロケールの自動検出を無効にする

ロケールの自動検出は次の設定で無効にできます:

```js
// next.config.js
module.exports = {
  i18n: {
    localeDetection: false,
  },
}
```

`localeDetection` を `false` に設定すると、Next.js はユーザーの好みのロケールに基づいた自動的なリダイレクトを止め、前述の通り、ロケールに基づくドメインまたはロケールパスから検出されたロケール情報のみを提供するようになります。

## ロケール情報へのアクセス

ロケール情報には Next.js ルーターを介してアクセスできます。例えば、[`useRouter()`](/docs/api-reference/next/router#userouter) フックを使用すると、以下のようなプロパティが利用できます:

- `locale` には、現在アクティブなロケールが含まれます。
- `locales` には、設定されたすべてのロケールが含まれます。
- `defaultLocale` には、設定されたデフォルトのロケールが含まれます。

`getStaticProps` や `getServerSideProps` でページを[プリレンダリング](/docs/basic-features/pages#static-generation-recommended)する場合、ロケール情報は関数へ渡される[コンテキスト](/docs/basic-features/data-fetching#getstaticprops-static-generation)に含まれます。

`getStaticPaths` を利用する場合、設定されたロケールは関数のコンテキストパラメータ内の `locales` 下で、設定された defaultLocale は `defaultLocale` 下で提供されます。

## ロケール間の遷移

ロケール間の遷移には、`next/link` または `next/router` を利用できます。

`next/link` の場合、現在有効なロケールから別のロケールへ遷移するために `locale` prop を指定できます。`locale` prop を指定しない場合、現在有効なロケールがクライアント遷移の際に使用されます。例としては、以下のようになります:

```jsx
import Link from 'next/link'

export default function IndexPage(props) {
  return (
    <Link href="/another" locale="fr">
      <a>To /fr/another</a>
    </Link>
  )
}
```

`next/router` メソッドを直接使用する場合、遷移オプションとして適用されるべき `locale` を指定できます。例としては、以下のようになります:

```jsx
import { useRouter } from 'next/router'

export default function IndexPage(props) {
  const router = useRouter()

  return (
    <div
      onClick={() => {
        router.push('/another', '/another', { locale: 'fr' })
      }}
    >
      to /fr/another
    </div>
  )
}
```

既にロケールを含む `href` を使用している場合は、ロケールプレフィックスの自動的な処理を適用しないようにできます。

```jsx
import Link from 'next/link'

export default function IndexPage(props) {
  return (
    <Link href="/fr/another" locale={false}>
      <a>To /fr/another</a>
    </Link>
  )
}
```

## NEXT_LOCALE クッキーの活用

Next.js は accept-language ヘッダーを `NEXT_LOCALE=the-locale` クッキーでオーバーライドすることをサポートしています。このクッキーは言語スイッチャーを使って設定でき、ユーザーがサイトに戻ってくると、クッキーで指定されたロケールを利用するようになります。

例えば、ユーザーはロケール `fr` を好む一方、`NEXT_LOCALE=en` クッキーが設定されている場合、クッキーが削除されるか期限切れになるまで `en` ロケールが代わりに使われます。

## 検索エンジン最適化

Next.js はユーザーが訪れている言語を把握しているので、自動的に `<html>` タグに `lang` 属性を追加します。

Next.js はページの複数バージョンについて把握していないので、`next/head` を使って `hreflang` メタタグを追加するかどうかは実装次第です。`hreflang` の詳細については [Google Webmasters ドキュメント](https://support.google.com/webmasters/answer/189077)を参照してください。

## 静的生成ではどのように動作しますか？

> `next export` は Next.js ルーティングレイヤーを利用しないため、国際化されたルーティングは `next export` と統合されないことに注意してください。`next export` を使用しないハイブリッド Next.js アプリケーションは完全にサポートされています。

### 自動的に静的最適化されたページ

自動的に静的最適化（[Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization)）されたページについては、ロケールごとにページのバージョンが生成されます。

### 非動的な getStaticProps ページ

動的ではない `getStaticProps` ページの場合、上記と同様にロケールごとにバージョンが生成されます。 `getStaticProps` は、レンダリングされる `locale` ごとに呼び出されます。特定のロケールをプリレンダリングから除外したい場合は、`getStaticProps` で `notFound: true` を返すと、そのページのバージョンは生成されないようになります。

```js
export async function getStaticProps({ locale }) {
  // 外部APIエンドポイントを呼び出して投稿を取得。
  // どのようなデータ取得ライブラリでも使えます。
  const res = await fetch(`https://.../posts?locale=${locale}`)
  const posts = await res.json()

  if (posts.length === 0) {
    return {
      notFound: true,
    }
  }

  // { props: posts } を返すことで、Blog コンポーネントは
  // ビルド時に `posts` を props として受け取ります。
  return {
    props: {
      posts,
    },
  }
}
```

### 動的な getStaticProps ページ

動的な `getStaticProps` ページの場合、 プリレンダリングしたいページのロケールバージョンを `getStaticPaths` で返す必要があります。`paths` として返される `params` オブジェクトに加えて、レンダリングしたいロケールを指定した `locale` フィールドを返すこともできます。例としては、以下のようになります:

```js
// pages/blog/[slug].js
export const getStaticPaths = ({ locales }) => {
  return {
    paths: [
      { params: { slug: 'post-1' }, locale: 'en-US' },
      { params: { slug: 'post-1' }, locale: 'fr' },
    ],
    fallback: true,
  }
}
```
