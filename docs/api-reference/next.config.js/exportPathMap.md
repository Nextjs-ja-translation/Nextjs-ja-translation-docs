---
description: `next export` を使うとき、HTMLファイルとしてエクスポートされるページのカスタマイズをします。
---

# exportPathMap

> この機能は `next export` に固有のものです。もし `next export` について詳しく学びたい場合は[静的HTMLのエクスポート](/docs/advanced-features/static-html-export.md)を参照してください。

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-static-export">静的エクスポート</a></li>
  </ul>
</details>

`exportPathMap` によってエクスポート時に利用される HTTP リクエストのパスとページの宛先をマッピングを指定できます。 `exportPathMap` で定められたパスは [`next dev`](/docs/api-reference/cli.md#development)　を利用する際にも利用可能です。

以下のページを含むアプリのカスタム `exportPathMap` を作る例から始めましょう:

- `pages/index.js`
- `pages/about.js`
- `pages/post.js`

`next.config.js` を開いて、以下の `exportPathMap` 設定を追加します:

```js
module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
      '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
      '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    }
  },
}
```

注意: `exportPathMap` の `query` フィールドは [自動的かつ静的に最適化されたページ](/docs/advanced-features/automatic-static-optimization) や [`getStaticProps` を伴うページ](/docs/basic-features/data-fetching/get-static-props.md) では利用できません。これらのページはビルド時に HTML ファイルとしてレンダリングされて、`next export`　の時には追加のクエリーの情報をページに提供できないためです。

ページは HTML ファイルとしてエクスポートされ、例えば、 `/about` は `/about.html` になります。

`exportPathMap` は 2 つの引数を受け取る `async` 関数(非同期関数)です: 第 1 引数は `defaultPathMap` で、これは Next.js で使うデフォルトマップです。第 2 引数は以下のプロパティを持つオブジェクトです:

- `dev` - 開発中に `exportPathMap` が呼ばれているとき `true` になります。`next export` 実行中のとき `false` になります。開発時 `exportPathMap` はルートの定義に利用されます。
- `dir` - プロジェクトディレクトリへの絶対パス
- `outDir` - `out/` ディレクトリへの絶対パス ( [`-o` で設定可能]((#customizing-the-output-directory)))。`dev` が `true` のとき、 `outDir` の値は `null` になります。
- `distDir` - `.next/` ディレクトリへの絶対パス ([`distDir`](/docs/api-reference/next.config.js/setting-a-custom-build-directory.md)設定で設定可能)
- `buildId` - ビルド ID を生成します

返り値となるオブジェクトは、 `key` が `pathname` で `value` が以下のフィールドを受け入れるオブジェクトのページのマップです:

- `page`: `String` - 描画する `pages` ディレクトリ内のページ
- `query`: `Object` - プリレンダリングするとき `getInitialProps` に `query` オブジェクトを渡します。デフォルトは `{}` です。

> エクスポートされた `pathname` はファイル名にすることもできます (例：`/readme.md`)。しかし、それが `.html` と異なる場合、コンテンツを提供するとき、おそらく `Content-Type` ヘッダーを `text/html` にセットする必要があります。

## 末尾にスラッシュを追加する

`index.html` ファイルとしてページをエクスポートするために Next.js を設定できます。末尾にスラッシュを要求し、 `/about` が `/about/index.html` になることで、 `/about/` を経由してルーティング可能になります。これは Next.js 9 より前のデフォルトの動作でした。

末尾にスラッシュを追加するように切り替えるには、 `next.config.js` を開いて、 `trailingSlash` 設定を有効にします:

```js
module.exports = {
  trailingSlash: true
};
```

## 出力するディレクトリをカスタマイズする

[`next export`](/docs/advanced-features/static-html-export.md#how-to-use-it) はデフォルトの出力先ディレクトリとして `out` を使います。`-o` 引数を使って、このようにカスタマイズできます:

```bash
next export -o outdir
```

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の紹介</b>
    <small>Next.js で使用する設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/advanced-features/static-html-export.md">
    <b>静的HTMLのエクスポート</b>
    <small>Next.js のアプリケーションを静的なHTMLにエクスポートする。</small>
  </a>
</div>
