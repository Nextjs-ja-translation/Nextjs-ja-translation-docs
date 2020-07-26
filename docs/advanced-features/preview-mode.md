---
解説: Next.jsは静的に生成されたページのためのプレビューモードがあります。ここではその使い方について学びます。
---

# プレビューモード

> このドキュメントは、Next.jsバージョン9.3以上を対象としています。Next.jsの古いバージョンを使用している場合は、 [以前のドキュメント](https://nextjs.org/docs/tag/v9.2.2/basic-features/pages) を参照してください。

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress">WordPressの例</a> (<a href="https://next-blog-wordpress.now.sh">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-datocms">DatoCMSの例 </a> (<a href="https://next-blog-datocms.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-takeshape">TakeShapeの例 </a> (<a href="https://next-blog-takeshape.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-sanity">Sanityの例 </a> (<a href="https://next-blog-sanity.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-prismic">Prismicの例 </a> (<a href="https://next-blog-prismic.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-contentful">Contentfulの例 </a> (<a href="https://next-blog-contentful.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-strapi">Strapiの例 </a> (<a href="https://next-blog-strapi.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-agilitycms">Agility CMSの例 </a> (<a href="https://next-blog-agilitycms.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-cosmic">Cosmicの例 </a> (<a href="https://next-blog-cosmic.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-buttercms">ButterCMSの例 </a> (<a href="https://next-blog-buttercms.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-storyblok">Storyblokの例 </a> (<a href="https://next-blog-storyblok.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-graphcms">GraphCMS Example</a> (<a href="https://next-blog-graphcms.now.sh/">デモ</a>)</li>
  </ul>
</details>

[ページドキュメント](/docs/basic-features/pages.md)と[データ取得ドキュメント](/docs/basic-features/data-fetching.md)で、 `getStaticProps` と `getStaticPaths`を使って、ビルド時にページを事前レンダリングをする(**静的生成**)について説明しました。

静的生成はヘッドレスCMSからページにデータを取得するときに役立ちます。しかし、ヘッドレスCMSで下書きをしていて、すぐにページで**プレビュー**をしたいとき理想的ではありません。Next.jsではビルド時ではなく**リクエスト時**にこれらのページをレンダリングし、公開されたコンテンツではなく下書きのコンテンツを取得します。この特定の場合のみ、Next.jsでは静的生成をバイパスする必要があります。

Next.jsはこの問題を解決するための**プレビューモード**と呼ばれる機能があります。ここではその使い方について説明します。

## ステップ1. プレビューAPIルートを作成してアクセスする

> Next.jsのAPIルートに慣れていない場合は、まず最初に [APIルートドキュメント](/docs/api-routes/introduction.md) を参照してください。

まず**プレビューAPIルート**を作成します。`pages/api/preview.js` (TypeScriptを使用している場合は `.ts` )　などの任意の名前をつけることが出来ます。

このAPIルートでは、レスポンスオブジェクトである `setPreviewData` を呼び出す必要があります。 `setPreviewData` の引数はオブジェクトである必要があり、 `getStatciProps` (これについては後ほど詳しく説明します)によって使用することが出来ます。ここでは　`{}` を使用します。

```js
export default (req, res) => {
  // ...
  res.setPreviewData({})
  // ...
}
```

.　`res.setPreviewData` はプレビューモードを実行するブラウザにいくつかの**Cookie**を設定します。これらのCookieを含むNext.jsへのリクエストは**preview mode**と判断され、静的に生成されたページの動作へと変更されます(これについては後ほど詳しく説明します)。

以下のようなAPIルートを作成しブラウザから手動でアクセスすることによって、これを手動でテストすることが出来ます。

```js
// ブラウザから手動でテストするための簡単なサンプル
// pages/api/preview.jsにこれを配置し、
// ブラウザで、 /api/preview を開いてください.
export default (req, res) => {
  res.setPreviewData({})
  res.end('Preview mode enabled')
}
```

ブラウザのデベロッパーツールを使用すると、 `__prerender_bypass` と `__next_preview_data` というCookieがリクエストに設定されていることに気づくでしょう。

### ヘッドレスCMSから安全にアクセスする

実際には、このAPIルートをヘッドレスCMSから _安全に_ 呼び出す必要があります。具体的な手順は使用しているヘッドレスCMSによって異なりますが、ここでは実行できるいくつかの共通の手順を紹介します。

これらの手順は使用しているヘッドレスCMSが**カスタムプレビューURL**の設定をサポートしていることを前提としています。そうではない場合でも、この方法を使用してプレビューURLを保護することが出来ますが、プレビューURLを手動で構築してアクセスする必要があります。


**最初に**、選択したトークンジェネレーターを使用して**シークレットトークン文字列**を作成する必要があります。このシークレットトークンはNext.jsアプリとヘッドレスCMSだけが知っています、このシークレットトークンにより、CMSにアクセスできないユーザーはプレビューURLにアクセスすることが出来なくなります。

**次に**、ヘッドレスCMSがカスタムプレビューURLの設定をサポートしている場合は、プレビューURLとして次のように指定します。(これはプレビューAPIルートが `pages/api/preview.js` にあることを前提としています。)

```bash
https://<your-site>/api/preview?secret=<token>&slug=<path>
```

- `<your-site>` デプロイしたドメインである必要があります。
- `<token>` 生成したシークレットトークンに置き換える必要があります。
- `<path>` プレビューするページのパスである必要があります。 `/posts/foo` でプレビューする場合には `&slug=/posts/foo` を使用してください。

ヘッドレスCMSは　`<path>` に `&slug=/posts/{entry.fields.slug}` のようにCMSのデータに基づいて動的に設定することによって、プレビューURLに変数を含めることが出来ます。

**最後に**、プレビューAPIルートで:

- シークレットトークンが一致し、　`slug` パラメーターが存在することを確認してください(存在しない場合、リクエストは失敗するはずです)。
-  `res.setPreviewData` を呼び出してください.
- それから、ブラウザを `slug` で指定したパスにリダイレクトします。(次の例では[307リダイレクト](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307)を使用しています)

```js
export default async (req, res) => {
  // シークレットトークンと次のパラメーターを確認してください。
  // このシークレットトークンはAPIルートとCMSだけが知っている必要があります。
  if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // 提供された `slug` が存在しているかどうか確認し、ヘッドレスCMSをフェッチします。
  // getPostBySlugは必要なフェッチロジックをヘッドレスCMSに実装します。
  const post = await getPostBySlug(req.query.slug)

  // slugが存在しない場合、プレビューモードを有効にすることは出来ません。
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Cookiesを設定し、プレビューモードを有効にします。
  res.setPreviewData({})

  // フェッチされた投稿にパスをリダイレクトします。
  // オープンリダイレクトの脆弱性につながる可能性があるため、req.query.slugにリダイレクトしません。
  res.redirect(post.slug)
}
```

成功すると、ブラウザはプレビューモードのCookieが設定された状態で、プレビューするパスにリダイレクトされます。

## ステップ2 `getStaticProps` に更新

次のステップはプレビューモードを `getStaticProps` をサポートするように更新することです。

 ( `res.setPreviewData` を経由して)プレビューモードのCookieが設定されている `getStaticProps` で生成したページをリクエストすると、 `getStaticProps` が(ビルド時ではなく)**リクエスト時**に呼び出されます。

さらに、次のように `context` オブジェクトが呼び出されます。

- `context.preview` は `true` になります。
- `context.previewData` は `setPreviewData` で使用されている引数と同じになります。

```js
export async function getStaticProps(context) {
  // Cookieが設定されたプレビューモードのページをリクエストした場合:
  //
  // - context.previewはtrueになります。
  // - context.previewDataはsetPreviewDataで使用されている引数と同じになります。
}
```

プレビューAPIルートで `res.setPreviewData({})` を使用したため、 `context.previewData` は `{}` になります。 プレビューAPIルートから `getStaticProps` にセッション情報を渡し、必要に応じてこれを使用することが出来ます。

`getStaticPaths` も使用している場合は、 `context.params` が利用可能になります。

### プレビューデータを取得する

`context.preview` 及び/または `context.previewData` に基づいて異なるデータを取得するように `getStaticProps` を更新することが出来ます。

例えば、ヘッドレスCMSは下書き投稿のための異なるAPIエンドポイントを持っている場合があります。その場合、 `context.preview` を使って以下のようにAPIエンドポイントURLを変更することが出来ます。

```js
export async function getStaticProps(context) {
  // context.previewがtrueの場合、"/preview" をAPIエンドポイントに追加します
  // 公開されたデータの代わりに下書きデータをリクエストします。
  // これは使用しているヘッドレスCMSによって異なります。
  const res = await fetch(`https://.../${context.preview ? 'preview' : ''}`)
  // ...
}
```

それでおしまいです。ヘッドレスCMSからまたは手動で、( `secret` と `slug` を使用して)プレビューAPIルートにアクセスすると、プレビューコンテンツを表示することが出来ます。また公開せずに下書きを更新すると、下書きをプレビューすることが出来るようになります。

```bash
# これをヘッドレスCMSのプレビューURLとして設定するか、手動でアクセスします。
# そしてプレビューを見ることが出来るようになります。
https://<your-site>/api/preview?secret=<token>&slug=<path>
```

## もっと詳しく

### プレビューモードのCookieをクリアする

デフォルトでは、プレビューモードのCookienには有効期限が設定されていないため、ブラウザを閉じるとプレビューモードが終了します。

手動でプレビューのCookieを削除するには、 `clearPreviewData` を呼ぶAPIルートを作成し、このAPIルートにアクセスします。

```js
export default (req, res) => {
  // プレビューモードのCookieを削除する
  // この関数は引数を受け取りません。
  res.clearPreviewData()
  // ...
}
```

### プレビューモードの期間を設定する

`setPreviewData` はオプションオブジェクトであるオプションの2番目のパラメーターを受け取ります。次のキーを受け取ります。

- `maxAge`: プレビューセッションの継続時間を指定します。

```js
setPreviewData(data, {
  maxAge: 60 * 60, // プレビューモードのCookieの期限が1時間になります。
})
```

### `previewData` のサイズ制限

`setPreviewData` をオブジェクトに渡して、 `getStaticProps` で利用可能にすることが出来ます。しかし、データはCookieに保存されるため、サイズに制限があります。現在、プレビューデータは2KBに制限されています。

### `getServerSideProps` の動作。

プレビューモードは `getServerSideProps` でも同様に機能します。 `preview` や `previewData` を含む `context` オブジェクトも利用可能です。

### `next build` ごとにユニーク

This ensures that the bypass cookie can’t be guessed. `next build` を実行するたびに、バイパスCookieの値と暗号化された `previewData` の秘密鍵が変更されます。これにより、バイパスCookieを推測出来ないようにします。

## もっと詳しく知る

次のページも役に立つでしょう。

<div class="card">
  <a href="/docs/basic-features/data-fetching.md">
    <b>データ取得:</b>
    <small>Next.jsのデータ取得について学ぶ。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/api-routes/introduction.md">
    <b>APIルート:</b>
    <small>Next.jsのAPIルートについて学ぶ。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/api-reference/next.config.js/environment-variables.md">
    <b>環境変数:</b>
    <small>Next.jsの環境変数について学ぶ。</small>
  </a>
</div>
