---
description: AMPページは、開発時やビルド時にNext.jsによって自動的に検証されます。 詳しく学んでいきましょう。
---

# AMPの検証

AMP ページは開発時に [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) によって自動的に検証されます。 エラーや注意事項は Next.js を起動したターミナルに表示されます。

ページは [静的HTMLエクスポート](/docs/advanced-features/static-html-export.md) 時にも検証され、エラーや注意事項はターミナルに表示されます。エクスポートされた AMP が有効ではなく、AMP に関するエラーが起きた場合は、ステータスコード `1` で処理を終了します。
