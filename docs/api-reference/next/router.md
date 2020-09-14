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

> `useRouter` は、[React Hook](https://ja.reactjs.org/docs/hooks-intro.html) であり、したがってクラスとともに使用することはできません。[withRouter](#withRouter) を利用するか、関数コンポーネントでクラスをラップしてください。

### router オブジェクト

[`useRouter`](#useRouter) と [`withRouter`](#withRouter) の両方から返却される `router` オブジェクトの定義は以下のとおりです:

- `pathname`: `String` - 現在のルートです。 これは `/pages` ディレクトリでのページのパスです。
- `query`: `Object` - オブジェクトに解釈されたクエリ文字列です。ページに[データ取得要求](/docs/basic-features/data-fetching.md) が含まれなければ、プリレンダリング時には空オブジェクトになります。デフォルトでは `{}` になります。
- `asPath`: `String` - ブラウザに表示される実際のパス（クエリも含まれる）です。

加えて、[`Router API`](#router-api) もまたこのオブジェクトに含まれます。

## withRouter

[`useRouter`](#useRouter) が最適でない場合、`withRouter` を使うことで同様の [`router` オブジェクト](#router-オブジェクト)をコンポーネントに加えることができます。使い方は以下のとおりです:

```jsx
import { withRouter } from 'next/router';

function Page({ router }) {
  return <p>{router.pathname}</p>;
}

export default withRouter(Page);
```

## Router API

`Router` の API は `next/router` からエクスポートされます。Router API は以下のように定義されています。

### Router.push


<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/using-router">ルーターを利用する</a></li>
  </ul>
</details>


クライアント側のページ遷移を処理します。このメソッドは [`next/link`](/docs/api-reference/next/link.md) では不十分な場合に役立ちます。

```jsx
import Router from 'next/router';

Router.push(url, as, options);
```

- `url` - 遷移先の URL です。通常、`page` の名前です。
- `as` - URL のオプションのデコレータで、ブラウザに表示されます。デフォルトは `url` です。
- `options` - 以下の設定オプションを持つ、オプションのオブジェクトです:
  - [`shallow`](/docs/routing/shallow-routing.md): [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops静的生成)、[`getServerSideProps`](/docs/basic-features/data-fetching.md#getserversidepropsサーバーサイドレンダリング) あるいは [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md) を再実行することなく現在のページのパスを更新します。デフォルトでは `false` です。

> 外部 URL に対しては `Router` を使う必要がありません。この場合は [window.location](https://developer.mozilla.org/ja/docs/Web/API/Window/location) がより適しています。

#### 使い方

事前に定義されたルートである `pages/about.js` へ遷移する場合:

```jsx
import Router from 'next/router';

function Page() {
  return <span onClick={() => Router.push('/about')}>Click me</span>;
}
```

動的ルートの `pages/post/[pid].js` へ遷移する場合:

```jsx
import Router from 'next/router';

function Page() {
  return <span onClick={() => Router.push('/post/[pid]', '/post/abc')}>Click me</span>;
}
```

#### URL オブジェクトと一緒に利用する

URL オブジェクトは、[`next/link`](/docs/api-reference/next/link.md#urlオブジェクト) で URL オブジェクトを用いる場合と同じように扱うことができます。`url` と `as` パラメータの両方で有効です:

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

[`next/link`](/docs/api-reference/next/link.md) の `replace` prop に似ています。`Router.replace` を使うと、`history` スタックに新しい URL エントリは追加されません。次の例をご覧ください:

```jsx
import Router from 'next/router';

Router.replace('/home');
```

`Router.replace` の API は [`Router.push`](#router.push) で使われる API と全く同じです。

### Router.prefetch
クライアント側のページ遷移を高速化するためにページをプリフェッチします。このメソッドは [`next/link`](/docs/api-reference/next/link.md) を用いないページ遷移においてのみ有用です。というのも、`next/link` は自動的にページのプリフェッチ周りの面倒を見てくれるからです。

> この API は、本番環境限定の機能です。Next.js は開発環境ではページをプリフェッチしません。

```jsx
import Router from 'next/router';

Router.prefetch(url, as);
```

- `url` - `pages` ディレクトリに含まれる `page` へのパスです。
- `as` - `url` のオプションのデコレータであり、[動的ルート](/docs/routing/dynamic-routes) をプリフェッチするために用いられます。デフォルトでは `url` です。

#### 使い方

例えば、ログインページがあり、ログイン後にユーザーをダッシュボードへリダイレクトさせるとしましょう。こうしたケースでは、より高速にページ遷移すべくダッシュボードをプリフェッチできます。次の例のようになります:

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
        /* フォームのデータ */
      })
    }).then(res => {
      // プリフェッチ済みのダッシュボードページに、クライアント側で高速に遷移します
      if (res.ok) Router.push('/dashboard');
    });
  }, []);

  useEffect(() => {
    // ダッシュボードページをプリフェッチします。ユーザーがログイン後にそのページを訪れることになるからです。
    Router.prefetch('/dashboard');
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {/* フォームのフィールド */}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Router.beforePopState

場合によっては（例えば、[カスタムサーバー](/docs/advanced-features/custom-server.md)を使用する場合）、[popstate](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) をリッスンして、ルーターが動作する前に何かしたいということがあります。

これを用いてリクエストを操作したり、SSR によるリフレッシュを強制したりできます。以下に示す例のようになります:

```jsx
import Router from 'next/router';
Router.beforePopState(({ url, as, options }) => {
  // この 2 つのルートだけを許可したい！
  if (as !== '/' && as !== '/other') {
    // 不正なルートは 404 として SSR でレンダリングする
    window.location.href = as;
    return false;
  }
  return true;
});
```

`Router.beforePopState(cb: () => boolean)`
　
- `cb` - 入力された `popstate` イベントに対して実行される関数です。この関数は、以下の props を持つオブジェクトとしてイベントの状態を受け取ります:
  - `url`: `String` - 新しい state のためのルートです。これは通常 `page` の名前です。
  - `as`: `String` - ブラウザに表示される URL です。
  - `options`: `Object` - [Router.push](#router.push) によって送信される追加のオプションです。

`beforePopState` に渡した関数が `false` を返却する場合、`Router` は `popstate` を処理しないため、その場合は自分の責任で `popstate` を処理することになります。 [ファイルシステムのルーティングを無効化する](/docs/advanced-features/custom-server.md#ファイルシステムルーティングの無効化) をご覧ください。

### Router.back

履歴を遡ります。ブラウザの戻るボタンをクリックするのと同じです。`window.history.back()` が実行されます。

```jsx
import Router from 'next/router';

Router.back();
```

### Router.reload

現在の URL をリロードします。ブラウザの更新ボタンをクリックするのと同じです。`window.location.reload()` が実行されます。

```jsx
import Router from 'next/router';

Router.reload();
```

### Router.events

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-loading">ページ読み込みインジケーターと一緒に利用する</a></li>
  </ul>
</details>

Router 内で発生する様々なイベントをリッスンできます。こちらがサポートされているイベントの一覧です:

- `routeChangeStart(url)` - ルートの変更が開始した時に発火します。
- `routeChangeComplete(url)` - ルートが完全に変更され終わったときに発火します。
- `routeChangeError(err, url)` - ルート変更時にエラーが発生した際、あるいはルートの読み込みが中止された際に発火します。
  - `err.cancelled` - ページ遷移が中止されたかどうかを示します。
- `beforeHistoryChange(url)` -ブラウザの履歴を変更する直前に発火します。
- `hashChangeStart(url)` - ハッシュが変更されるが、ページが変更されないときに発火します。
- `hashChangeComplete(url)` - ハッシュの変更が完了したが、ページが変更されないときに実行されます。

> ここでの `url` はブラウザに表示されている URL です。`Router.push(url, as)`（あるいは類似のメソッド）を呼び出すと、`url` の値は `as` になります。

例えば、ルーターのイベント `routeChangeStart` をリッスンするには次のようにしてください:

```jsx
import Router from 'next/router';

const handleRouteChange = url => {
  console.log('App is changing to: ', url);
};

Router.events.on('routeChangeStart', handleRouteChange);
```

イベントをリッスンしたくなくなったら、`off` メソッドを使って購読を解除してください。

```jsx
import Router from 'next/router';

Router.events.off('routeChangeStart', handleRouteChange);
```

ルートの読み込みがキャンセルされたら（例えば、2 つのリンクを続けて素早くクリックした場合）、`routeChangeError` が発火します。そして、渡される `err` には、以下の例のように、`true` がセットされた `cancelled` プロパティが含まれます:

```jsx
import Router from 'next/router';

Router.events.on('routeChangeError', (err, url) => {
  if (err.cancelled) {
    console.log(`Route to ${url} was cancelled!`);
  }
});
```

ルーターのイベントは、コンポーネントがマウントされたとき（[useEffect](https://ja.reactjs.org/docs/hooks-effect.html) または [componentDidMount](https://ja.reactjs.org/docs/react-component.html#componentdidmount) / [componentWillUnmount](https://ja.reactjs.org/docs/react-component.html#componentwillunmount)）あるいはイベント発生時に、以下の例のように imperatively に登録する必要があります:

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
