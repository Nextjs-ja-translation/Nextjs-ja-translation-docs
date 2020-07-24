---
description: Next.js はデフォルトで `x-powered-by` ヘッダーを追加します。ここでは、それをオプトアウトする方法を学びましょう。
---

# x-powered-by の無効化

Next.js はデフォルトで `x-powered-by` ヘッダーを追加します。これをオプトアウトするには、 `next.config.js` を開いて `poweredByHeader` という設定を無効化してください:

```js
module.exports = {
  poweredByHeader: false
};
```

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の紹介:</b>
    <small>Next.js が使用する設定ファイルについてさらに学びましょう。</small>
  </a>
</div>
