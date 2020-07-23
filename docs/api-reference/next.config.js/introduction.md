---
description: アプリケーションを処理するために、Next.jsが使用する設定ファイルの詳細をご覧ください。
---

# next.config.js

Next.js の高度な動作をカスタマイズするには、プロジェクトディレクトリのルートに `next.config.js` を作成します(`package.json` と同じディレクトリ)。

`next.config.js` は通常の Node.js モジュールであり JSON ファイルではありません。
Next.js サーバーとビルドフェーズで使用され、ブラウザのビルドには含まれません。

`next.config.js` の例を見てみましょう:

```js
module.exports = {
  /* ここにオプション設定を書きます */
};
```

関数も利用できます:

```js
module.exports = (phase, { defaultConfig }) => {
  return {
    /* ここにオプション設定を書きます */
  };
};
```

`phase` は設定がロードされている現在のフェーズです。
利用可能なフェーズは[こちら](https://github.com/zeit/next.js/blob/canary/packages/next/next-server/lib/constants.ts#L1-L4)を参照ください。
フェーズは `next/constants` からインポート出来ます:

```js
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* 開発フェーズでのみ利用するオプションを設定 */
    };
  }

  return {
    /* 開発フェーズを除く全てのフェーズで有効なオプションを設定 */
  };
};
```

コメントされている行は `next.config.js` で許可された設定が挿入可能な箇所です。
定義は[こちら](https://github.com/zeit/next.js/blob/canary/packages/next/next-server/server/config.ts#L12-L63)をご覧ください。

ただし、いずれの設定も必要でなく、全ての設定を完全に理解する必要はありません。
有効化または修正する必要がある設定のみ調べて変更するようにお勧めします。

> 利用する Node.js のバージョンでは利用出来ない JavaScript の機能を使用しないようにしましょう。 `next.config.js` は Webpack、Babel、TypeScriptで解析されません。
