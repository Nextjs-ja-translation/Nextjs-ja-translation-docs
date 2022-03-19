---
description: JavaScriptモジュールとReactコンポーネントを動的にインポートして、コードを扱いやすいチャンクに分割する。
---

# 動的インポート

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-dynamic-import">動的インポート</a></li>
  </ul>
</details>

Next.js は JavaScript の ES2020 [dynamic `import()`](https://github.com/tc39/proposal-dynamic-import) をサポートしています。JavaScript モジュール（React コンポーネントを含む）を動的にインポートして使うことが出来ます。SSR にも対応しています。

In the following example, we implement fuzzy search using `fuse.js` and only load the module dynamically in the browser after the user types in the search input:

```jsx
import { useState } from 'react'
const names = ['Tim', 'Joe', 'Bel', 'Max', 'Lee']
export default function Page() {
  const [results, setResults] = useState()
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget
          // Dynamically load fuse.js
          const Fuse = (await import('fuse.js')).default
          const fuse = new Fuse(names)
          setResults(fuse.search(value))
        }}
      />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}
```

動的インポートは、コードを扱いやすいチャンクに分割する、もう 1 つの方法と考えることができます。

React components can also be imported using dynamic imports, but in this case we use it in conjunction with `next/dynamic` to make sure it works like any other React Component. Check out the sections below for more details on how it works.

## 基本的な使用方法

次の例では、`../components/hello`モジュールがページで動的に読み込まれています:

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

`DynamicComponent`は `../components/hello` から返されるデフォルトのコンポーネントです。通常の React コンポーネントのように動き、通常どおりに props を渡すことができます。

> **Note**: In `import('path/to/component')`, the path must be explicitly written. It can't be a template string nor a variable. Furthermore the `import()` has to be inside the `dynamic()` call for Next.js to be able to match webpack bundles / module ids to the specific `dynamic()` call and preload them before rendering. `dynamic()` can't be used inside of React rendering as it needs to be marked in the top level of the module for preloading to work, similar to `React.lazy`.

## 名前付きエクスポート

動的コンポーネントがデフォルトのエクスポートでない場合は、名前付きエクスポートも使用できます。名前付きエクスポートの `Hello` を持つ `../components/hello.js` モジュールについて考えてみましょう:

```jsx
export function Hello() {
  return <p>Hello!</p>;
}
```

`Hello` コンポーネントを動的にインポートするには、次のように、[`import()`](https://github.com/tc39/proposal-dynamic-import#example) によって返される [Promise](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise) から `Hello` コンポーネントを返します:

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

オプションの `loading` コンポーネントを追加して、動的コンポーネントの読み込み中に読み込み状態をレンダリングできます。例:

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

次の例を見てください:

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

## With suspense

Option `suspense` allows you to lazy-load a component, similar to `React.lazy` and `<Suspense>` with React 18. Note that it only works on client-side or server-side with `fallback`. Full SSR support in concurrent mode is still a work-in-progress.

```jsx
import dynamic from 'next/dynamic'
const DynamicLazyComponent = dynamic(() => import('../components/hello4'), {
  suspense: true,
})
function Home() {
  return (
    <div>
      <Suspense fallback={`loading`}>
        <DynamicLazyComponent />
      </Suspense>
    </div>
  )
}
```