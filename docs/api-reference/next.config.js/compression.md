---
description: Next.js は、レンダリングされたコンテンツや静的ファイルを圧縮する gzip 圧縮を提供し、それは server ターゲットでのみ動作します。ここで、詳しく学びましょう。
---

# 圧縮

Next.js は、レンダリングされたコンテンツや静的ファイルを圧縮する、[**gzip**](https://tools.ietf.org/html/rfc6713#section-3) 圧縮を提供します。
圧縮は、[`server` ターゲット](/docs/api-reference/next.config.js/build-target.md#server-target)でのみ動作します。
一般的には、 `Node.js` プロセスの負荷を軽減するために、[nginx](https://www.nginx.com/) のような HTTP プロキシで圧縮を有効にするのがいいでしょう。

**圧縮**を無効にするには、 `next.config.js` の `compress` を無効にします:

```js
module.exports = {
  compress: false
};
```

## 関連事項 

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>Next.config.js の紹介:</b>
    <small>Next.js の設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>
