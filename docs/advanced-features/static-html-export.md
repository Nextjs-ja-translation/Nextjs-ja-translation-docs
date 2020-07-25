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

`next export` では、アプリを静的な HTML にエクスポートできて、Node.js サーバを必要とせずともスタンドアロンで実行できます。

エクスポートされたアプリは、動的ルーティング、プリフェッチ、プリロード、動的インポートなど、Next.js のほぼすべての機能をサポートしています。

`next export` は、すべてのページを HTML にプレレンダリングすることで動作します。[動的ルーティング](/docs/routing/dynamic-routes.md)の場合、ページはそのルーティング用に生成する HTML ページをエクスポータに知らせる [ `getStaticPaths` ](/docs/basic-features/data-fetching.md#getstaticpaths-static-generation) 関数をエクスポートできます。

> `next export` は、サーバサイドやインクリメンタルデータを**必要としない**ページのシナリオを想定しています（ただし、静的にレンダリングされたページは[クライアントサイドでデータを取得する](/docs/basic-features/data-fetching.md#fetching-data-on-the-client-side)ことができます）。
>
> _一部の_ ページのみを静的 HTML にプリレンダするハイブリッドサイトを作りたい場合、Next.js はすでに自動で静的最適化を行っています。詳しくは[Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md)をお読みください。
>
> `next export`では、`next start` またはサーバーレスデプロイが機能するために必要な、インクリメンタル静的ジェネレートやリジェネレーションのような機能も無効になります。

## 使い方

Next.js を使って通常通りにアプリを開発します。その後、次のコマンドを実行します:

```bash
next build && next export
```

`package.json` の scripts を以下のように更新するとよいでしょう:

```json
"scripts": {
  "build": "next build && next export"
}
```

次のコマンドで実行できます:

```bash
npm run build
```

そうすると、`out` ディレクトリに静的バージョンのアプリが作成されます。

デフォルトでは `next export` の設定は必要ありません。`pages` ディレクトリ内のページごとに静的な HTML ファイルが出力されます([動的ルーティング](/docs/routing/dynamic-routes.md)の場合は、`getStaticPaths` を呼び出し、結果に基づいてページを生成します)。
より高度なシナリオでは、[`exportPathMap`](/docs/api-reference/next.config.js/exportPathMap.md) というパラメータを [`next.config.js`](/docs/api-reference/next.config.js/introduction.md) ファイルに定義して、どのページが生成されるかを正確に設定できます。

## デプロイ

Next.js のアプリケーションをデプロイするには[デプロイのセクション](/docs/deployment.md)を参照してください。

## 注意事項

- `next export` では、アプリの HTML 版を作成します。エクスポート時には、エクスポートしたページごとに [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops-static-generation) を呼び出し、その結果をそのページのコンポーネントに渡します。また、`getStaticProps` の代わりに古い [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md) API の使用は可能ですが、いくつかの注意事項があります:

  - `getInitialProps` は、任意のページで `getStaticProps` や `getStaticPaths` と一緒に使うことはできません。動的ルーティングがある場合は、`getStaticPaths` を使用する代わりに、[`next.config.js`](/docs/api-reference/next.config.js/introduction.md) ファイルの [`exportPathMap`](/docs/api-reference/next.config.js/exportPathMap.md) パラメータを設定して、出力すべき HTML ファイルをエクスポータに知らせる必要があります。
  - エクスポート中に `getInitialProps` が呼び出された場合、エクスポート中はサーバが動作していないため、[`context`](/docs/api-reference/data-fetching/getInitialProps.md#context-object) パラメータの `req` と `res` フィールドは空のオブジェクトになります。
  - `getInitialProps` **はすべてのクライアント側のナビゲーションに対して呼び出されるので**、もしビルド時のみデータを取得したい場合は `getStaticProps` に切り替えてください。
  - `getInitialProps` は `getStaticProps` のように Node.js 固有のライブラリやファイルシステムを利用できません。`getInitialProps` は API から取得しなければなりません。

  静的なエクスポートでは、`getInitialProps` よりも `getStaticProps` API の方が常に優先されます: 可能であれば、`getStaticProps` を使用してページを変換することをお勧めします。

- `next export`を使っているときは、`getStaticPaths` の `fallback: true` モードはサポートされていません。
- HTML ファイルは事前にビルドされているため、静的エクスポート時に HTML を動的にレンダリングできません。`next export` を使用しない場合、アプリケーションは[静的生成](/docs/basic-features/pages.md#static-generation)と[サーバーサイドレンダリング](/docs/basic-features/pages.md#server-side-rendering)の混合になる可能性があります。[ページのセクション](/docs/basic-features/pages.md)で詳しく説明しています。

- [API ルーティング](/docs/api-routes/introduction.md) は HTML にプリレンダリングできないため、このメソッドではサポートされていません。
- [`getServerSideProps`](/docs/basic-features/data-fetching.md#getserversideprops-server-side-rendering) はサーバーを必要とするメソッドのため、ページ内では使用できません。代わりに [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops-static-generation) を使用することを検討してください。
