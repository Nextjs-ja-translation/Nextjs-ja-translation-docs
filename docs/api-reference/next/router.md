---
description: Next.js Router のAPIやuseRouter フックを利用したルーターインスタンスの使い方について学んでいきます。 
---

# next/router

> この記事を読む前に、[Routing Introduction](/docs/routing/introduction.md)をあらかじめ参照することをおすすめします。

## useRouter

もし、アプリ内の関数コンポーネントに含まれる [`router` object](#router-object) へアクセスしたいときは、 `useRouter` フックを利用できます。以下の例を見てください。

```jsx
import { useRouter } from 'next/router';

function ActiveLink({ children, href }) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black'
  };

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default ActiveLink;
```

> `useRouter` は、[React Hook](https://reactjs.org/docs/hooks-intro.html)、クラスとして扱うことができません。[withRouter](#withRouter)を利用するか、関数コンポーネントでラップしたクラスを用いるかのいづれかで扱うことができます。 

### router object

続いて、[`useRouter`](#useRouter)と[`withRouter`](#withRouter)を使って返す `router` object の定義について書いていきます。:

- `pathname`: `String` - 現在のルート名を返します。 これは `/pages` ディレクトリに含まれるページのパスです。
- `query`: `Object` - クエリーを文字列からオブジェクト型に変換したものを返します。もし、ページに[data fetching requirements](/docs/basic-features/data-fetching.md) を含まれなければ、前もってが空オブジェクトを返します。デフォルトでは。`{}` を返します。
- `asPath`: `String` - ブラウザーに反映されている実際のパス名（クエリーも含まれます）を返します。

加えて、[`Router API`](#router-api) もまたこのオブジェクトに含まれます。

## withRouter

もし、[`useRouter`](#useRouter) がうまく扱えない場合、`withRouter` も[`router` object](#router-object) と同様にコンポーネントに加えることができます。次のように使っていきます。:

```jsx
import { withRouter } from 'next/router';

function Page({ router }) {
  return <p>{router.pathname}</p>;
}

export default withRouter(Page);
```

## Router API

`next/router` でエクスポートされた `Router` API は次のように定義されます。

### Router.push

<details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/using-router">Using Router</a></li>
  </ul>
</details>

クライアントサイドのトランジションを扱います。このメソッドは[`next/link`](/docs/api-reference/next/link.md) では不十分な場合に役立ちます。

```jsx
import Router from 'next/router';

Router.push(url, as, options);
```

- `url` - ナビゲーション先の URL です。ここでは、通常 `page` の名前が使われます。
- `as` - ブラウザーで表示されている任意のデコレータです。デフォルトで `url` を返します。
- `options` - 任意のオブジェクトです。このオプションには以下の構成オプションをもっています。:
  - [`shallow`](/docs/routing/shallow-routing.md): 再実行される前に現在のページのパスを更新します。 [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops-static-generation), [`getServerSideProps`](/docs/basic-features/data-fetching.md#getserversideprops-server-side-rendering) または [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md)。デフォルトでは `false` を返します。

> 外部URL をRouter`で使う必要がない場合、[window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) が先ほどの場合には向いています。

#### 使い方

あらかじめ定義されたルートの `pages/about.js` にナビゲーションする場合:

```jsx
import Router from 'next/router';

function Page() {
  return <span onClick={() => Router.push('/about')}>Click me</span>;
}
```

動的ルートの `pages/post/[pid].js`へナビゲーションする場合:

```jsx
import Router from 'next/router';

function Page() {
  return <span onClick={() => Router.push('/post/[pid]', '/post/abc')}>Click me</span>;
}
```

#### URL object と一緒に利用する

URL オブジェクトも、さきほどの[`next/link`](/docs/api-reference/next/link.md#with-url-object) と同じように扱うことができます。`url` と `as` パラメータとを扱う場合は次のようになります。:

```jsx
import Router from 'next/router';

const handler = () => {
  Router.push({
    pathname: '/about',
    query: { name: 'Vercel' }
  });
};

function ReadMore() {
  return (
    <div>
      Click <span onClick={handler}>here</span> to read more
    </div>
  );
}

export default ReadMore;
```

### Router.replace
[`next/link`](/docs/api-reference/next/link.md) の `replace` prop に似た `Router.replace` は、`history` スタックに新しい URL エントリを追加されるのを防ぎます。次の例を見てください。:

```jsx
import Router from 'next/router';

Router.replace('/home');
```

`Router.replace` の API は [`Router.push`](#router.push)で使われる API　と全く同じ値を返します。

### Router.prefetch
クライアントサイドのトランジションを高速化するためのページを呼び出します。`next/link` をページを自動的に先読みに行われるとき、このメソッドは [`next/link`](/docs/api-reference/next/link.md) を用いないナヴィゲーションでしか役立ちません。

> このAPI は、本番環境用の機能です。開発環境でページを先読みすることはできません。

```jsx
import Router from 'next/router';

Router.prefetch(url, as);
```

- `url` - `pages` ディレクトリに含まれる `page`のパスです。
- `as` - `url` に付属する [dynamic routes](/docs/routing/dynamic-routes) を前もって呼ばれるデコレータです.　デフォルトで `url`を返します。

#### 使い方

例えば。ログインページを持ち、ログイン後にユーザーをダッシュボードにリダイレクトさせる場合を考えます。この時は次のようにダッシュボードを前もって呼びだし、画面をより高速にトランジションできます。:

```jsx
import { useCallback, useEffect } from 'react';
import Router from 'next/router';

export default function Login() {
  const handleSubmit = useCallback(e => {
    e.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* Form data */
      })
    }).then(res => {
      //　すでに先読みされたダッシュボードページに、クライアントサイドの高速なトランジションを行います。 
      if (res.ok) Router.push('/dashboard');
    });
  }, []);

  useEffect(() => {
    // ユーザーがログイン後に訪れた際に、ダッシュボードページの先読みを行います。
    Router.prefetch('/dashboard');
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Router.beforePopState

一部の場合 ( 例えば、[Custom Server](/docs/advanced-features/custom-server.md)を使用する場合 ) において、ルーターが実行される前に[popstate](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) を呼び出して、何かさせたい場合があります。

以下の例のように、リクエストを扱う際(例えば、SSR リフレッシュさせたいとき)に利用できます。

```jsx
import Router from 'next/router';

Router.beforePopState(({ url, as, options }) => {
  // I only want to allow these two routes!
  if (as !== '/' && as !== '/other') {
    // Have SSR render bad routes as a 404.
    window.location.href = as;
    return false;
  }

  return true;
});
```

`Router.beforePopState(cb: () => boolean)`
　
- `cb` - `popstate` イベントによって実行するための関数です。この関数はイベントの状態を次の props をもつオブジェクト型で受け取ります。: 
  - `url`: `String` - 新しいステートのためのルートです。この値は主に `page` の名前を返します。
  - `as`: `String` - ブラウザで表示される URL を返します。
  - `options`: `Object` - [Router.push](#router.push) で送信される追加オプションを返します。

もし、`beforePopState` 関数が `false` を返したとき、`Router`は `popstate` を扱えません。この場合、操作することになります。[Disabling file-system routing](/docs/advanced-features/custom-server.md#disabling-file-system-routing)を参照してください。

### Router.back

ブラウザのバックボタンと同様に、ページを戻します。クリックすると `window.history.back()` が実行されます。

```jsx
import Router from 'next/router';

Router.back();
```

### Router.reload

ブラウザのリフレッシュボタンと同様に、現在の URL でリロードされます。クリックすると、`window.location.reload()` が実行されます。

```jsx
import Router from 'next/router';

Router.reload();
```

### Router.events

<details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-loading">With a page loading indicator</a></li>
  </ul>
</details>

Router 内で発生した様々なイベントを受け取ることができます。こちらがサポートされているイベントの一覧です。:

- `routeChangeStart(url)` - ルート変更開始時に実行されます。
- `routeChangeComplete(url)` - ルートが完全に変更されたときに実行されます。
- `routeChangeError(err, url)` - ルートが変更時にエラーが発生した際、あるいはルートのローディングが中止された際に実行されます。
  - `err.cancelled` - ナビゲーションが中止されたかどうかを示します。
- `beforeHistoryChange(url)` -ブラウザーのヒストリーが変更される直前に実行されます。 
- `hashChangeStart(url)` - ハッシュが変更されてもページが変更されないときに実行されます。
- `hashChangeComplete(url)` - ハッシュが変更されたのにページが変更されないときに実行されます。

> この時の  `url`　は、ブラウザーで表示されているものです。もし、`Router.push(url, as)`(あるいはそれに似たもの)　を呼び出すと、`url` の値は `as`になります。

例えば、ルーターイベント `routeChangeStart` を呼ぶには、次のようにしてください。:

```jsx
import Router from 'next/router';

const handleRouteChange = url => {
  console.log('App is changing to: ', url);
};

Router.events.on('routeChangeStart', handleRouteChange);
```

もし、そのイベントを呼び出したくないのであれば、`off`メソッドをつかってイベントを解除してください。

```jsx
import Router from 'next/router';

Router.events.off('routeChangeStart', handleRouteChange);
```

もし、ルートのローディングが中止になった際（２つのリンクが連続で高速にクリックされたとき）、`routeChangeError`が実行されます。そして、渡された `err` には以下の例のように、`cancelled`プロパティに `true` を格納します。

```jsx
import Router from 'next/router';

Router.events.on('routeChangeError', (err, url) => {
  if (err.cancelled) {
    console.log(`Route to ${url} was cancelled!`);
  }
});
```

コンポーネントがマウントされたとき([useEffect](https://reactjs.org/docs/hooks-effect.html) 、または [componentDidMount](https://reactjs.org/docs/react-component.html#componentdidmount) / [componentWillUnmount](https://reactjs.org/docs/react-component.html#componentwillunmount)　が実行されたとき)、あるいはイベントが発生した際、ルーターイベントは以下の例のように登録される必要があります。

```jsx
import Router from 'next/router';

useEffect(() => {
  const handleRouteChange = url => {
    console.log('App is changing to: ', url);
  };

  Router.events.on('routeChangeStart', handleRouteChange);
  return () => {
    Router.events.off('routeChangeStart', handleRouteChange);
  };
}, []);
```
