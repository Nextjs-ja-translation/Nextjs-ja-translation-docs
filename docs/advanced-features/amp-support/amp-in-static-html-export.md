---
description: `next export`を使用してAMPページを作成する方法を学んでいきましょう。
---

# AMPの静的HTMLエクスポート

 `next export` でページの [静的HTMLエクスポート](/docs/advanced-features/static-html-export.md) を行う（静的にプリレンダリングする）場合、 Next.jsはページがAMPをサポートしているかどうかを検出し、それに応じて挙動を変更します。

ハイブリッドAMPページ `pages/about.js` の出力例は以下の通りです:

- `out/about.html` - クライアントサイドのReactランタイムを使用したHTMLページ
- `out/about.amp.html` - AMPページ

AMP-onlyのページ `pages/about.js` の出力例は以下の通りです:

- `out/about.html` - 最適化されたAMPページ

Next.jsは、HTMLページにAMPページへのリンクを自動的に挿入するので、以下を手動で記述する必要はありません:

```jsx
<link rel="amphtml" href="/about.amp.html" />
```

また、AMPページにHTMLページへのリンクを挿入します:

```jsx
<link rel="canonical" href="/about" />
```

[`exportTrailingSlash`](/docs/api-reference/next.config.js/exportPathMap.md#0cf7d6666b394c5d8d08a16a933e86ea) を有効にすると、 `pages/about.js` は以下のようにエクスポートされます:

- `out/about/index.html` - HTMLページ
- `out/about.amp/index.html` - AMPページ
