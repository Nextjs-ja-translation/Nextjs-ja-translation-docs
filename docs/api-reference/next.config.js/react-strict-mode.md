---
description: すべての Next.js ランタイムは、Strict モードに準拠しました。オプトインの方法を学びましょう。
---

# React Strict モード

> **推奨**: これからの React に備えて、Next.js アプリケーションで Strict モードを有効にしておくことを強くお勧めします。

Next.js ランタイムは、現在 Strict モードに準拠しています。Strict モードを有効にするには、`next.config.js` で以下のオプションを設定してください :


```js
// next.config.js
module.exports = {
  reactStrictMode: true,
}
```

あなたやチームが、アプリケーション全体で Strict モードを使用する準備ができていなくても問題ありません。 [`<React.StrictMode>` を使用](https://reactjs.org/docs/strict-mode.html)して、ページ単位で段階的に移行できます 。

React の Strict モードは、アプリケーションの潜在的な問題を明らかにするための開発専用の機能です。安全ではないライフサイクルやレガシーな API の使用、その他多くの機能を特定するのに役立ちます。

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の紹介:</b>
    <small>Next.js の設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>
