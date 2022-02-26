---
description: Next.js の Router API について学び、useRouter フックを利用してページ内のルーターインスタンスにアクセスしてみましょう。
---

# next/router

>  先に進む前に、まずは[ルーティング入門](/docs/routing/introduction.md)をお読みになることをお勧めします。

## useRouter

アプリ内の関数コンポーネントの中で [`router` オブジェクト](#router-オブジェクト) へアクセスしたいときは、 `useRouter` フックを利用できます。以下の例をご覧ください:

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

<!-- textlint-disable -->
> `useRouter` は、[React Hook](https://ja.reactjs.org/docs/hooks-intro.html) であり、したがってクラスとともに使用することはできません。[withRouter](#withRouter) を利用するか、関数コンポーネントでクラスをラップしてください。

### router オブジェクト

[`useRouter`](#useRouter) と [`withRouter`](#withRouter) の両方から返却される `router` オブジェクトの定義は以下のとおりです:

- `pathname`: `String` - 現在のルートです。 これは `/pages` ディレクトリでのページのパスです。設定された `basePath` か `locale` は含まれません。
- `query`: `Object` - オブジェクトに解釈されたクエリ文字列です。ページに[データ取得要求](/docs/basic-features/data-fetching.md) が含まれなければ、プリレンダリング時には空オブジェクトになります。デフォルトでは `{}` になります。
- `asPath`: `String` - ブラウザに表示される実際のパス（クエリも含まれる）です。設定された `basePath` か `locale` は含まれません。
- `isFallback`: `boolean` - Whether the current page is in [fallback mode](/docs/api-reference/data-fetching/get-static-paths.md#fallback-pages).
- `basePath`: `String` - The active [basePath](/docs/api-reference/next.config.js/basepath.md) (if enabled).
- `locale`: `String` - The active locale (if enabled).
- `locales`: `String[]` - All supported locales (if enabled).
- `defaultLocale`: `String` - The current default locale (if enabled).
- `domainLocales`: `Array<{domain, defaultLocale, locales}>` - Any configured domain locales.
- `isReady`: `boolean` - Whether the router fields are updated client-side and ready for use. Should only be used inside of `useEffect` methods and not for conditionally rendering on the server. See related docs for use case with [automatically statically optimized pages](/docs/advanced-features/automatic-static-optimization.md)
- `isPreview`: `boolean` - Whether the application is currently in [preview mode](/docs/advanced-features/preview-mode.md).

The following methods are included inside `router`:

### router.push


<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/using-router">ルーターを利用する</a></li>
  </ul>
</details>


クライアント側のページ遷移を処理します。このメソッドは [`next/link`](/docs/api-reference/next/link.md) では不十分な場合に役立ちます。

```jsx
router.push(url, as, options);
```

- `url`:`UrlObject | String` - 遷移先の URL です。 (see [Node.JS URL module documentation](https://nodejs.org/api/url.html#legacy-urlobject) for `UrlObject` properties)
- `as`: `UrlObject | String` - URL のオプションのデコレータで、ブラウザに表示されます。Before Next.js 9.5.3 this was used for dynamic routes, check our [previous docs](https://nextjs.org/docs/tag/v9.5.2/api-reference/next/link#dynamic-routes) to see how it worked. Note: when this path differs from the one provided in `href` the previous `href`/`as` behavior is used as shown in the [previous docs](https://nextjs.org/docs/tag/v9.5.2/api-reference/next/link#dynamic-routes)
- `options` - 以下の設定オプションを持つ、オプションのオブジェクトです:
  - `scroll` - Optional boolean, controls scrolling to the top of the page after navigation. Defaults to `true`
  - [`shallow`](/docs/routing/shallow-routing.md): [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops静的生成)、[`getServerSideProps`](/docs/basic-features/data-fetching.md#getserversidepropsサーバーサイドレンダリング) あるいは [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md) を再実行することなく現在のページのパスを更新します。デフォルトでは `false` です。
  - `locale` - Optional string, indicates locale of the new page

> 外部 URL に対しては `router.push` を使う必要がありません。この場合は [window.location](https://developer.mozilla.org/ja/docs/Web/API/Window/location) がより適しています。

#### 使い方

事前に定義されたルートである `pages/about.js` へ遷移する場合:

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/about')}>
      Click me
    </button>
  )
}
```

動的ルートの `pages/post/[pid].js` へ遷移する場合:

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/post/abc')}>
      Click me
    </button>
  )
}
```

> **Note:** When navigating to the same page in Next.js, the page's state **will not** be reset by default, as the top-level React component is the same. You can manually ensure the state is updated using `useEffect`.

Redirecting the user to `pages/login.js`, useful for pages behind [authentication](/docs/authentication):

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Here you would fetch and return the user
const useUser = () => ({ user: null, loading: false })

export default function Page() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/login')
    }
  }, [user, loading])

  return <p>Redirecting...</p>
}
```

#### URL オブジェクトと一緒に利用する

URL オブジェクトは、[`next/link`](/docs/api-reference/next/link.md#urlオブジェクト) で URL オブジェクトを用いる場合と同じように扱うことができます。`url` と `as` パラメータの両方で有効です:

```jsx
import { useRouter } from 'next/router'

export default function ReadMore({ post }) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => {
        router.push({
          pathname: '/post/[pid]',
          query: { pid: post.id },
        })
      }}
    >
      Click here to read more
    </button>
  )
}
```

### router.replace

[`next/link`](/docs/api-reference/next/link.md) の `replace` prop に似ています。`router.replace` を使うと、`history` スタックに新しい URL エントリは追加されません。次の例をご覧ください:

```jsx
router.replace(url, as, options)
```

`Router.replace` の API は [`Router.push`](#router.push) で使われる API と全く同じです。

#### Usage

Take a look at the following example:

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.replace('/home')}>
      Click me
    </button>
  )
}
```

