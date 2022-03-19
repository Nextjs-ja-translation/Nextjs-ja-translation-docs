---
description: カスタムアセットプレフィックスを使用すると、CDN から静的コンテンツを配信できます。詳細はこちらをご覧ください。
---

# アセットプレフィックスによる CDN サポート

> **Attention**: [Deploying to Vercel](/docs/deployment.md) automatically configures a global CDN for your Next.js project.
> You do not need to manually setup an Asset Prefix.

> **Note**: Next.js 9.5+ added support for a customizable [Base Path](/docs/api-reference/next.config.js/basepath.md), which is better
> suited for hosting your application on a sub-path like `/docs`.
> We do not suggest you use a custom Asset Prefix for this use case.

[CDN](https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84%E3%83%87%E3%83%AA%E3%83%90%E3%83%AA%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF)を設定するには、CDN のオリジンサーバーが Next.js がホストされているドメインを解決するように、アセットプレフィックスを設定します。

`next.config.js` を開き、 `assetPrefix` の設定を追加します:

```js
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : ''
};
```

Next.js will automatically use your asset prefix for the JavaScript and CSS files it loads from the `/_next/` path (`.next/static/` folder). For example, with the above configuration, the following request for a JS chunk:

```
/_next/static/chunks/4b9b41aaa062cbbfeff4add70f256968c51ece5d.4d708494b3aed70c04f0.js
```

Would instead become:

```
https://cdn.mydomain.com/_next/static/chunks/4b9b41aaa062cbbfeff4add70f256968c51ece5d.4d708494b3aed70c04f0.js
```

The exact configuration for uploading your files to a given CDN will depend on your CDN of choice. The only folder you need to host on your CDN is the contents of `.next/static/`, which should be uploaded as `_next/static/` as the above URL request indicates. **Do not upload the rest of your `.next/` folder**, as you should not expose your server code and other configuration to the public.

While `assetPrefix` covers requests to `_next/static`, it does not influence the following paths:

- Files in the [public](/docs/basic-features/static-file-serving.md) folder; if you want to serve those assets over a CDN, you'll have to introduce the prefix yourself
- `/_next/data/` requests for `getServerSideProps` pages. These requests will always be made against the main domain since they're not static.
- `/_next/data/` requests for `getStaticProps` pages. These requests will always be made against the main domain to support [Incremental Static Generation](/docs/basic-features/data-fetching/incremental-static-regeneration.md), even if you're not using it (for consistency).

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.jsの紹介:</b>
    <small>Next.jsの設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/basic-features/static-file-serving.md">
    <b>静的ファイルの保存:</b>
    <small>publicディレクトリに画像などの静的ファイルを保存します。</small>
  </a>
</div>
