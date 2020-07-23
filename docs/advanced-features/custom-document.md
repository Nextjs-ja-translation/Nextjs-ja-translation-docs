---
description: Next.jsによって追加された、デフォルトのドキュメントマークアップを拡張する。
---

# カスタム `Document`

カスタム `Document` は通常、アプリケーションの `<html>` タグと `<body>` タグを拡張するために使用されます。これはドキュメント関連事項のマークアップ定義を Next.js pages が省略するために必要です。

カスタム `Document` には、非同期サーバーレンダリングのデータ要求を表現するための `getInitialProps` を含めることもできます。

デフォルトの `Document` をオーバーライドするには `./pages/_document.js` ファイルを作成し、次のように `Document` クラスを拡張します。

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

ページを適切にレンダリングするには `<Html>`, `<Head />`, `<Main />` と `<NextScript />` が必要です。

カスタム属性は `lang` のように props として許可されます。

```jsx
<Html lang="en">
```

`ctx` オブジェクトは [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md#context-object) で受け取るものと同等ですが、1 つ追加されています。

- `renderPage`: `Function` - 実際の React レンダリングロジックを（同期的に）実行するコールバックです。 Aphrodite の [`renderStatic`](https://github.com/Khan/aphrodite#server-side-rendering) のようなサーバーレンダリングラッパーをサポートするために、この関数装飾が役立ちます

## 注意事項

- `Document` はサーバーでのみレンダリングされ、`onClick` などのイベントハンドラーは機能しません
- `<Main />` の外にある React コンポーネントはブラウザによって初期化されません。ここにアプリケーションロジックを追加 _しないで_ ください。すべてのページで共有コンポーネント（メニューやツールバーなど）が必要な場合は、代わりに [`App`](/docs/advanced-features/custom-app.md) コンポーネントをご覧ください
- `Document` の `getInitialProps` 関数は、クライアント側の遷移中には呼び出されず、ページが[静的に最適化されている場合](/docs/advanced-features/automatic-static-optimization.md)にも呼び出されません
- `getInitialProps` に `ctx.req` / `ctx.res` が定義されていないかを確認してください。これらの変数は、ページが [Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md) または [`next export`](/docs/advanced-features/static-html-export.md) によって静的にエクスポートされるとき `undefined` となります
- よくある過ちは `<Head />` タグに `<title>` を追加することや、`styled-jsx` を使用することです。これらは予期しない動作につながるため `pages / _document.js` での利用は避けてください。

## `renderPage` のカスタマイズ

> `renderPage` をカスタマイズする必要があるのは、**css-in-js** ライブラリなどで、サーバーサイドレンダリングを適切に処理するために、アプリケーションをラップする時です。

カスタマイズするために、オプションオブジェクトを引数として受け取ります。

```jsx
import Document from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // react ツリー全体をラップするのに役立ちます
        enhanceApp: App => App,
        // ページ単位をラップするのに役立ちます
        enhanceComponent: Component => Component
      });

    // 親の `getInitialProps` が実行されると、カスタム `renderPage` が含まれます
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
}

export default MyDocument;
```
