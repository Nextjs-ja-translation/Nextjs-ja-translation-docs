---
description: 最適化されたページには、静的に最適化されているかどうかを知らせるインジケーターが含まれています。オプトアウトの方法を見ていきましょう。
---

# Static Optimization Indicator

ページが [Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md) の対象となる場合は、インジケーターを表示してお知らせします。

Automatic Static Optimization 自体とても有益なものですし、開発中にページが適格であるかどうかをすぐに知ることができるので、これは役に立ちます。

ですが、 Electron アプリケーションで動かすときなど、インジケーターが役立たない場合があります。インジケーターを削除するためには、`next.config.js` ファイルを開き、`devIndicators` プロパティの `autoPrerender` 設定を無効にします:

```js
module.exports = {
  devIndicators: {
    autoPrerender: false
  }
};
```

## Related

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>Introduction to next.config.js:</b>
    <small>Learn more about the configuration file used by Next.js.</small>
  </a>
</div>

<div class="card">
  <a href="/docs/advanced-features/automatic-static-optimization.md">
    <b>Automatic Static Optimization:</b>
    <small>Next.js automatically optimizes your app to be static HTML whenever possible. Learn how it works here.</small>
  </a>
</div>
