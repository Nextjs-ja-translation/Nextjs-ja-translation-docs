---
description: 最小限の設定で、Reactから離れることなくAMPを導入し、ページのパフォーマンスとスピードを向上させることができます。
---

# AMPのサポート

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/amp">AMP</a></li>
  </ul>
</details>

Next.jsを使えば最小限の設定で、Reactから離れることなく、どんなReactページからでもAMPページを作成できます。

詳しくは、AMPのオフィシャルサイト [amp.dev](https://amp.dev/) をご覧ください。

## AMPサポートの有効化

ページのAMPサポートを有効化する方法や、その他の詳細なAMPの設定については [ `next/amp` に関するAPIドキュメント](/docs/api-reference/next/amp.md)をお読み下さい。

## 注意事項

- CSS-in-JS のみサポートしています。 AMPページでは [CSS Modules](/docs/basic-features/built-in-css-support.md) は現在サポートされていません。 [Next.jsのCSS Modulesのサポートについて貢献できます。](https://github.com/zeit/next.js/issues/10549)

## 関連事項

次にやるべきこととして、以下のセクションを読むことをお勧めします:

<div class="card">
  <a href="/docs/advanced-features/amp-support/adding-amp-components.md">
    <b>AMPコンポーネント:</b>
    <small>AMPコンポーネントを使ってよりインタラクティブなページにする。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/advanced-features/amp-support/amp-validation.md">
    <b>AMPの検証:</b>
    <small>Next.jsがAMPページを検証する方法について学びましょう。</small>
  </a>
</div>
