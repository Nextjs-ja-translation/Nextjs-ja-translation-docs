---
description: ページディレクトリ内のページを解決する際にNext.jsが使用するデフォルトのページ拡張機能を拡張します。
---

# カスタムページ拡張機能

`.mdx` で終わるページのサポートを追加した [@next/mdx](https://github.com/zeit/next.js/tree/canary/packages/next-mdx) のようなモジュールを対象としています。ページを解決する際に `pages` ディレクトリで探す拡張子を設定できます。

`next.config.js` を開き、 `pageExtensions` の設定を追加します:

```js
module.exports = {
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx']
};
```

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.jsの紹介:</b>
    <small>Next.jsが使用する設定ファイルについて学ぶ。</small>
  </a>
</div>