### router.prefetch
クライアント側のページ遷移を高速化するためにページをプリフェッチします。このメソッドは [`next/link`](/docs/api-reference/next/link.md) を用いないページ遷移においてのみ有用です。というのも、`next/link` は自動的にページのプリフェッチ周りの面倒を見てくれるからです。

> この API は、本番環境限定の機能です。Next.js は開発環境ではページをプリフェッチしません。

```jsx
router.prefetch(url, as)
```

- `url` - The URL to prefetch, including explicit routes (e.g. `/dashboard`) and dynamic routes (e.g. `/product/[id]`)
- `as` - `url` のオプションのデコレータであり、Before Next.js 9.5.3 this was used to prefetch dynamic routes, check our [previous docs](https://nextjs.org/docs/tag/v9.5.2/api-reference/next/link#dynamic-routes) to see how it worked

#### 使い方

例えば、ログインページがあり、ログイン後にユーザーをダッシュボードへリダイレクトさせるとしましょう。こうしたケースでは、より高速にページ遷移すべくダッシュボードをプリフェッチできます。次の例のようになります:

```jsx
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* Form data */
      }),
    }).then((res) => {
      // Do a fast client-side transition to the already prefetched dashboard page
      if (res.ok) router.push('/dashboard')
    })
  }, [])

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard')
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  )
}
```

### router.beforePopState

場合によっては（例えば、[カスタムサーバー](/docs/advanced-features/custom-server.md)を使用する場合）、[popstate](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) をリッスンして、ルーターが動作する前に何かしたいということがあります。

```jsx
router.beforePopState(cb)
```

- `cb` - 入力された `popstate` イベントに対して実行される関数です。この関数は、以下の props を持つオブジェクトとしてイベントの状態を受け取ります:
  - `url`: `String` - 新しい state のためのルートです。これは通常 `page` の名前です。
  - `as`: `String` - ブラウザに表示される URL です。
  - `options`: `Object` - [Router.push](#router.push) によって送信される追加のオプションです。

`beforePopState` に渡した関数が `false` を返却する場合、`Router` は `popstate` を処理しないため、その場合は自分の責任で `popstate` を処理することになります。 [ファイルシステムのルーティングを無効化する](/docs/advanced-features/custom-server.md#ファイルシステムルーティングの無効化) をご覧ください。

#### Usage

これを用いてリクエストを操作したり、SSR によるリフレッシュを強制したりできます。以下に示す例のようになります:

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      // I only want to allow these two routes!
      if (as !== '/' && as !== '/other') {
        // Have SSR render bad routes as a 404.
        window.location.href = as
        return false
      }

      return true
    })
  }, [])

  return <p>Welcome to the page</p>
}
```

### router.back

履歴を遡ります。ブラウザの戻るボタンをクリックするのと同じです。`window.history.back()` が実行されます。

#### Usage

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()}>
      Click here to go back
    </button>
  )
}
```

### router.reload

現在の URL をリロードします。ブラウザの更新ボタンをクリックするのと同じです。`window.location.reload()` が実行されます。

