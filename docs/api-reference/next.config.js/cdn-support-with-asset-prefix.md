---
description: カスタムアセットプレフィックスを使用すると、CDN から静的コンテンツを配信できます。詳細はこちらをご覧ください。
---

# アセットプレフィックスによる CDN サポート

[CDN](https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84%E3%83%87%E3%83%AA%E3%83%90%E3%83%AA%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF)を設定するには、CDN のオリジンサーバーが Next.js がホストされているドメインを解決するように、アセットプレフィックスを設定します。

`next.config.js` を開き、 `assetPrefix` の設定を追加します:

```js
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : ''
};
```

Next.js は読み込むスクリプトの中でプレフィックスを自動的に使用しますが、 [public](/docs/basic-features/static-file-serving.md) フォルダには何の影響もありません。 コンポーネント内で動作し、環境ごとに異なるプレフィックスを導入する方法の 1 つとして、 [こちら](https://github.com/vercel/next.js/tree/canary/examples/with-universal-configuration-build-time)をご参考ください。

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
