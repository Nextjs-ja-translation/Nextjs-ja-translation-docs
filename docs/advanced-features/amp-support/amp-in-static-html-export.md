---
description: next export を使用してAMPページを作成する方法を学んでいきましょう。
---

# AMPの静的HTMLエクスポート

 `next export` でページの [静的HTMLエクスポート](/docs/advanced-features/static-html-export.md) を行う（静的にプリレンダリングする）場合、 Next.js はページが AMP をサポートしているかどうかを検出し、それに応じて挙動を変更します。

例えば、ハイブリッドな AMP ページ `pages/about.js` は次のようにエクスポートされます:

- `out/about.html` - クライアントサイドの React ランタイムを使用した HTML ページ
- `out/about.amp.html` - AMP ページ

また、AMP-only のページ `pages/about.js` の場合は:

- `out/about.html` - 最適化された AMP ページ

Next.js は、HTML ページに AMP ページへのリンクを自動的に挿入するので、以下を手動で記述する必要はありません:

```jsx
<link rel="amphtml" href="/about.amp.html" />
```

そして、AMP ページに HTML ページへのリンクが挿入されます:

```jsx
<link rel="canonical" href="/about" />
```

[`trailingSlash`](/docs/api-reference/next.config.js/trailingSlash.md) を有効にすると、 `pages/about.js` は以下のようにエクスポートされます:

- `out/about/index.html` - HTML ページ
- `out/about.amp/index.html` - AMP ページ
