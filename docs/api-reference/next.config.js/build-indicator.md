---
description: 開発モードでは、新しいコードがコンパイルされているかどうかを知らせるインジケーターが表示されます。インジケーターを表示しないようにすることもできます。
---

# ビルドインジケーター

コードを編集して、Next.js がアプリケーションをコンパイルしているとき、ページの右下にコンパイル状態を示すインジケーターが表示されます。

> **備考:** このインジケーターは開発モードでのみ表示され、本番モードでアプリをビルドして実行する際には表示されません。

インジケーターの位置がチャットランチャーと被る場合など、ページ上で誤った位置に表示されることがあります。位置を変更するには、`next.config.js` ファイルを開き、 `devIndicators` オブジェクトの `buildActivityPosition` 設定を `bottom-right`（デフォルト）、 `bottom-left`、`top-right`、または `top-left` に変更します:

```js
module.exports = {
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
}
```

場合によって、インジケーターが不要となることがあります。インジケーターを無効にするには `next.config.js` ファイルを開き、 `devIndicators` プロパティの `buildActivity` 設定を無効にします:

```js
module.exports = {
  devIndicators: {
    buildActivity: false,
  },
}
```
