---
description: ページディレクトリ内のページを読み込む際にNext.jsが使用する、ページ標準の拡張子をカスタマイズします。
---

# 独自のページ拡張子

`.mdx` で終わるページのサポートを追加した [@next/mdx](https://github.com/vercel/next.js/tree/canary/packages/next-mdx) のようなモジュールを対象としています。ページを解決する際に `pages` ディレクトリで探す拡張子を設定できます。

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
    <small>Next.jsが使用する設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>
