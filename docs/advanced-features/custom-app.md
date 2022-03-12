---
description: Next.jsが使用する標準のAppコンポーネントを上書きすることで、ページの初期化を制御し、すべてのページで存在するレイアウトを追加します。
---

# カスタム `App`

Next.js は `App` コンポーネントを使ってページの初期化を行います。App コンポーネントを上書きして、ページ初期化の制御を行えます。これによって次のようなことが実現できます:

- ページが変化する間でレイアウトを保持する
- ページ遷移時に state を保持する
- componentDidCatch を使って独自のエラーハンドリングを行う
- ページに追加の情報を注入する
- [グローバルCSSを追加する](/docs/basic-features/built-in-css-support#adding-a-global-stylesheet)

標準の `App` を上書きするには、次に示すような `./pages/_app.js` を作成します:

```jsx
// import App from 'next/app'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// もし、アプリケーション内のすべてのページでブロックするデータを必要とする場合のみ、このメソッドのコメントを外してください。
// Automatic Static Optimizationを無効にし、アプリケーション内の各ページはサーバーサイドでレンダリングされます。
//
// MyApp.getInitialProps = async (appContext) => {
//   // ページの`getInitialProps`を呼び、`appProps.pageProps`を満たします。
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
```

`Component` prop はアクティブな `page` です。なので、ルート間で遷移するたびに `Component` は新しい `page` に変化します。そのため、`Component`に渡した prop はすべてその `page` で受け取ることができます。

`pageProps`は[データ取得メソッド](/docs/basic-features/data-fetching/overview.md)の 1 つによってプリロードされた初期 props を持つオブジェクトです。そうでなければ空のオブジェクトになります。

### 注意事項

- もしアプリが起動していて、独自の `App` を追加しただけの場合は、開発サーバーを再起動する必要があります。もし、`pages/_app.js`が存在しなかったときのみ必要です。
- あなたの `App` で独自の [getInitialProps](/docs/api-reference/data-fetching/get-initial-props.md) を追加した場合、[Static Generation](/docs/basic-features/data-fetching/get-static-props.md)を行わないページで[Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md)が無効になります。
- カスタム `App` で `getInitialProps` を追加する場合、`import App from "next/app"` を行い `getInitialProps` の中で `App.getInitialProps(appContext)` を実行して返されたオブジェクトを `getInitialProps` が返すオブジェクトへとマージする必要があります。
- `App` コンポーネントは現在 [getStaticProps](/docs/basic-features/data-fetching/get-static-props.md) や [getServerSideProps](y/docs/basic-features/data-fetching/get-server-side-props.md) といった [Next.js のデータ取得メソッド](/docs/basic-features/data-fetching/overview.md) をサポートしていません。

### TypeScript

もし TypeScript を利用する場合は、[TypeScriptのドキュメント](/docs/basic-features/typescript#custom-app)をご覧ください。

## 関連事項

次にやるべきこととして、以下のセクションをお勧めします:

<div class="card">
  <a href="/docs/advanced-features/automatic-static-optimization.md">
    <b>Automatic Static Optimization:</b>
    <small>Next.jsは可能な限り静的HTMLにすることで自動でアプリケーションを最適化します。どのように動くか学んでみましょう。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/advanced-features/custom-error-page.md">
    <b>カスタムエラーページ:</b>
    <small>組み込みのエラーページについてもっと学んでみましょう。</small>
  </a>
</div>
