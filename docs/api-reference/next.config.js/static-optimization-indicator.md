---
description: 最適化されたページには、静的に最適化されているかどうかを知らせるインジケーターが含まれています。オプトアウトの方法を見ていきましょう。
---

# Static Optimization Indicator

[Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md)をページができるようになった場合、私達はあなたに知らせるインジケーターを表示します。

これは役に立ちます。なぜなら、automatic static optimization はとても有益なものですし、ページがその権利を与えられた場合、開発中でもすぐに知らせてくれるのは便利だからです。

Electron アプリケーションで動かすといったような場面では、このインジケーターは役に立たない可能性があります。インジケーターを削除するためには、`next.config.js`ファイルを開き、`devIndicators`プロパティの `autoPrerender` 設定を無効にします:

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
