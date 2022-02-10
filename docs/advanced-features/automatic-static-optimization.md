---
description: Next.js は可能であれば静的な HTML へとアプリケーションを自動で最適化します。どのように動作するか学んでいきましょう。
---

# Automatic Static Optimization

ページが同期的にデータを要求しないのであれば、そのページは静的（プリレンダリングが可能）であると Next.js が自動的に判断します。
この判断は `getServerSideProps` または `getInitialProps` がページに含まれていないことが根拠になります。

この機能により、**サーバーでレンダリングされたページと静的に生成されたページの両方** を含むハイブリッドなアプリケーションを提供することが可能になります。

> 静的に生成されたページは依然リアクティブです: Next.js はクライアントサイドをハイドレートしてアプリケーションに完全なインタラクティブ性を与えます。

この機能の主な利点の 1 つは、最適化されたページがサーバーサイドの処理を必要としないことです。これにより、複数の CDN サーバーからエンドユーザーへと瞬時に配信されます。その結果はユーザーの_超高速な_ローディング体験です。

## どのように動作するか

`getServerSideProps` か `getInitialProps` がページに存在すれば、Next.js はリクエストごとの要求に応じたレンダリング（[サーバーサイドレンダリング](/docs/basic-features/pages.md#server-side-rendering)）へ切り替えます。

上記のケースでなければ、 Next.js はページを静的な HTML へとプリレンダリングすることで、ページの**静的な最適化**を自動で行います。

プリレンダリング中は、この段階で使用できる `query` の情報がないため、 `query` は空オブジェクトになります。ハイドレーション後は、 `query` オブジェクト内のルートパラメータをアプリケーションに与えるように、 Next.js がアプリケーションを更新します。

> **備考:** [動的なルーティング](/docs/routing/dynamic-routes.md)と共に [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops-static-generation) を用いたページに与えられたパラメータは、いつでも `query` オブジェクト内で使用可能です。

`next build` は静的最適化がされたページに対して `.html` ファイルを出力します。例えば、 `pages/about.js` のページに対するビルド結果は以下のようになります:

```bash
.next/server/static/${BUILD_ID}/about.html
```

`getServerSideProps` をページに加えると、今度はビルド結果が以下のような JavaScript ファイルになります:

```bash
.next/server/static/${BUILD_ID}/about.js
```

## 注意事項

- `getInitialProps` を用いた[カスタム `App` ](/docs/advanced-features/custom-app.md)の場合、[静的生成](/docs/basic-features/data-fetching.md#getstaticprops-static-generation)なしのページではこの最適化はオフになります。

- `getInitialProps` を用いた[カスタム `Document` ](/docs/advanced-features/custom-document.md)の場合は、ページがサーバーサイドでレンダリングされると仮定する前に `ctx.req` が定義されているかどうかを確認してください。`ctx.req` はプリレンダリングされるページでは `undefined` になります。
