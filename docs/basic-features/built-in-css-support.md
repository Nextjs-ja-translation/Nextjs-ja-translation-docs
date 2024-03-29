---
description: Next.js は、グローバル CSS もしくは CSS Modules の読み込みや、 CSS-in-JS としての `styled-jsx` の利用、あるいは他のいかなる CSS-in-JS もサポートしています！実際に見ていきましょう。
---

# CSS のビルトインサポート

<details open>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/basic-css">Basic CSS Example</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss">With Tailwind CSS</a></li>
  </ul>
</details>

Next.js では、 JavaScript ファイルから CSS をインポートできます。
これは、 Next.js が JavaScript の [`import`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import) の概念を拡張することで実現しています。

## グローバルスタイルシートの追加

スタイルシートをアプリケーションへ追加するために、 `pages/_app.js` 内で CSS ファイルをインポートしてみましょう。

例として、 `styles.css` という次のようなスタイルシートを考えます:

```css
body {
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}
```

もし、まだ作成していない場合は、 [`pages/_app.js`](/docs/advanced-features/custom-app.md) を作成してください。
そして、 `styles.css` を [`import`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import) してみましょう。

```jsx
import '../styles.css';

// この default export は、新たに作成した `pages/_app.js` で必要になります。
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

このスタイルシート (`styles.css`) は、アプリケーション内におけるすべての pages および components に適用されます。
スタイルシートのグローバルな性質のため、そして競合を回避するため、 **[`pages/_app.js`](/docs/advanced-features/custom-app.md) 内にのみインポートできます**。

開発環境では、スタイルシートをこのように表現することで、スタイルを編集している最中にホットリロードできます。
つまり、アプリケーションの状態を維持できるということです。

本番環境では、すべての CSS ファイルは、単一の minify された `.css` ファイルへと自動的に統合されます。

### Import styles from `node_modules`

Since Next.js **9.5.4**, importing a CSS file from `node_modules` is permitted anywhere in your application.

For global stylesheets, like `bootstrap` or `nprogress`, you should import the file inside `pages/_app.js`.
For example:

```jsx
// pages/_app.js
import 'bootstrap/dist/css/bootstrap.css'
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

For importing CSS required by a third party component, you can do so in your component. For example:

```tsx
// components/ExampleDialog.js
import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import '@reach/dialog/styles.css'
function ExampleDialog(props) {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)
  return (
    <div>
      <button onClick={open}>Open Dialog</button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <p>Hello there. I am a dialog</p>
      </Dialog>
    </div>
  )
}
```

## コンポーネントレベル CSS の追加

Next.js では、`[name].module.css` という命名規則に則ることで、 [CSS Modules](https://github.com/css-modules/css-modules) がサポートされます。

CSS Modules は、一意なクラス名を自動生成することで、 CSS をローカルなスコープにします。
これによって、クラス名の衝突を心配することなく、異なるファイルに同一の CSS クラス名を用いることができます。

こういった特徴のおかげで、CSS Modules はコンポーネントレベルの CSS を導入するための理想的な方法となっています。
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

そして、 上記の CSS ファイルをインポートして利用し、 `components/Button.js` を作成します:

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

CSS Modules は、 **`.module.css` 拡張子ファイルに対してのみ有効**となる_オプション機能_です。
なお、通常の `<link>` スタイルシートやグローバル CSS ファイルもサポートされています。

本番環境では、すべての CSS Module ファイルは**コード分割した上で minify された複数の** `.css` ファイルへと自動的に統合されます。
これらの `.css` ファイルは、アプリケーション内のホット実行パスを表しており、アプリケーションが描画のために読み込む CSS を最小限にすることを保証します。

## Sassのサポート

Next.js では、 `.scss` または `.sass` のどちらの拡張子を用いた Sass ファイルでもインポートできます。
CSS Modules によるコンポーネントレベルの Sass を、 `.module.scss` または `.module.sass` の拡張子で利用できます。

Sass のビルトインサポートを利用する前に、必ず [`sass`](https://github.com/sass/sass) をインストールしてください:

```bash
npm install sass
```

Sass サポートには、前節で詳説した CSS ビルトインサポートと同様の恩恵と制限があります。

> **Note**: Sass supports [two different syntaxes](https://sass-lang.com/documentation/syntax), each with their own extension.
> The `.scss` extension requires you use the [SCSS syntax](https://sass-lang.com/documentation/syntax#scss),
> while the `.sass` extension requires you use the [Indented Syntax ("Sass")](https://sass-lang.com/documentation/syntax#the-indented-syntax).
>
> If you're not sure which to choose, start with the `.scss` extension which is a superset of CSS, and doesn't require you learn the
> Indented Syntax ("Sass").

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

### Sass Variables

Next.js supports Sass variables exported from CSS Module files.

For example, using the exported `primaryColor` Sass variable:

```scss
/* variables.module.scss */
$primary-color: #64FF00
:export {
  primaryColor: $primary-color
}
```

```js
// pages/_app.js
import variables from '../styles/variables.module.scss'
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout color={variables.primaryColor}>
      <Component {...pageProps} />
    </Layout>
  )
}
```

## CSS-in-JS

<details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-styled-jsx">Styled JSX</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-styled-components">Styled Components</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-emotion">Emotion</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-linaria">Linaria</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss-emotion">Tailwind CSS + Emotion</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-styletron">Styletron</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-cxs">Cxs</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-aphrodite">Aphrodite</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-fela">Fela</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-stitches">Stitches</a></li>
  </ul>
</details>

既存のいかなる CSS-in-JS も利用できます。
最も単純なのは、インラインスタイルを用いる方法です:

```jsx
function HiThere() {
  return <p style={{ color: 'red' }}>hi there</p>;
}

export default HiThere;
```

分離された scoped CSS へのサポートを提供するために、 Next.js では [styled-jsx](https://github.com/vercel/styled-jsx) を付属しています。
その目的は、残念ながら [サーバーレンダリングをサポートしていない](https://github.com/w3c/webcomponents/issues/71) Web Components に似ている "shadow CSS" をサポートすることにあります。

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

より多くの具体例については、 [styled-jsx documentation](https://github.com/vercel/styled-jsx) をご覧ください。

## 関連事項

次にやるべきこととして、以下のセクションを読むことを推奨します:

<div class="card">
  <a href="/docs/advanced-features/customizing-postcss-config.md">
    <b>PostCSS の設定をカスタマイズする:</b>
    <small>PostCSS の設定および Next.js によって追加されたプラグインを拡張します。</small>
  </a>
</div>
