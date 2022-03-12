---
description: Next.jsによって追加された、デフォルトのドキュメントマークアップを拡張する。
---

# カスタム `Document`

カスタム `Document` は通常、アプリケーションの [ページ](/docs/basic-features/pages.md) がレンダリングされる `<html>` タグと `<body>` タグを拡張するために使用されます。このファイルはサーバーでのみレンダリングされます。そのため `onClick` と言ったイベントハンドラーは `document` で利用できません。

デフォルトの `Document` をオーバーライドするには `./pages/_document.js` ファイルを作成し、次のように `Document` クラスを拡張します:

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

上記のコードは Next.js により追加されるデフォルトの `Document` です。カスタム属性は props として許可されています。例えば `lang="en"` を `<html>` タグへと追加したいときには以下のようにします:

```jsx
<Html lang="en">
```

もしくは `className` を `body` タグへと追加したいときには以下のようにします:

```jsx
<body className="bg-white">
```

ページを適切にレンダリングするには `<Html>`, `<Head />`, `<Main />` と `<NextScript />` が必要です。

## 注意事項

- `_document` で使用されている `<Head />` コンポーネントは、[next/head](/docs/api-reference/next/head.md) とは異なります。ここで使われている `<Head />` コンポーネントは、すべてのページに共通する `<head>` のコードにのみ使われるべきものです。それ以外の場合、例えば `<title>` タグなどには、ページやコンポーネントで [next/head](/docs/api-reference/next/head.md) を使用することをお勧めします。
- `<Main />` の外にある React コンポーネントはブラウザによって初期化されません。ここにアプリケーションロジックやカスタムの CSS (styled-jsx など) を追加 _しないで_ ください。すべてのページで共有コンポーネント（メニューやツールバーなど）が必要な場合は、代わりに [`Layout`](/docs/basic-features/layouts.md) コンポーネントをご覧ください
- `Document` コンポーネントは現在 [getStaticProps](/docs/basic-features/data-fetching/get-static-props.md) や [getServerSideProps](y/docs/basic-features/data-fetching/get-server-side-props.md) といった [Next.js のデータ取得メソッド](/docs/basic-features/data-fetching/overview.md) をサポートしていません。

## `renderPage` のカスタマイズ

> `renderPage` をカスタマイズする必要があるのは、**css-in-js** ライブラリなどで、サーバーサイドレンダリングを適切に処理するために、アプリケーションをラップする時だけです。

[React 18](/docs/advanced-features/react-18.md) 対応のために、できる限り `getInitialProps` と `renderPage` のカスタマイズは避けることをお勧めします。

`ctx` オブジェクトは [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md#context-object) で受け取るものと同等ですが、`renderPage` を追加で受け取ります。

```jsx
import Document from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // React のレンダリングロジックを同期的に動かす
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

> **注意**:  `_document` の中の `getInitialProps` はクライエントサイドでのページ遷移時には発火されません。

## TypeScript

組み込みの `DocumentContext` 型を使用して、ファイル名を `./pages/_document.tsx` のように変更できます:

```tsx
import Document, { DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default MyDocument
```
