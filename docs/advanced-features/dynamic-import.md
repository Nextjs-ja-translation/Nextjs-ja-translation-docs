---
description: JavaScriptモジュールとReactコンポーネントを動的にインポートして、コードを扱いやすいチャンクに分割する。
---

# 動的インポート

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-dynamic-import">動的インポート</a></li>
  </ul>
</details>

Next.js はJavaScriptのES2020 [dynamic `import()`](https://github.com/tc39/proposal-dynamic-import) をサポートしています。JavaScriptモジュール（Reactコンポーネントを含む）を動的にインポートして使うことが出来ます。SSRにも対応しています。

動的インポートは、コードを扱いやすいチャンクに分割する、もう1つの方法と考えることができます。

## 基本的な使用方法

次の例では、`../components/hello`モジュールがページで動的に読み込まれています。

```jsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/hello'));

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponent />
      <p>HOME PAGE is here!</p>
    </div>
  );
}

export default Home;
```

`DynamicComponent`は`../components/hello`から返されるデフォルトのコンポーネントです。通常のReact コンポーネントのように動き、通常どおりにpropsを渡すことができます。

## 名前付きエクスポート

動的コンポーネントがデフォルトのエクスポートでない場合は、名前付きエクスポートも使用できます。名前付きエクスポートの`Hello`を持つ`../components/hello.js` モジュールについて考えてみましょう。

```jsx
export function Hello() {
  return <p>Hello!</p>;
}
```

`Hello` コンポーネントを動的にインポートするには、次のように、[`import()`](https://github.com/tc39/proposal-dynamic-import#example) によって返される [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) から `Hello` コンポーネントを返します。

```jsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/hello').then(mod => mod.Hello));

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponent />
      <p>HOME PAGE is here!</p>
    </div>
  );
}

export default Home;
```

## カスタムローディングコンポーネント

オプションの `loading` コンポーネントを追加して、動的コンポーネントの読み込み中に読み込み状態をレンダリングできます。以下は例です。

```jsx
import dynamic from 'next/dynamic';

const DynamicComponentWithCustomLoading = dynamic(() => import('../components/hello'), {
  loading: () => <p>...</p>
});

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  );
}

export default Home;
```

## SSRを使用しない場合

常にサーバー側にモジュールを含める必要はありません。たとえば、ブラウザのみで動作するライブラリがモジュールに含まれている場合です。

次の例を見てください。

```jsx
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('../components/hello3'), { ssr: false });

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponentWithNoSSR />
      <p>HOME PAGE is here!</p>
    </div>
  );
}

export default Home;
```
