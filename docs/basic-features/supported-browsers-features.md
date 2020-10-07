---
description: Next.js がサポートしているブラウザと JavaScript の機能
---

# サポートしているブラウザと機能

Next.js は **IE11 と全てのモダンブラウザ** (Edge, Firefox, Chrome, Safari や Opera など) をサポートしており、設定は不要です。

## Polyfills

IE11 の互換性に必要な polyfills を透過的に注入しています。加えて、以下を含んだ広く使われている polyfills も注入します:

- [**fetch()**](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API) — `whatwg-fetch` と `unfetch` のリプレイス
- [**URL**](https://developer.mozilla.org/ja/docs/Web/API/URL) — [`url` package (Node.js API)](https://nodejs.org/api/url.html) のリプレイス
- [**Object.assign()**](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) — `object-assign`, `object.assign`, `core-js/object/assign` のリプレイス

これらの polyfills が依存関係に含まれている場合は、重複を避けるために本番のビルドから自動的に削除されます。

さらに Next.js では、バンドルサイズを小さくするために、これらの polyfills を必要とするブラウザに対してのみ polyfills のロードを実施します。グローバルな Web トラフィックの大部分は、これらの polyfills をダウンロードしません。

### サーバーサイド Polyfills

クライアント側での `fetch()` に加えて、Next.js は Node.js 環境でも `fetch()` の polyfills を行います。 サーバー側のコード (例えば `getStaticProps`) では、`isomorphic-unfetch` や `node-fetch` などの polyfills を使わずに `fetch()` を使用できます。

### カスタム Polyfills

独自のコードや外部の npm 依存関係で、ターゲットブラウザにてサポートされていない機能が必要な場合は、自分自身で polyfills を追加する必要があります。

この場合は、 [Custom `<App>`](/docs/advanced-features/custom-app.md) または個々のコンポーネントに必要な **特定の polyfill** のトップレベルインポートを追加する必要があります。

## JavaScript の機能

Next.js では、最新の JavaScript の機能をすぐに利用できます。 [ES6 features](https://github.com/lukehoban/es6features)に加えて、下記の機能にも対応しています:

- [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017)
- [Object Rest/Spread Properties](https://github.com/tc39/proposal-object-rest-spread) (ES2018)
- [Dynamic `import()`](https://github.com/tc39/proposal-dynamic-import) (ES2020)
- [Optional Chaining](https://github.com/tc39/proposal-optional-chaining) (ES2020)
- [Nullish Coalescing](https://github.com/tc39/proposal-nullish-coalescing) (ES2020)
- [Class Fields](https://github.com/tc39/proposal-class-fields) と [Static Properties](https://github.com/tc39/proposal-static-class-features) (stage 3 proposal の途中)
- など！

### TypeScript の機能

Next.js には TypeScript のビルトインサポートがあります。[ここで詳しく学びましょう](/docs/basic-features/typescript.md).

### Babel の設定のカスタマイズ (高度)

Babel の設定をカスタマイズできます。 [ここで詳しく学びましょう](/docs/advanced-features/customizing-babel-config.md).
