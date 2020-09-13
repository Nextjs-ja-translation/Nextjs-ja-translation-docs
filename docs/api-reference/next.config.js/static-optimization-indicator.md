---
description: 最適化されたページには、静的に最適化されているかどうかを知らせるインジケーターが含まれています。また、こちらでオプトアウトすることができます。
---

# 静的最適化インジケータ

ページが [Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md) の対象となる場合は、インジケーターを表示してお知らせします。

Automatic Static Optimization 自体とても有益なものですし、ページが Automatic Static Optimization の対象であるか開発時にすぐ分かるので、これは役に立ちます。

しかし、 Electron アプリケーションで動かすときなど、インジケーターは役に立たない場合があります。インジケーターを削除するためには、`next.config.js` ファイルを開き、`devIndicators` プロパティの `autoPrerender` 設定を無効にします:

```js
module.exports = {
  devIndicators: {
    autoPrerender: false
  }
};
```

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の紹介</b>
    <small>Next.js で使用する設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>
<div class="card">
  <a href="/docs/advanced-features/automatic-static-optimization.md">
    <b>Automatic Static Optimization:</b>
    <small>Next.jsは可能な限り静的HTMLにすることで自動でアプリケーションを最適化します。どのように動くか学んでみましょう。</small>
  </a>
</div>
