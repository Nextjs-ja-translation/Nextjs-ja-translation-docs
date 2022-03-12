---
description: Fetch data and generate static pages with `getStaticProps`. Learn more about this API for data fetching in Next.js.
---

# getStaticProps

ページから `getStaticProps`（静的サイト生成）という関数をエクスポートすると、Next.js はビルド時に `getStaticProps` から返される props を使ってプリレンダリングします。

```jsx
export async function getStaticProps(context) {
  return {
    props: {}, // ページコンポーネントに props として渡されます。
  }
}
```

## getStaticProps をいつ使うべきか？

以下のような場合に `getStaticProps` を使うとよいでしょう:

- ページをレンダリングするのに必要なデータが、ビルド時にユーザーのリクエストよりも先に利用可能である場合。
- データがヘッドレス CMS から取得される場合。
- データが public にキャッシュ（ユーザー固有ではない）されうる場合。
- ページをプリレンダリングする必要があり（SEO のため）、かつ非常に高速でなければならない場合。`getStaticProps`は HTML と JSON ファイルを生成し、どちらもパフォーマンスのために CDN でキャッシュされます。

## When does getStaticProps run

`getStaticProps` always runs on the server and never on the client. You can validate code written inside `getStaticProps` is removed from the client-side bundle [with this tool](https://next-code-elimination.vercel.app/).

- `getStaticProps` always runs during `next build`
- `getStaticProps` runs in the background when using `revalidate`
- `getStaticProps` runs on-demand in the background when using [`unstable_revalidate`](/docs/basic-features/data-fetching/incremental-static-regeneration.md#on-demand-revalidation-beta)

When combined with [Incremental Static Regeneration](/docs/basic-features/data-fetching/incremental-static-regeneration.md), `getStaticProps` will run in the background while the stale page is being revalidated, and the fresh page served to the browser.

`getStaticProps` does not have access to the incoming request (such as query parameters or HTTP headers) as it generates static HTML. If you need access to the request for your page, consider using [Middleware](/docs/middleware.md) in addition to `getStaticProps`.

## Using getStaticProps to fetch data from a CMS

The following example shows how you can fetch a list of blog posts from a CMS.

```jsx
// posts はビルド時に getStaticProps() によって生成されます。
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

// この関数はサーバー側のビルド時に呼び出されます。
// クライアント側では呼び出されないので、
// 直接データベースクエリを実行できます。
export async function getStaticProps() {
  // posts を取得するために外部 API をコールします。
  // どんなデータ取得ライブラリでも使用できます。
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // { props: { posts } } を返すことで、Blog コンポーネントはビルド時に
  // `posts` を prop として受け取ります。
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

The [`getStaticProps` API reference](/docs/api-reference/data-fetching/get-static-props.md) covers all parameters and props that can be used with `getStaticProps`.

## サーバー側のコードを直接記述する

`getStaticProps` はサーバー側でのみ実行されるため、クライアント側では決して実行されません。ブラウザ用の JS バンドルにも含まれません。つまり、直接データベースクエリのようなコードを書いてもブラウザに送信されることはないということです。

つまり **API ルート**を `getStaticProps`（それ自身が外部ソースからデータを取得します）から取得するのではなく、`getStaticProps` に直接サーバー側のコードを記述できます。

Take the following example. An API route is used to fetch some data from a CMS. That API route is then called directly from `getStaticProps`. This produces an additional call, reducing performance. Instead, the logic for fetching the data from the CMS can be shared by using a `lib/` directory. Then it can be shared with `getStaticProps`.

```jsx
// lib/fetch-posts.js

// The following function is shared
// with getStaticProps and API routes
// from a `lib/` directory
export async function loadPosts() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts/')
  const data = await res.json()

  return data
}

// pages/blog.js
import { loadPosts } from '../lib/load-posts'

// This function runs only on the server side
export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const posts = await loadPosts()

  // Props returned will be passed to the page component
  return { props: { posts } }
}
```

Alternatively, if you are **not** using API routes to fetch data, then the [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API _can_ be used directly in `getStaticProps` to fetch data.

To verify what Next.js eliminates from the client-side bundle, you can use the [next-code-elimination tool](https://next-code-elimination.vercel.app/).

## HTML と JSON の両方を静的に生成

`getStaticProps` を持つページがビルド時にプリレンダリングされると、ページの HTML ファイルだけでなく Next.js は `getStaticProps` の結果を持つ JSON ファイルを生成します。

この JSON ファイルは、[`next/link`](/docs/api-reference/next/link.md) もしくは [`next/router`](/docs/api-reference/next/router.md) 経由のクライアント側のルーティングで使われます。`getStaticProps`　でプリレンダリングされたページに遷移すると、Next.js はこの JSON ファイル（ビルド時に事前処理）を取得してページコンポーネントの props として使います。つまり、クライアント側のページ遷移は `getStaticProps` を**呼び出さず**、エクスポートされた JSON だけが使われます。

When using Incremental Static Generation, `getStaticProps` will be executed in the background to generate the JSON needed for client-side navigation. You may see this in the form of multiple requests being made for the same page, however, this is intended and has no impact on end-user performance.

## getStaticProps をどこで使うことができるか

`getStaticProps` は **ページ** からのみエクスポートできます。ページ以外のファイルからはエクスポートできません。

この制約の理由の 1 つは、React がページレンダリングの前に必要なデータを全て持つ必要があるという点です。

Also, you must use export `getStaticProps` as a standalone function — it will **not** work if you add `getStaticProps` as a property of the page component.

## 開発中はリクエストごとに実行

開発中（`next dev`）は、`getStaticProps`はリクエストごとに呼び出されます。

## プレビューモード

[プレビューモード](/docs/advanced-features/preview-mode.md)を利用することで、一時的に静的生成を迂回してビルド時ではなく**リクエスト時**にレンダリングできます。たとえば、ヘッドレス CMS を使って公開前に下書きをプレビューするような時です。

## Related

For more information on what to do next, we recommend the following sections:

<div class="card">
  <a href="/docs/api-reference/data-fetching/get-static-props.md">
    <b>getStaticProps API Reference</b>
    <small>Read the API Reference for getStaticProps</small>
  </a>
</div>
