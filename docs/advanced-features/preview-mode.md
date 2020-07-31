---
description: Next.js には静的に生成されたページのためのプレビューモードがあります。ここではその使い方について学びます。
---

# プレビューモード

> このドキュメントは、Next.jsバージョン9.3以上を対象としています。Next.jsの古いバージョンを使用している場合は、 [以前のドキュメント](https://nextjs.org/docs/tag/v9.2.2/basic-features/pages) を参照してください。

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress">WordPress の例</a> (<a href="https://next-blog-wordpress.now.sh">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-datocms">DatoCMS の例 </a> (<a href="https://next-blog-datocms.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-takeshape">TakeShape の例 </a> (<a href="https://next-blog-takeshape.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-sanity">Sanity の例 </a> (<a href="https://next-blog-sanity.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-prismic">Prismic の例 </a> (<a href="https://next-blog-prismic.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-contentful">Contentful の例 </a> (<a href="https://next-blog-contentful.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-strapi">Strapi の例 </a> (<a href="https://next-blog-strapi.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-agilitycms">Agility CMS の例 </a> (<a href="https://next-blog-agilitycms.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-cosmic">Cosmic の例 </a> (<a href="https://next-blog-cosmic.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-buttercms">ButterCMS の例 </a> (<a href="https://next-blog-buttercms.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-storyblok">Storyblok の例 </a> (<a href="https://next-blog-storyblok.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-graphcms">GraphCMS の例</a> (<a href="https://next-blog-graphcms.now.sh/">デモ</a>)</li>
  </ul>
</details>

[ページのドキュメント](/docs/basic-features/pages.md)と[データ取得のドキュメント](/docs/basic-features/data-fetching.md)で、`getStaticProps` と `getStaticPaths` を使って、ビルド時にページをプリレンダリングする**静的生成**について説明しました。

静的生成はヘッドレス CMS からページにデータを取得するときに役立ちます。しかし、ヘッドレス CMS で下書きをしていて、すぐにページで**プレビュー**をしたいときには理想的ではありません。Next.js がビルド時ではなく**リクエスト時**にこれらのページをレンダリングし、公開されたコンテンツではなく下書きのコンテンツを取得するようにしたいでしょう。このような特定のケースにおいて、Next.js に静的生成をして欲しくない場合があります。

Next.js にはこの問題を解決するための**プレビューモード**と呼ばれる機能があります。ここではその使い方について説明します。

## ステップ1. プレビューAPIルートを作成してアクセスする

> Next.jsのAPIルートに慣れていない場合は、まず最初に [APIルートのドキュメント](/docs/api-routes/introduction.md) を参照してください。

まず、**プレビューAPI ルート**を作成します。`pages/api/preview.js` (TypeScript を使用している場合は `.ts` )　などの任意の名前をつけることが出来ます。

この API ルートでは、レスポンスオブジェクトから `setPreviewData` を呼び出す必要があります。 `setPreviewData` の引数はオブジェクトである必要があり、 `getStatciProps` (これについては後ほど詳しく説明します)によって使用することが出来ます。ここでは　`{}` を使用します。

```js
export default (req, res) => {
  // ...
  res.setPreviewData({})
  // ...
}
```

`res.setPreviewData` はプレビューモードを実行するブラウザにいくつかの **Cookie** を設定します。これらの Cookie を含む Next.js へのリクエストは**preview mode**と判断され、静的に生成されたページの動作が変更されます(これについては後ほど詳しく説明します)。

以下のような API ルートを作成し、ブラウザから手動でアクセスすることによって、これを手動でテストすることが出来ます:

```js
// ブラウザから手動でテストするための簡単なサンプルです。
// もしこのファイルがpages/api/preview.jsに置かれているならば、
// ブラウザで、 /api/preview を開いてください。
export default (req, res) => {
  res.setPreviewData({})
  res.end('Preview mode enabled')
}
```

ブラウザのデベロッパーツールを使用すると、 `__prerender_bypass` と `__next_preview_data` という Cookie がリクエストに設定されていることに気づくでしょう。

### ヘッドレスCMSから安全にアクセスする

実際には、この API ルートをヘッドレス CMS から _安全に_ 呼び出す必要があります。具体的な手順は使用しているヘッドレス CMS によって異なりますが、ここではいくつかの共通の手順を紹介します。

これらの手順は使用しているヘッドレス CMS が**カスタムプレビューURL**の設定をサポートしていることを前提としています。そうではない場合でも、この方法を使用してプレビューURL を保護することが出来ますが、プレビューURL を手動で構築してアクセスする必要があります。


**最初に**、選択したトークンジェネレーターを使用して**シークレットトークン文字列**を作成する必要があります。このシークレットトークンは Next.js アプリとヘッドレス CMS だけが知っています。このシークレットトークンにより、CMS にアクセスできないユーザーはプレビューURL にアクセスすることが出来なくなります。

**次に**、ヘッドレス CMS がカスタムプレビューURL の設定をサポートしている場合は、プレビューURL として次のように指定します。(これはプレビューAPI ルートが `pages/api/preview.js` にあることを想定した場合です。)

```bash
https://<your-site>/api/preview?secret=<token>&slug=<path>
```

- `<your-site>` はデプロイしたドメインである必要があります。
- `<token>` は生成したシークレットトークンに置き換える必要があります。
- `<path>` はプレビューするページのパスである必要があります。 `/posts/foo` でプレビューする場合には `&slug=/posts/foo` を使用してください。

ヘッドレス CMS はプレビュー URL に変数を含めることも出来るので、これにより `&slug=/posts/{entry.fields.slug}` のように、CMS のデータに基づいて動的に `<path>` を設定できるようになります。

**最後に**、プレビューAPI ルートで以下の処理を行います:

- シークレットトークンが一致し、　`slug` パラメーターが存在することを確認してください(存在しない場合、リクエストは失敗するはずです)。
-  `res.setPreviewData` を呼び出してください.
- それから、ブラウザを `slug` で指定したパスにリダイレクトします。(次の例では[307リダイレクト](https://developer.mozilla.org/ja/docs/Web/HTTP/Status/307)を使用しています)

```js
export default async (req, res) => {
  // シークレットトークンと次のパラメーターを確認してください。
  // このシークレットトークンはAPIルートとCMSだけが知っている必要があります。
  if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // 提供された `slug` が存在しているかどうか確認するため、ヘッドレスCMSをフェッチします。
  // getPostBySlugはヘッドレスCMSへの必要なフェッチロジックを実装します。
  const post = await getPostBySlug(req.query.slug)

  // slugが存在しない場合、プレビューモードを有効にしないようにしましょう。
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

成功すると、ブラウザはプレビューモードの Cookie が設定された状態で、プレビューするパスにリダイレクトされます。

## ステップ2 `getStaticProps` を更新

次のステップはプレビューモードをサポートするように `getStaticProps` を更新することです。

 ( `res.setPreviewData` を経由して)プレビューモードの Cookie が設定されている `getStaticProps` を含むページをリクエストすると、 `getStaticProps` が(ビルド時ではなく)**リクエスト時**に呼び出されます。

さらに、次のような `context` オブジェクトを引数に getStaticProps が呼ばれます:

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

プレビューAPI ルートで `res.setPreviewData({})` を使用したため、 `context.previewData` は `{}` になります。 これを用いて、プレビューAPI ルートから `getStaticProps` に、必要であればセッション情報を渡すことが出来ます。

`getStaticPaths` も使用している場合は、 `context.params` が利用可能になります。

### プレビューデータを取得する

`context.preview` や `context.previewData` に基づいて異なるデータを取得するように `getStaticProps` を更新することが出来ます。

例えば、ヘッドレス CMS は下書き投稿のための異なる API エンドポイントを持っている場合があります。その場合、 `context.preview` を使って以下のように API エンドポイント URL を変更することが出来ます。

```js
export async function getStaticProps(context) {
  // context.previewがtrueの場合、"/preview" をAPIエンドポイントに追加します
  // 公開されたデータの代わりに下書きデータをリクエストします。
  // これは使用しているヘッドレスCMSによって異なります。
  const res = await fetch(`https://.../${context.preview ? 'preview' : ''}`)
  // ...
}
```

以上です！ヘッドレス CMS から、または手動で、( `secret` と `slug` を使用して)プレビューAPI ルートにアクセスすると、プレビューコンテンツを表示することが出来ます。また公開せずに下書きを更新すると、下書きをプレビューすることが出来るはずです。

```bash
# これをヘッドレスCMSのプレビューURLとして設定するか、手動でアクセスすることで、
# プレビューを見ることが出来るようになります。
https://<your-site>/api/preview?secret=<token>&slug=<path>
```

## もっと詳しく

### プレビューモードのCookieを削除する

デフォルトでは、プレビューモードの Cookien には有効期限が設定されていないため、ブラウザを閉じるとプレビューモードが終了します。

手動でプレビューの Cookie を削除するには、 `clearPreviewData` を呼ぶ API ルートを作成し、この API ルートにアクセスします。

```js
export default (req, res) => {
  // プレビューモードのCookieを削除します。
  // この関数は引数を受け取りません。
  res.clearPreviewData()
  // ...
}
```

### プレビューモードの期間を設定する

`setPreviewData` はオプションで 2 番目のパラメーターを指定でき、これが設定に関するオブジェクトになります。次のキーを受け取ります:

- `maxAge`: プレビューセッションの継続時間を指定します。

```js
setPreviewData(data, {
  maxAge: 60 * 60, // プレビューモードのCookieの期限が1時間になります。
})
```

### `previewData` のサイズ制限

オブジェクトを  `setPreviewData` に渡して、 `getStaticProps` で利用可能にすることが出来ます。しかし、データは Cookie に保存されるため、サイズに制限があります。現在、プレビューデータは 2KB に制限されています。

### `getServerSideProps` の動作

プレビューモードは `getServerSideProps` でも同様に機能します。 `preview` や `previewData` を含む `context` オブジェクトも利用可能です。

### `next build` ごとに単一

`next build` を実行するたびに、バイパス Cookie の値と暗号化された `previewData` の秘密鍵が変更されます。これにより、バイパス Cookie を推測出来ないようにします。

## もっと詳しく知る

次のページも役に立つでしょう。

<div class="card">
  <a href="/docs/basic-features/data-fetching.md">
    <b>データ取得:</b>
    <small>Next.jsのデータ取得について詳しく学びましょう。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/api-routes/introduction.md">
    <b>APIルート:</b>
    <small>Next.jsのAPIルートについて詳しく学びましょう。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/api-reference/next.config.js/environment-variables.md">
    <b>環境変数:</b>
    <small>Next.jsの環境変数について詳しく学びましょう。</small>
  </a>
</div>
