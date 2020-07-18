---
description: Next.js は、グローバル CSS もしくは CSS Modules の読み込みや、 CSS-in-JS としての `styled-jsx` の利用、あるいは他のいかなる CSS-in-JS もサポートしています！実際に見ていきましょう。
---

# CSS のビルトインサポート

Next.js では、 JavaScript ファイルから CSS をインポートできます。  
これは、 Next.js が JavaScript の範囲を越えて [`import`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import) の概念を拡張することで実現しています。

## グローバルスタイルシートの追加

スタイルシートを追加するために、 `pages/_app.js` 内で CSS をインポートしてみましょう。

例として、 `styles.css` という次のようなスタイルシートを考えます:

```css
body {
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}
```

もし、まだ作成していない場合は、 [`pages/_app.js` ファイル](/docs/advanced-features/custom-app) を作成してください。  
そして、 `styles.css` を [`import`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import) してみましょう。

```jsx
import '../styles.css';

// この default export は、新たに作成した `pages/_app.js` で必要になります。
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

このスタイルシート (`styles.css`) は、アプリケーション内におけるすべての pages および components に適用されます。  
スタイルシートのグローバルな性質のため、そして競合を回避するため、 **[`pages/_app.js`](/docs/advanced-features/custom-app) 内にのみインポートできます**。

開発環境では、スタイルシートをこのように表現することで、スタイルを編集している最中にホットリロードできます。  
つまり、アプリケーションの状態を維持できるということです。

本番環境では、すべての CSS ファイルは、単一の minify された `.css` ファイルへと自動的に統合されます。

## コンポーネントレベル CSS の追加

Next.js では、`[name].module.css` という命名規則に則ることで、 [CSS Modules](https://github.com/css-modules/css-modules) がサポートされます。

CSS Modules は、一意なクラス名を自動生成することで、 CSS をローカルなスコープにします。  
これによって、クラス名の衝突を心配することなく、異なるファイルに同一の CSS クラス名を用いることができます。

CSS Modules が、コンポーネントレベル CSS を導入する理想的な方法である理由は、こういった特徴のおかげなのです。  
CSS Module ファイルは、**アプリケーション内のいかなる場所でもインポートできます**。

例として、 `components/` フォルダ内の再利用可能な `Button` コンポーネントを考えます:

まず、次のような内容で `components/Button.module.css` ファイルを作成します:

```css
/*
.error {} が他の `.css` や `.module.css` ファイルと衝突することを心配する必要はありません！
*/
.error {
  color: white;
  background-color: red;
}
```

そして、 上記のCSSファイルをインポートして利用し、 `components/Button.js` を作成します:

```jsx
import styles from './Button.module.css';

export function Button() {
  return (
    <button
      type="button"
      // "error" クラスがインポートされた `styles` オブジェクトのプロパティとして
      // アクセスされることに注意してください。
      className={styles.error}
    >
      Destroy
    </button>
  );
}
```

CSS Modules は、 **`.module.css` 拡張子ファイルに対してのみ有効**となるオプション機能です。  
なお、通常の `<link>` スタイルシートやグローバルCSSファイルもサポートされています。

本番環境では、すべての CSS Module ファイルは、 code-split した上で minify された複数の `.css` ファイルへと統合されます。  
これらの `.css` ファイルは、アプリケーション内のホット実行パスを表しており、アプリケーションが描画のために読み込む CSS を最小限にすることを保証します。

## Sassのサポート

Next.js では、 `.scss` あるいは `.sass` といったどちらの拡張子を用いた Sass ファイルでも、インポートできます。  
CSS Modules によるコンポーネントレベルな Sass は、 `.module.scss` あるいは `.module.sass` といった拡張子で利用できます。

Sass のビルトインサポートを利用する前に、必ず [`sass`](https://github.com/sass/sass) をインストールしてください:

```bash
npm install sass
```

Sass サポートには、前節で詳説した CSS ビルトインサポートと同様な恩恵および制限があります。

### Sass 設定のカスタマイズ

もし、Sass コンパイラーの設定をしたい場合、`next.config.js` 内の `sassOptions` を利用できます。

例として、 `includePaths` を追加します:

```js
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
};
```

## Less や Stylus のサポート

`.less` や `.styl` といったファイルのインポートには、次のプラグインを利用できます:

- [@zeit/next-less](https://github.com/zeit/next-plugins/tree/master/packages/next-less)
- [@zeit/next-stylus](https://github.com/zeit/next-plugins/tree/master/packages/next-stylus)

less プラグインを利用する場合、 必ず less の依存関係を追加することを忘れないでください。  
さもなくば、次のようなエラーが起こります:

```bash
Error: Cannot find module 'less'
```

## CSS-in-JS

<details>
  <summary><b>利用できる CSS-in-JS の例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/basic-css">Styled JSX</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-styled-components">Styled Components</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-styletron">Styletron</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-glamor">Glamor</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-cxs">Cxs</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-aphrodite">Aphrodite</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-fela">Fela</a></li>
  </ul>
</details>

既存のいかなる CSS-in-JS も利用できます。  
単純なインラインスタイルの一例としては、次のようになります:

```jsx
function HiThere() {
  return <p style={{ color: 'red' }}>hi there</p>;
}

export default HiThere;
```

分離された scoped CSS を提供するために、 Next.js では [styled-jsx](https://github.com/zeit/styled-jsx) を付属しています。  
その目的は、不幸なことに [JSのみでサーバーレンダリングはサポートしていなかった](https://github.com/w3c/webcomponents/issues/71) Web Components によく似た、 "shadow CSS" をサポートすることにあります。

その他の CSS-in-JS (Styled Components など ) については、上記の例をご覧ください。

`styled-jsx` を利用したコンポーネントは次のようになります:

```jsx
function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  );
}

export default HelloWorld;
```

より多くの具体例については、 [styled-jsx documentation](https://github.com/zeit/styled-jsx) をご覧ください。

## 関連事項

次にやるべきこととして、以下のセクションを読むことを推奨します:

<div class="card">
  <a href="/docs/advanced-features/customizing-postcss-config.md">
    <b>PostCSS の設定をカスタマイズする:</b>
    <small>PostCSS の設定および Next.js によって追加されたプラグインを拡張します。</small>
  </a>
</div>
