---
description: Next.js のアップグレード方法を学びます。
---

# アップグレードガイド

## 11 から 12 へのアップグレード

### Node.js の最小バージョン

Node.js の最小バージョンは 12.0.0 から、ES モジュールのネイティブサポートを備えた最初の Node.js のバージョンとなる 12.22.0 に引き上げられました。

### React の最新版へのアップグレード

アップグレードするには、以下のコマンドを実行します。

```
npm install react@latest react-dom@latest
```

`yarn` を使用する場合:

```
yarn add react@latest react-dom@latest
```

### Next.js のバージョンを 12 にアップグレードする

バージョンアップするには、ターミナルで以下のコマンドを実行します:

```
npm install next@12
```

または:

```
yarn add next@12
```

### Babel に代わる SWC

Next.js は、JavaScript/TypeScript のコンパイルに Rust ベースのコンパイラ[SWC](https://swc.rs/)を使用するようになりました。
この新しいコンパイラは、個別のファイルをコンパイルする際に Babel より最大 17 倍、Fast Refresh では最大 5 倍高速になります。

Next.js は、[カスタムBabel設定](/docs/advanced-features/customizing-babel-config)を持つアプリケーションとの完全な後方互換性を提供します。
Next.js がデフォルトで処理する styled-jsx や、`getStaticProps` / `getStaticPaths` / `getServerSideProps` のツリーシェイクなどの変換は、すべて Rust に移植されました。

アプリケーションが Babel の設定をカスタマイズしている場合、Next.js は自動的に JavaScript/Typescript のコンパイルに SWC を使わず、Next.js 11 と同じように Babel を使うようにフォールバックされます。

現在、カスタム Babel 変換を必要とする外部ライブラリとの統合の多くは、近い将来で Rust ベースの SWC 変換に移植される予定です。これには以下が含まれますが、これらに限定されるものではありません:

- Styled Components
- Emotion
- Relay

SWC を採用するのに役立つ変換を優先するため、[フィードバックスレッド](https://github.com/vercel/next.js/discussions/30174)で `.babelrc` を提供してください。

### SWC による Terser の最小化の置き換え

`next.config.js` に以下のフラグを追加することで Terser を SWC に置き換えて、 JavaScript の minify を最大 7 倍高速化出来ます:

```js
module.exports = {
  swcMinify: true,
}
```

SWC による最小化は、Next.js 12.1 でデフォルトになる前により多くの実際の Next.js アプリケーションでテストできるようオプトインのフラグになっています。
最小化についてのフィードバックがあれば、[フィードバックスレッド](https://github.com/vercel/next.js/discussions/30237)に残してください。

### styled-jsx の CSS 解析の改善

Rust ベースのコンパイラの上に、styled-jsx Babel 変換に使用された CSS パーサをベースにした新しい CSS パーサを実装しました。
この新しいパーサーは CSS の取り扱いを改善し、以前はすり抜けて予期せぬ動作を引き起こしていた無効な CSS が使用された場合にエラーを発生させるようになりました。

この変更により、開発中および `next build` の際に無効な CSS がエラーを投げるようになります。この変更は、styled-jsx の使用にのみ影響します。

### `next/image` のラップ要素が変更されました

`next/image`は `<div>` の代わりに `<span>` で囲われた `<img>` をレンダーするようになりました。

span を対象とした特定の CSS、たとえば `.container span` を使用している場合、Next.js 12 にアップグレードすると `<Image>` コンポーネント内のラップ要素に正しくマッチしない場合があります。
これはセレクタを `.container span.item` のような特定のクラスに制限することで避けることが可能です。
また、より好ましいやり方として `<Image>` コンポーネントをラップする新しい `<div className="wrapper">` を追加して `.container .wrapper` のようにする方法もあります。

`className` プロパティは変更されず、その下の `<img>` 要素に渡されます。

詳しくは[ドキュメント](docs/basic-features/image-optimization#styling)をご覧ください。

### Next.js の HMR の接続が WebSocket に

これまで Next.js は、HMR イベントを受信するために[server-sent events](https://developer.mozilla.org/ja/docs/Web/API/Server-sent_events)接続を使用していましたが、Next.js 12 では WebSocket を使用するようになりました。

Next.js の開発サーバーへのリクエストをプロキシする場合、アップグレードリクエストが正しく処理されるようにする必要のある場合があります。
たとえば、`nginx` では、次のような設定を追加する必要があります。

```nginx
location /_next/webpack-hmr {
    proxy_pass http://localhost:3000/_next/webpack-hmr;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

`express` などのカスタムサーバーの場合、リクエストが正しく渡されるように `app.all` を使用する必要のある場合があります。

例:

```js
app.all('/_next/webpack-hmr', (req, res) => {
  nextjsRequestHandler(req, res)
})
```

### Webpack 4 のサポートを終了しました

すでに webpack 5 を使用している場合は、このセクションをスキップできます。

Next.js 11 はコンパイルのデフォルトとして、webpack 5 を採用しました。[webpack 5 upgrading documentation](/docs/messages/webpack5) でお伝えしているように、Next.js 12 では webpack 4 のサポートは終了しています。

もしあなたのアプリケーションがまだオプトアウトフラグを使って webpack 4 を使っているなら、[webpack 5 upgrading documentation](/docs/messages/webpack5) にリンクするエラーが表示されるようになりました。

### `target` オプションが非推奨になりました

もし `next.config.js` に `target` がない場合は、このセクションを読み飛ばして構いません。

ページを実行するために必要な依存関係をトレースするための組み込みサポートを採用したため、target オプションは非推奨となりました。

Next.js は `next build` の間、各ページとその依存関係を自動的にトレースし、アプリケーションの製品版をデプロイするために必要なすべてのファイルを決定します。

現在、`target` オプションを `serverless` に設定して使用している場合は、[新しい出力の活用方法に関するドキュメント](/docs/advanced-features/output-file-tracing) をお読みください。

## バージョン 10 から 11 へのアップグレード

### React のバージョンを最新にアップグレードする

Next.js 11 では、React の最小バージョンが 17.0.2 に更新され、すでにほとんどのアプリケーションで最新バージョンの React が使用されています。

アップグレードするには、以下のコマンドを実行します:

```
npm install react@latest react-dom@latest
```

`yarn` の場合:

```
yarn add react@latest react-dom@latest
```

### Next.js のバージョンを 11 にアップグレード

アップグレードするには、ターミナルで次のコマンドを実行します:

```
npm install next@11
```

または:

```
yarn add next@11
```

### Webpack 5

Webpack 5 は、すべての Next.js アプリケーションのデフォルトになりました。
webpack のカスタム設定をしていない場合、アプリケーションはすでに webpack 5 を使用しています。webpack のカスタム設定をしている場合は、[Next.js webpack 5 documentation](/docs/messages/webpack5) を参照して、アップグレードのガイダンスを得ることができます。

### `distDir` がデフォルトで破棄されるようになりました

ビルド出力ディレクトリ（デフォルト: `.next`）は Next.js のキャッシュを除いて、デフォルトでクリアされるようになりました。
詳細は、[the cleaning `distDir` RFC](https://github.com/vercel/next.js/discussions/6009) を参照してください。

もしアプリケーションが以前からこの動作に依存していた場合は、 `next.config.js` に `cleanDistDir: false` フラグを追加して、新しいデフォルトの動作を無効にできます。

### `PORT` が `next dev` と `next start` でサポートされるようになりました

Next.js 11 では、アプリケーションが動作するポートを設定するための環境変数 `PORT` がサポートされています。
`p`/`--port` を使用することが推奨されますが、もし `-p` を使用することが禁止されている場合は `PORT` を代替手段として使用できるようになりました。

例:

```
PORT=4000 next start
```

### 画像を取り込むための `next.config.js` カスタマイズ

Next.js 11 は `next/image` による静的画像のインポートをサポートしています。
この新機能は、イメージのインポートを処理できることに依存しています。
もし以前に `next-images` や `next-optimized-images` パッケージを追加していた場合は、 `next/image` を使って新しい組み込みサポートに移行するか、この機能を無効にするかのどちらかを選択できます:

```js
module.exports = {
  images: {
    disableStaticImages: true,
  },
}
```

### `pages/_app.js` からの `super.componentDidCatch()` の削除

`next/app` コンポーネントの `componentDidCatch` は、Next.js 9 からは不要かつ非推奨となり、Next.js 11 で削除されました。

もし `pages/_app.js` にカスタムメソッド `componentDidCatch` がある場合は、不要になったので `super.componentDidCatch` を削除できます。

### `pages/_app.js` からの `Container` の削除

このエクスポートは Next.js 9 以降、不要かつ非推奨となり開発中に警告が表示されて機能しなくなりました。Next.js 11 で削除されました。

もし `pages/_app.js` が `next/app` から `Container` をインポートしている場合は、 `Container` を削除してください。
詳しくは、[ドキュメント](/docs/messages/app-container-deprecated)を参照してください。

### ページコンポーネントからの `props.url` の使用の削除

このプロパティは Next.js 4 から非推奨となり、開発中に警告が表示されるようになりました。
`getStaticProps` / `getServerSideProps` の導入により、これらのメソッドはすでに `props.url` の利用を禁止しています。
Next.js 11 でこれは完全に削除されました。

詳しくは、[ドキュメント](/docs/messages/url-deprecated)をご覧ください。

### `next/image` の `unsized` プロパティの削除

Next.js 10.0.1 で `next/image` の `unsized` プロパティは非推奨になりました。
代わりに `layout="fill"` を使用できます。Next.js 11 では `unsized` が削除されました。

### `next/dynamic` の `modules` プロパティの削除

Next.js 9.5 からは `next/dynamic` の `modules` と `render` オプションは非推奨となり、非推奨であることを示す警告が表示されるようになりました。
これは `next/dynamic` を `React.lazy` と近い API 仕様にするための措置です。 Next.js 11 では、 `modules` と `render` オプションは削除されました。

このオプションは Next.js 8 以降ドキュメントに記載されていないため、アプリケーションがこのオプションを使用している可能性は低いでしょう。

もしアプリケーションが `modules` と `render` を使用している場合は、[ドキュメント](/docs/messages/next-dynamic-modules) を参照するとよいでしょう。

### `Head.rewind`の削除

`Head.rewind`は Next.js 9.5 から機能しなくなり、Next.js 11 で削除されました。
`Head.rewind`の使用は安全に削除できます。

### Moment.js の locales がデフォルトで除外されました

Moment.js はデフォルトで多くのロケールに対する翻訳を含んでいます。
Next.js は、Moment.js を使用するアプリケーションのバンドルサイズを最適化するために、デフォルトでこれらのロケールを自動的に除外するようになりました。

特定のロケールを読み込むには、次のスニペットを使用します:

```js
import moment from 'moment'
import 'moment/locale/ja'

moment.locale('ja')
```

この新しいデフォルトの動作が必要ない場合は、`next.config.js`に `excludeDefaultMomentLocales: false` を追加することで無効にできます。
この新しい最適化は Moment.js のサイズを大幅に縮小するため、無効にしないことを強く推奨します。

### `router.events` の使い方が更新されました

レンダリング中に `router.events` へアクセスしている場合、Next.js 11 では `router.events` はプリレンダリング中には提供されなくなりました。
`UseEffect` で `router.events` にアクセスしていることを確認してください。

```js
useEffect(() => {
  const handleRouteChange = (url, { shallow }) => {
    console.log(
      `App is changing to ${url} ${
        shallow ? 'with' : 'without'
      } shallow routing`
    )
  }

  router.events.on('routeChangeStart', handleRouteChange)

  // コンポーネントがアンマウントされた場合、`off`メソッドでイベントの配信を停止します:
  return () => {
    router.events.off('routeChangeStart', handleRouteChange)
  }
}, [router])
```

もしアプリケーションが `router.router.events` を使用していて、それが public でない内部プロパティである場合は `router.events` を使用するようにしてください。

## React 16 から 17 へ

React 17 は新しい[JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)を導入し、長い間 Next.js にあった機能をより広い React エコシステムにもたらしました。JSX を使うときに `import React from 'react'` する必要がないことです。React 17 を使うとき、Next.js は自動的にこの新しいトランスフォームを使います。このトランスフォームでは、以前の Next.js の実装で意図しなかった副作用である、変数 `React` をグローバル化することはありません。`React` をインポートせずに誤って使ってしまった場合に自動的に修正する [codemod is available](/docs/advanced-features/codemods.md#add-missing-react-import) が用意されています。

## バージョン 9 から 10 へのアップグレード

バージョン 9 と 10 の間には、破壊的変更はありません。

アップグレードするには、次のコマンドを実行します:

```
npm install next@10
```

`yarn` を使う場合:

```
yarn add next@10
```

## バージョン 8 から 9.0.x へのアップグレード

### 前置き

#### Vercel へのプロダクションデプロイ

動的なルーティングのために、 `now.json` ファイル内に `routes` を設定していた場合、Next.js 9 の新しい[動的なルーティング機能](/docs/routing/dynamic-routes) を利用することで、これらのルールを削除できます。

Next.js 9 の動的なルーティングは **[Vercel](https://vercel.com/now) 上では自動的に設定されている**ため、 `now.json` のカスタマイズは必要ありません。

詳細は [こちらの動的なルーティング](/docs/routing/dynamic-routes) を読んでください。

#### 自分のカスタム <App>(`pages/_app.js`) のチェック

[カスタム `<App>`](/docs#custom-app) の例をコピーしていたなら、`getInitialProps` を削除できます。

`pages/_app.js` から `getInitialProps` の削除(可能であれば)は、新しい Next.js の機能を利用するために重要です！

以下の `getInitialProps` は何もしないため削除して構いません:

```js
class MyApp extends App {
  // 削除して下さい、何もしません!
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    // ... などなど
  }
}
```

### 破壊的な変更

#### `@zeit/next-typescript` はもはや必要ではありません

Next.js は `@zeit/next-typescript` の使用を無視するようになり、削除するよう警告されます。`next.config.js` からこのプラグインを削除して下さい。

カスタム `.babelrc` から `@zeit/next-typescript/babel` への参照を削除して下さい（存在する場合）。

[`fork-ts-checker-webpack-plugin`](https://github.com/Realytics/fork-ts-checker-webpack-plugin/issues) の使用も `next.config.js` から削除されるべきです。

Typescript の定義は `next` パッケージと共に配布されるため、衝突する `@types/next` をアンインストールする必要があります。

以下の型は異なります:

> このリストはアップグレードの助けになるようコミュニティで作成されました。もし他の違いを発見した場合は、他のユーザーの助けになるようにこのリストに対してプルリクエストを送って下さい。

変更前:

```tsx
import { NextContext } from 'next';
import { NextAppContext, DefaultAppIProps } from 'next/app';
import { NextDocumentContext, DefaultDocumentIProps } from 'next/document';
```

 変更後:

```tsx
import { NextPageContext } from 'next';
import { AppContext, AppInitialProps } from 'next/app';
import { DocumentContext, DocumentInitialProps } from 'next/document';
```

#### `config` キーがページ上でエクスポートされるようになりました

ページから `config` という名前のカスタム変数(つまり `export { config }` / `export const config ...`) をエクスポートする必要はありません。
このエクスポート変数はオプトイン AMP や API ルーティング機能のように
ページレベルの Next.js 設定を指定するために使われます。

Next.js ではない目的の `config` エクスポートは別の名前に変更しなければなりません。

#### もはや `next/dynamic` はデフォルトでロード時に "loading..." を表示しません

動的コンポーネントはデフォルトではロード時に何も表示しません。その場合でも、
`loading` プロパティを設定することでこの挙動をカスタマイズできます:

```jsx
import dynamic from 'next/dynamic'

const DynamicComponentWithCustomLoading = dynamic(
  () => import('../components/hello2'),
  {
    loading: () => <p>Loading</p>,
  }
)
```

#### `withAmp` は削除され、エクスポートされた設定オブジェクトに置き換えられました

Next.js はページレベルの設定という概念を持つようになり、整合性を保つため `withAmp` 高階コンポーネントは削除されました。

この変更は **Next.js プロジェクトのルートディレクトリで以下のコマンドを実行することで自動的に移行されます:**

```bash
curl -L https://github.com/vercel/next-codemod/archive/master.tar.gz | tar -xz --strip=2 next-codemod-master/transforms/withamp-to-config.js npx jscodeshift -t ./withamp-to-config.js pages/**/*.js
```

この移行を手動で行う、あるいは codemod が生成する内容を見るためには、以下をご覧下さい:

**移行前**

```jsx
import { withAmp } from 'next/amp';

function Home() {
  return <h1>My AMP Page</h1>;
}

export default withAmp(Home);
// または
export default withAmp(Home, { hybrid: true });
```

**移行後**

```jsx
export default function Home() {
  return <h1>My AMP Page</h1>;
}

export const config = {
  amp: true,
  // または
  amp: 'hybrid'
};
```

#### `next export` はもはや `index.html` としてエクスポートされません

以前は、 `pages/about.js` のエクスポートにより `out/about/index.html` が出力されていました。この挙動は `out/about.html` を出力するように変更されました。

以下の内容で `next.config.js` を作成することで、以前の挙動に戻すことができます:

```js
// next.config.js
module.exports = {
  trailingSlash: true,
}
```

#### `./pages/api/` は異なる扱いになります

`./pages/api/` 内のページは [API Routes](https://nextjs.org/blog/next-9#api-routes) と見なされます。
このディレクトリのページはもはやクライアント側のバンドルに含まれません。

## 非推奨の機能

#### `next/dynamic` の一度に複数のモジュールのロードは非推奨となりました

`next/dynamic` の一度に複数のモジュールをロードする機能は、 React の実装 (`React.lazy` と `Suspense`) に近づけるため非推奨となりました。

この挙動に依存するコードの更新は、比較的簡単です！アプリケーション移行の助けになるよう、移行前/移行後の例を提供しました:

**移行前**

```jsx
import dynamic from 'next/dynamic';

const HelloBundle = dynamic({
  modules: () => {
    const components = {
      Hello1: () => import('../components/hello1').then(m => m.default),
      Hello2: () => import('../components/hello2').then(m => m.default)
    };

    return components;
  },
  render: (props, { Hello1, Hello2 }) => (
    <div>
      <h1>{props.title}</h1>
      <Hello1 />
      <Hello2 />
    </div>
  )
});

function DynamicBundle() {
  return <HelloBundle title="Dynamic Bundle" />;
}

export default DynamicBundle;
```

**移行後**

```jsx
import dynamic from 'next/dynamic';

const Hello1 = dynamic(() => import('../components/hello1'));
const Hello2 = dynamic(() => import('../components/hello2'));

function HelloBundle({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <Hello1 />
      <Hello2 />
    </div>
  );
}

function DynamicBundle() {
  return <HelloBundle title="Dynamic Bundle" />;
}

export default DynamicBundle;
```