#### Usage

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.reload()}>
      Click here to reload
    </button>
  )
}
```

### Router.events

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-loading">ページ読み込みインジケーターと一緒に利用する</a></li>
  </ul>
</details>

Router 内で発生する様々なイベントをリッスンできます。こちらがサポートされているイベントの一覧です:

- `routeChangeStart(url, { shallow })` - ルートの変更が開始した時に発火します。
- `routeChangeComplete(url, { shallow })` - ルートが完全に変更され終わったときに発火します。
- `routeChangeError(err, url, { shallow })` - ルート変更時にエラーが発生した際、あるいはルートの読み込みが中止された際に発火します。
  - `err.cancelled` - ページ遷移が中止されたかどうかを示します。
- `beforeHistoryChange(url, { shallow })` -ブラウザの履歴を変更する直前に発火します。
- `hashChangeStart(url, { shallow })` - ハッシュが変更されるが、ページが変更されないときに発火します。
- `hashChangeComplete(url, { shallow })` - ハッシュの変更が完了したが、ページが変更されないときに実行されます。

> ここでの `url` は [`basePath`](/docs/api-reference/next.config.js/basepath.md) を含むブラウザに表示されている URL です。

#### 使い方

例えば、ルーターのイベント `routeChangeStart` をリッスンするには, open or create `pages/_app.js` and subscribe to the event, like so:

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      )
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return <Component {...pageProps} />
}
```

> We use a [Custom App](/docs/advanced-features/custom-app.md) (`pages/_app.js`) for this example to subscribe to the event because it's not unmounted on page navigations, but you can subscribe to router events on any component in your application.

ルーターのイベントは、コンポーネントがマウントされたとき（[useEffect](https://ja.reactjs.org/docs/hooks-effect.html) または [componentDidMount](https://ja.reactjs.org/docs/react-component.html#componentdidmount) / [componentWillUnmount](https://ja.reactjs.org/docs/react-component.html#componentwillunmount)）あるいはイベント発生時に、imperatively に登録する必要があります

If a route load is cancelled (for example, by clicking two links rapidly in succession), `routeChangeError` will fire. And the passed `err` will contain a `cancelled` property set to `true`, as in the following example:

```jsx
import Router from 'next/router';

Router.events.off('routeChangeStart', handleRouteChange);
```

ルートの読み込みがキャンセルされたら（例えば、2 つのリンクを続けて素早くクリックした場合）、`routeChangeError` が発火します。そして、渡される `err` には、以下の例のように、`true` がセットされた `cancelled` プロパティが含まれます:

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeError = (err, url) => {
      if (err.cancelled) {
        console.log(`Route to ${url} was cancelled!`)
      }
    }

    router.events.on('routeChangeError', handleRouteChangeError)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [])

  return <Component {...pageProps} />
}
```

## Potential ESLint errors

Certain methods accessible on the `router` object return a Promise. If you have the ESLint rule, [no-floating-promises](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md) enabled, consider disabling it either globally, or for the affected line.

If your application needs this rule, you should either `void` the promise – or use an `async` function, `await` the Promise, then void the function call. **This is not applicable when the method is called from inside an `onClick` handler**.

The affected methods are:

- `router.push`
- `router.replace`
- `router.prefetch`

### Potential solutions

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Here you would fetch and return the user
const useUser = () => ({ user: null, loading: false })

export default function Page() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    // disable the linting on the next line - This is the cleanest solution
    // eslint-disable-next-line no-floating-promises
    router.push('/login')

    // void the Promise returned by router.push
    if (!(user || loading)) {
      void router.push('/login')
    }
    // or use an async function, await the Promise, then void the function call
    async function handleRouteChange() {
      if (!(user || loading)) {
        await router.push('/login')
      }
    }
    void handleRouteChange()
  }, [user, loading])

  return <p>Redirecting...</p>
}
```

## withRouter

[`useRouter`](#useRouter) が最適でない場合、`withRouter` を使うことで同様の [`router` オブジェクト](#router-オブジェクト)をコンポーネントに加えることができます。使い方は以下のとおりです:

```jsx
import { withRouter } from 'next/router';

function Page({ router }) {
  return <p>{router.pathname}</p>;
}

export default withRouter(Page);
```

### TypeScript

To use class components with `withRouter`, the component needs to accept a router prop:

```tsx
import React from 'react'
import { withRouter, NextRouter } from 'next/router'

interface WithRouterProps {
  router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

class MyComponent extends React.Component<MyComponentProps> {
  render() {
    return <p>{this.props.router.pathname}</p>
  }
}

export default withRouter(MyComponent)
```