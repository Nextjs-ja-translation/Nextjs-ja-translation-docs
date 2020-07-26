---
description: Next.js のアップグレード方法を学びます。
---

# アップグレードガイド

## バージョン 8 から 9.0.x へのアップグレード

### 前置き

#### Vercel へのプロダクションデプロイ

動的ルーティングのために、 `now.json` ファイル内に `routes` を設定していた場合、Next.js 9 の新しい[動的なルーティング機能](https://nextjs.org/docs/routing/dynamic-routes) を利用することで、これらのルールを削除できます。

Next.js 9 の動的なルーティングは **[Now](https://vercel.com/now) 上では自動的に設定されている**ため、 `now.json` のカスタマイズは必要ありません。

詳細は [こちらの動的なルーティング](https://nextjs.org/docs/routing/dynamic-routes) を読んでください。

#### 自分のカスタム <App>(`pages/_app.js`) のチェック

[カスタム `<App>`](https://nextjs.org/docs#custom-app) の例をコピーしていたなら、`getInitialProps` を削除できます。

`pages/_app.js` から `getInitialProps` の削除(できれば)は、新しい Next.js の機能を利用するために重要です！

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

カスタム `.babelrc` から `@zeit/next-typescript/babel` への参照があれば削除して下さい。

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

#### `config` キーはページ上で特殊なエクスポートになります

ページから `config` という名前のカスタム変数(つまり `export { config }` / `export const config ...`) をエクスポートする必要はありません。
このエクスポート変数はオプトイン AMP や API ルーティング機能のように
ページレベルの Next.js 設定を指定するために使われます。

Next.js ではない目的の `config` エクスポートは別の名前に変更しなければなりません。

#### `next/dynamic` はデフォルトではもはやロード時に　"loading..." を表示しません

動的コンポーネントはデフォルトではロード時に何も表示しません。その場合でも、
`loading` プロパティを設定することでこの挙動をカスタマイズできます:

```jsx
import dynamic from 'next/dynamic';

const DynamicComponentWithCustomLoading = dynamic(() => import('../components/hello2'), {
  loading: () => <p>Loading</p>
});
```

#### `withAmp` は削除され、エクスポートされた設定オブジェクトに置き換えられました

Next.js はページレベルの設定という概念を持つようになり、整合性を保つため `withAmp` 高位コンポーネントは削除されました。

この変更は **Next.js プロジェクトのルートディレクトリで以下のコマンドを実行することで自動的に移行されます:**

```bash
curl -L https://github.com/zeit/next-codemod/archive/master.tar.gz | tar -xz --strip=2 next-codemod-master/transforms/withamp-to-config.js npx jscodeshift -t ./withamp-to-config.js pages/**/*.js
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
  exportTrailingSlash: true
};
```

#### `./pages/api/` は異なる扱いになります

`./pages/api/` 内のページは [API Routes](https://nextjs.org/blog/next-9#api-routes) と見なされます。
このディレクトリのページはもはやクライアント側のバンドルに含まれません。

## 非推奨の機能

#### `next/dynamic` の一度に複数のモジュールのロードは非推奨となりました

`next/dynamic` の一度に複数のモジュールをロードする機能は、 React の実装 (`React.lazy` と `Suspense`) に近づけるため非推奨となりました。

この挙動に依存するコードの更新は、比較的簡単です！
アプリケーション移行の助けになるよう、移行前/移行後の例を提供しました:

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
