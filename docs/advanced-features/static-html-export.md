---
description: Next.jsアプリを静的なHTMLにエクスポートして、Node.jsサーバーを必要とせずともスタンドアロンで実行することができます。
---
# 静的HTMLのエクスポート

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-static-export">静的エクスポート</a></li>
  </ul>
</details>

`next export` では、Next.js アプリを静的な HTML にエクスポートできて、Node.js サーバを必要とせずともスタンドアロンで実行できます。It is recommended to only use `next export` if you don't need any of the [unsupported features](#unsupported-features) requiring a server.

If you're looking to build a hybrid site where only _some_ pages are prerendered to static HTML, Next.js already does that automatically. Learn more about [Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md) and [Incremental Static Regeneration](/docs/basic-features/data-fetching/incremental-static-regeneration.md).

## `next export`

Update your build script in `package.json` to use `next export`:

```json
"scripts": {
  "build": "next build && next export"
}
```

Running `npm run build` will generate an `out` directory.

<!-- textlint-disable -->
`next export` builds an HTML version of your app. During `next build`, [`getStaticProps`](/docs/basic-features/data-fetching/get-static-props.md) and [`getStaticPaths`](/docs/basic-features/data-fetching/get-static-paths.md) will generate an HTML file for each page in your `pages` directory (or more for [dynamic routes](/docs/routing/dynamic-routes.md). Then, `next export` will copy the already exported files into the correct directory. `getInitialProps` will generate the HTML files during `next export` instead of `next build`.

より高度なシナリオでは、[`exportPathMap`](/docs/api-reference/next.config.js/exportPathMap.md) というパラメータを [`next.config.js`](/docs/api-reference/next.config.js/introduction.md) ファイルに定義して、どのページが生成されるかを正確に設定できます。

## Supported Features

The majority of core Next.js features needed to build a static site are supported, including:

- [Dynamic Routes when using `getStaticPaths`](/docs/routing/dynamic-routes.md)
- Prefetching with `next/link`
- Preloading JavaScript
- [Dynamic Imports](/docs/advanced-features/dynamic-import.md)
- Any styling options (e.g. CSS Modules, styled-jsx)
- [Client-side data fetching](/docs/basic-features/data-fetching/client-side.md)
- [`getStaticProps`](/docs/basic-features/data-fetching/get-static-props.md)
- [`getStaticPaths`](/docs/basic-features/data-fetching/get-static-paths.md)
- [Image Optimization](/docs/basic-features/image-optimization.md) using a [custom loader](/docs/basic-features/image-optimization.md#loader)

## Unsupported Features

Features that require a Node.js server, or dynamic logic that cannot be computed during the build process, are not supported:

- [Image Optimization](/docs/basic-features/image-optimization.md) (default loader)
- [Internationalized Routing](/docs/basic-features/data-fetching/incremental-static-regeneration.md))
- [API Routes](/docs/api-routes/introduction.md)
- [Rewrites](/docs/api-reference/next.config.js/rewrites.md)
- [Redirects](/docs/api-reference/next.config.js/redirects.md)
- [Headers](/docs/api-reference/next.config.js/headers.md)
- [Middleware](/docs/middleware.md)
- [Incremental Static Regeneration](/docs/basic-features/data-fetching.md#incremental-static-regeneration)
- [`fallback: true`](/docs/api-reference/data-fetching/get-static-paths.md#fallback-true)
- [`getServerSideProps`](/docs/basic-features/data-fetching/get-server-side-props.md)

### `getInitialProps`

It's possible to use the [`getInitialProps`](/docs/api-reference/data-fetching/get-initial-props.md) API instead of `getStaticProps`, but it comes with a few caveats:

- `getInitialProps` は、任意のページで `getStaticProps` や `getStaticPaths` と一緒に使うことはできません。動的ルーティングがある場合は、`getStaticPaths` を使用する代わりに、[`next.config.js`](/docs/api-reference/next.config.js/introduction.md) ファイルの [`exportPathMap`](/docs/api-reference/next.config.js/exportPathMap.md) パラメータを設定して、出力すべき HTML ファイルをエクスポータに知らせる必要があります。
- エクスポート中に `getInitialProps` が呼び出された場合、エクスポート中はサーバが動作していないため、[`context`](/docs/api-reference/data-fetching/get-initial-props.md#context-object) パラメータの `req` と `res` フィールドは空のオブジェクトになります。
- `getInitialProps` **はすべてのクライアント側のナビゲーションに対して呼び出されるので**、もしビルド時のみデータを取得したい場合は `getStaticProps` に切り替えてください。
- `getInitialProps` は `getStaticProps` のように Node.js 固有のライブラリやファイルシステムを利用できません。`getInitialProps` は API から取得しなければなりません。

We recommend migrating towards `getStaticProps` over `getInitialProps` whenever possible.
