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

i18n ルーティングはルートとロケールの解析を効率化することで、[`react-intl`](https://formatjs.io/docs/getting-started/installation), [`react-i18next`](https://react.i18next.com/), [`lingui`](https://lingui.js.org/), [`rosetta`](https://github.com/lukeed/rosetta), [`next-intl`](https://github.com/amannn/next-intl) やその他の既存 i18n ライブラリによる実装を補完することを目的としています。

## はじめに

まずはじめに、`next.config.js` ファイルに `i18n` の設定を追加します。

ロケールには、ロケールを定義するための標準化されたフォーマットである UTS ロケール識別子（[UTS Locale Identifiers](https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers)）を用います。

一般的にロケール識別子は、ダッシュ区切りの言語、地域、スクリプトで構成されます: `言語-地域-スクリプト`。地域とスクリプトは任意項目です。例としては、以下のようになります:

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
         // Note: subdomains must be included in the domain value to be matched
        // e.g. www.example.com should be used if that is the expected hostname
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
- `www.example.com/blog`
- `example.fr/blog`
- `example.nl/blog`
- `example.nl/nl-BE/blog`

### Prefixing the Default Locale

With Next.js 12 and [Middleware](/docs/middleware.md), we can add a prefix to the default locale with a [workaround](https://github.com/vercel/next.js/discussions/18419).

For example, here's a `next.config.js` file with support for a few languages. Note the `"default"` locale has been added intentionally.

```js
// next.config.js

module.exports = {
  i18n: {
    locales: ['default', 'en', 'de', 'fr'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,
}
```

Next, we can use [Middleware](/docs/middleware.md) to add custom routing rules:

```js
// pages/_middleware.ts

import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

const stripDefaultLocale = (str: string): string => {
  const stripped = str.replace('/default', '')
  return stripped
}

export function middleware(request: NextRequest) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes('/api/') &&
    request.nextUrl.locale === 'default'

  return shouldHandleLocale
    ? NextResponse.redirect(
        `/en${stripDefaultLocale(request.nextUrl.pathname)}${
          request.nextUrl.search
        }`
      )
    : undefined
}
```

This [Middleware](/docs/middleware.md) skips adding the default prefix to [API Routes](/docs/api-routes/introduction.md) and [public](/docs/basic-features/static-file-serving.md) files like fonts or images. If a request is made to the default locale, we redirect to our prefix `/en`.

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

`getStaticProps` や `getServerSideProps` でページを[プリレンダリング](/docs/basic-features/pages#static-generation-recommended)する場合、ロケール情報は関数へ渡される[コンテキスト](/docs/basic-features/data-fetching/get-static-props.md)に含まれます。

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

Note that to handle switching only the `locale` while preserving all routing information such as [dynamic route](/docs/routing/dynamic-routes.md) query values or hidden href query values, you can provide the `href` parameter as an object:

```jsx
import { useRouter } from 'next/router'
const router = useRouter()
const { pathname, asPath, query } = router
// change just the locale and maintain all other route information including href's query
router.push({ pathname, query }, asPath, { locale: nextLocale })
```

See [here](/docs/api-reference/next/router.md#with-url-object) for more information on the object structure for `router.push`.
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

Next.js は accept-language ヘッダーを `NEXT_LOCALE=the-locale` クッキーでオーバーライドすることをサポートしています。このクッキーは言語スイッチャーを使って設定でき、ユーザーがサイトに戻ってくると正しいロケール位置である `/` からリダイレクトするときにクッキーで指定されたロケールを利用するようになります。

例えば、ユーザーは accept-language ヘッダーにあるロケール `fr` を好む一方、`NEXT_LOCALE=en` クッキーが `/` を訪れたときに `en` ロケールが設定されている場合、クッキーが削除されるか期限切れになるまで `en` ロケールにリダイレクトされます。

## 検索エンジン最適化

Next.js はユーザーが訪れている言語を把握しているので、自動的に `<html>` タグに `lang` 属性を追加します。

Next.js はページの複数バージョンについて把握していないので、`next/head` を使って `hreflang` メタタグを追加するかどうかは実装次第です。`hreflang` の詳細については [Google Webmasters ドキュメント](https://support.google.com/webmasters/answer/189077)を参照してください。

## 静的生成ではどのように動作しますか？

> `next export` は Next.js ルーティングレイヤーを利用しないため、国際化されたルーティングは `next export` と統合されないことに注意してください。`next export` を使用しないハイブリッド Next.js アプリケーションは完全にサポートされています。

### Dynamic Routes and `getStaticProps` Pages

For pages using `getStaticProps` with [Dynamic Routes](/docs/routing/dynamic-routes.md), all locale variants of the page desired to be prerendered need to be returned from [`getStaticPaths`](/docs/basic-features/data-fetching/get-static-paths.md). Along with the `params` object returned for `paths`, you can also return a `locale` field specifying which locale you want to render. For example:

```js
// pages/blog/[slug].js
export const getStaticPaths = ({ locales }) => {
  return {
    paths: [
      // if no `locale` is provided only the defaultLocale will be generated
      { params: { slug: 'post-1' }, locale: 'en-US' },
      { params: { slug: 'post-1' }, locale: 'fr' },
    ],
    fallback: true,
  }
}
```

For [Automatically Statically Optimized](/docs/advanced-features/automatic-static-optimization.md) and non-dynamic `getStaticProps` pages, **a version of the page will be generated for each locale**. This is important to consider because it can increase build times depending on how many locales are configured inside `getStaticProps`.

For example, if you have 50 locales configured with 10 non-dynamic pages using `getStaticProps`, this means `getStaticProps` will be called 500 times. 50 versions of the 10 pages will be generated during each build.

To decrease the build time of dynamic pages with `getStaticProps`, use a [`fallback` mode](/docs/api-reference/data-fetching/get-static-paths#fallback-true). This allows you to return only the most popular paths and locales from `getStaticPaths` for prerendering during the build. Then, Next.js will build the remaining pages at runtime as they are requested.

### Automatically Statically Optimized Pages

For pages that are [automatically statically optimized](/docs/advanced-features/automatic-static-optimization.md), a version of the page will be generated for each locale.


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

## Limits for the i18n config

- `locales`: 100 total locales
- `domains`: 100 total locale domain items

> **Note:** These limits have been added initially to prevent potential [performance issues at build time](#dynamic-routes-and-getStaticProps-pages). You can workaround these limits with custom routing using [Middleware](/docs/middleware.md) in Next.js 12.