---
description: AMPページは、開発時やビルド時にNext.jsによって自動的に検証されます。 詳しく学んでいきましょう。
---

# AMPの検証

AMP ページは開発時に [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) によって自動的に検証されます。 エラーや注意事項は Next.js を起動したターミナルに表示されます。

ページは [静的 HTML のエクスポート](/docs/advanced-features/static-html-export.md) 時にも検証され、エラーや注意事項はターミナルに表示されます。有効ではない AMP のエクスポートによって、AMP のエラーが発生した場合は、ステータスコード `1` で処理を終了します。

### 検証のカスタム

以下のような `next.config.js` によって、AMP ページの検証をカスタマイズできます。

```jsx
module.exports = {
  amp: {
    validator: './custom_validator.js',
  },
}
```

### 検証のスキップ

AMP ページの検証をオフにする場合は、`next.config.js` に以下のコードを追加します。

```jsx
experimental: {
  amp: {
    skipValidation: true
  }
}
```