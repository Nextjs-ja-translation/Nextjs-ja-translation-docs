---
description: Next.jsは可能であれば静的なHTMLへとアプリケーションを自動で最適化します。どのように動作するか学んでいきましょう。
---

# Automatic Static Optimization

ページがノンブロッキングなデータを必要としなければ、Next.jsはそのページが静的（プリレンダリングが可能）であると自動的に判断します。
この判断は`getServerSideProps`と`getInitialProps`がページに含まれていないことが根拠になります。

この機能により、**サーバーでレンダリングされたページと静的に生成されたページの両方**を含むハイブリッドなアプリケーションを提供することが可能になります。

> 静的に生成されたページは依然リアクティブです: Next.jsはクライアントサイドをハイドレートしてアプリケーションに完全なインタラクティブ性を与えます。

この機能の主な利点の1つは、最適化されたページがサーバーサイドの処理を必要としないことです。これにより、複数のCDNサーバーからエンドユーザーへと瞬時に配信されます。その結果はユーザーの_超高速な_ローディング体験です。

## どのように動作するか

`getServerSideProps`か`getInitialProps`がページに存在すれば、Next.jsはリクエストごとの要求に応じたレンダリング（[サーバーサイドレンダリング](/docs/basic-features/pages.md#server-side-rendering)）へと切り替えます。

上記のケースでなければ、Next.jsはページを静的なHTMLへとプリレンダリングすることで、ページの**静的な最適化**を自動で行います。

プリレンダリング中は、この段階で使用できる`query`の情報がないため、`query`は空オブジェクトになります。ハイドレーション後は、`query`オブジェクト内のルートパラメータをアプリケーションに与えるように、Next.jsがアプリケーションを更新します。

> **備考:** [動的なルーティング](/docs/routing/dynamic-routes.md)と共に[`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops-static-generation)を用いたページに与えられたパラメータは、いつでも`query`オブジェクト内で使用可能です。

`next build`は静的最適化がされたページに対して`.html`ファイルを出力します。例えば、`pages/about.js`のページに対するビルド結果は以下のようになります:

```bash
.next/server/static/${BUILD_ID}/about.html
```

`getServerSideProps`をページに加えると、今度はビルド結果が以下のようなJavaScriptファイルになります:

```bash
.next/server/static/${BUILD_ID}/about.js
```

開発中は`pages/about.js`が最適化されているかどうかを内部の[静的最適化インディケーター](/docs/api-reference/next.config.js/static-optimization-indicator.md)によって知ることができます。

## 警告

- `getInitialProps`を用いた[カスタム`App`](/docs/advanced-features/custom-app.md)の場合は、[静的生成](/docs/basic-features/data-fetching.md#getstaticprops-static-generation)なしのページではこの最適化はオフになります。

- `getInitialProps`を用いた[カスタム`Document`](/docs/advanced-features/custom-document.md)の場合は、ページがサーバーサイドでレンダリングされると仮定する前に`ctx.req`が定義されているかどうかを確認してください。`ctx.req`はプリレンダリングされるページでは`undefined`になります。
