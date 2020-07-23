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
- `query`: `Object` - クエリーを文字列からオブジェクト型に変換したものを返します。もし、ページに[data fetching requirements](/docs/basic-features/data-fetching.md) 含まれなければ、前もってが空オブジェクトを返します。デフォルトでは。`{}` を返します。
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

クライアントサイドのトランジションを扱います。このメソッドは[`next/link`](/docs/api-reference/next/link.md) では不十分でない場合に役立ちます。

```jsx
import Router from 'next/router';

Router.push(url, as, options);
```

- `url` - The URL to navigate to. This is usually the name of a `page`
- `as` - Optional decorator for the URL that will be shown in the browser. Defaults to `url`
- `options` - Optional object with the following configuration options:
  - [`shallow`](/docs/routing/shallow-routing.md): Update the path of the current page without rerunning [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops-static-generation), [`getServerSideProps`](/docs/basic-features/data-fetching.md#getserversideprops-server-side-rendering) or [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md). Defaults to `false`

> 外部URL をRouter`　で使う必要がない場合、[window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) が先ほどの場合には向いている You don't need to use `Router` for external URLs, [window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) is better suited for those cases.

#### 使い方

あらかじめ定義した `pages/about.js` にナビゲートする場合:

```jsx
import Router from 'next/router';

function Page() {
  return <span onClick={() => Router.push('/about')}>Click me</span>;
}
```

動的ルートである `pages/post/[pid].js`へナビゲートする場合:

```jsx
import Router from 'next/router';

function Page() {
  return <span onClick={() => Router.push('/post/[pid]', '/post/abc')}>Click me</span>;
}
```

#### URL object と一緒に利用する

URL オブジェクトも、さきほどの[`next/link`](/docs/api-reference/next/link.md#with-url-object) と同じように使うことができます。`url` と `as` パラメータとを扱う場合は次のようになります。:

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
クライアントサイドのトランジションを高速化のためのページを呼び出します。このメソッドは [`next/link`](/docs/api-reference/next/link.md) を用いないでナヴィゲーションを
Prefetch pages for faster client-side transitions. This method is only useful for navigations without [`next/link`](/docs/api-reference/next/link.md), as `next/link` takes care of prefetching pages automatically.

> このAPI は、本番環境用の機能です。開発環境でページを前もって呼び出すことはできません。

```jsx
import Router from 'next/router';

Router.prefetch(url, as);
```

- `url` - `pages` ディレクトリに含まれる `page`のパス　The path to a `page` inside the `pages` directory
- `as` - `url` に付属する [dynamic routes](/docs/routing/dynamic-routes) を前もって呼ばれるデコレータ.　デフォルトで `url`を返します。

#### 使い方

例えば。ログインページがあって、ログイン後に、ユーザーをダッシュボードにリダイレクトさせる場合、画面をより高速なトランジションするよりも
 you have a login page, and after a login, you redirect the user to the dashboard. For that case, we can prefetch the dashboard to make a faster transition, like in the following example:

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
      // Do a fast client-side transition to the already prefetched dashboard page
      if (res.ok) Router.push('/dashboard');
    });
  }, []);

  useEffect(() => {
    // Prefetch the dashboard page as the user will go there after the login
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

次の実装例のように、リクエストを扱う際(例えば、SSR リフレッシュさせたいとき)に利用できます。

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

- `cb` - The function to run on incoming `popstate` events. The function receives the state of the event as an object with the following props:
  - `url`: `String` - the route for the new state. This is usually the name of a `page`
  - `as`: `String` - the url that will be shown in the browser
  - `options`: `Object` - Additional options sent by [Router.push](#router.push)

If the function you pass into `beforePopState` returns `false`, `Router` will not handle `popstate` and you'll be responsible for handling it, in that case. See [Disabling file-system routing](/docs/advanced-features/custom-server.md#disabling-file-system-routing).

### Router.back

Navigate back in history. Equivalent to clicking the browser’s back button. It executes `window.history.back()`.

```jsx
import Router from 'next/router';

Router.back();
```

### Router.reload

Reload the current URL. Equivalent to clicking the browser’s refresh button. It executes `window.location.reload()`.

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

You can listen to different events happening inside the Router. Here's a list of supported events:

- `routeChangeStart(url)` - Fires when a route starts to change
- `routeChangeComplete(url)` - Fires when a route changed completely
- `routeChangeError(err, url)` - Fires when there's an error when changing routes, or a route load is cancelled
  - `err.cancelled` - Indicates if the navigation was cancelled
- `beforeHistoryChange(url)` - Fires just before changing the browser's history
- `hashChangeStart(url)` - Fires when the hash will change but not the page
- `hashChangeComplete(url)` - Fires when the hash has changed but not the page

> Here `url` is the URL shown in the browser. If you call `Router.push(url, as)` (or similar), then the value of `url` will be `as`.

For example, to listen to the router event `routeChangeStart`, do the following:

```jsx
import Router from 'next/router';

const handleRouteChange = url => {
  console.log('App is changing to: ', url);
};

Router.events.on('routeChangeStart', handleRouteChange);
```

If you no longer want to listen to the event, unsubscribe with the `off` method:

```jsx
import Router from 'next/router';

Router.events.off('routeChangeStart', handleRouteChange);
```

If a route load is cancelled (for example, by clicking two links rapidly in succession), `routeChangeError` will fire. And the passed `err` will contain a `cancelled` property set to `true`, as in the following example:

```jsx
import Router from 'next/router';

Router.events.on('routeChangeError', (err, url) => {
  if (err.cancelled) {
    console.log(`Route to ${url} was cancelled!`);
  }
});
```

Router events should be registered when a component mounts ([useEffect](https://reactjs.org/docs/hooks-effect.html) or [componentDidMount](https://reactjs.org/docs/react-component.html#componentdidmount) / [componentWillUnmount](https://reactjs.org/docs/react-component.html#componentwillunmount)) or imperatively when an event happens, as in the following example:

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
