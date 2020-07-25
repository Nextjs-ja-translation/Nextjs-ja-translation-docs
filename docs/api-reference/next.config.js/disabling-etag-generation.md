---
description: Next.js はデフォルトですべてのページの ETag を生成します。ここでは、 ETag の生成を無効化する方法を学びます。
---

# ETag 生成の無効化

Next.js はデフォルトですべてのページの [ETag](https://ja.wikipedia.org/wiki/HTTP_ETag) を生成します。キャッシュ戦略によっては、HTML ページの ETag 生成を無効化した方が良い場合があります。

`next.config.js` の `generateEtags` オプションを無効化します:

```js
module.exports = {
  generateEtags: false
};
```

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の紹介:</b>
    <small>Next.js の設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>
