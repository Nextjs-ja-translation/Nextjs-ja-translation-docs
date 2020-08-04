---
description: 開発環境において、作成されたページを Next.js がどのように破棄し、また、メモリに保持しておくかを設定します。
---

# onDemandEntries の設定

Next.js では、開発環境において、ビルドされたページをサーバーがどのように破棄またはメモリに保持しておくかを制御するためのオプションがいくつか公開されています。

デフォルトの設定を変更するためには、`next.config.js` に `onDemandEntries` という設定項目を追加してください:

```js
module.exports = {
  onDemandEntries: {
    // サーバーがページをバッファに保持する周期（ミリ秒単位）
    maxInactiveAge: 25 * 1000,
    // 破棄されずに同時に保持されるページ数
    pagesBufferLength: 2
  }
};
```

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の紹介:</b>
    <small>Next.js で使用する設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>
