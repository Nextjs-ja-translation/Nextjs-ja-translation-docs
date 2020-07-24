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

> ``useRouter` は、[React Hook](https://ja.reactjs.org/docs/hooks-intro.html) であり、したがってクラスとともに使用することはできません。[withRouter](#withRouter) を利用するか、関数コンポーネントでクラスをラップしてください。

### router オブジェクト

[`useRouter`](#useRouter)と[`withRouter`](#withRouter)の両方から返却される `router` オブジェクトの定義は以下の通りです。:

- `pathname`: `String` - 現在のルート名です。 これは `/pages` ディレクトリでのページのパスです。
- `query`: `Object` - オブジェクトに解釈されたクエリ文字列です。ページに[データ取得要求](/docs/basic-features/data-fetching.md) が含まれなければ、プリレンダリングするときは空オブジェクトになります。デフォルトでは。`{}` になります。
- `asPath`: `String` - ブラウザーに反映されている実際のパス（クエリーも含まれる）です。

加えて、[`Router API`](#router-api) もまたこのオブジェクトに含まれます。

## withRouter

もし、[`useRouter`](#useRouter) が最適でない場合、`withRouter` を使うことで、と同様の[`router` オブジェクト](#router-object)にコンポーネントを加えることができます。使い方は以下の通りです。:

```jsx
import { withRouter } from 'next/router';

function Page({ router }) {
  return <p>{router.pathname}</p>;
}

export default withRouter(Page);
```

## Router API

`Router` の API は、`next/router` からエクスポートされます。`Router` API は以下のように定義されます。

### Router.push


<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/using-router">ルーターを利用する</a></li>
  </ul>
</details>


クライアント側の画面遷移を処理します。このメソッドは [`next/link`](/docs/api-reference/next/link.md) では不十分な場合に役立ちます。

```jsx
import Router from 'next/router';

Router.push(url, as, options);
```

- `url` - 遷移先の URL です。通常 `page` の名前です。
- `as` - URL のオプションのデコレータで、ブラウザで表示されます。デフォルトは `url` です。
- [`shallow`](/docs/routing/shallow-routing.md): [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops静的生成)、[`getServerSideProps`](/docs/basic-features/data-fetching.md#getserversidepropsサーバーサイドレンダリング) あるいは [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md) を再実行することなく現在のページのパスを更新します。デフォルトでは `false` です。

> 外部URL に対して、`Router` を使う必要はありません。[window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) が先ほどの場合にはより適しています。

#### 使い方

事前に定義されたルートである `pages/about.js` へ遷移する場合:

```jsx
import Router from 'next/router';

function Page() {
  return <span onClick={() => Router.push('/about')}>Click me</span>;
}
```

動的ルートの `pages/post/[pid].js`へ遷移する場合:

```jsx
import Router from 'next/router';

function Page() {
  return <span onClick={() => Router.push('/post/[pid]', '/post/abc')}>Click me</span>;
}
```

#### URL オブジェクトと一緒に利用する

URL オブジェクトは、[`next/link`](/docs/api-reference/next/link.md#urlオブジェクト)で URL オブジェクトを用いる場合と同じように扱うことができます。`url` と `as` パラメータの両方で有効です:

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

[`next/link`](/docs/api-reference/next/link.md) の `replace` prop に似ています。 `Router.replace` を使うと、`history` スタックに新しい URL エントリを追加されません。次の例をご覧ください:

```jsx
import Router from 'next/router';

Router.replace('/home');
```

`Router.replace` の API は [`Router.push`](#router.push)で使われる API　と全く同じ値です。

### Router.prefetch
クライアント側の画面遷移を高速化するためをページをプリフェッチします。このメソッドは [`next/link`](/docs/api-reference/next/link.md) を用いない遷移でのみ有用です。というのも、`next/link` は自動的にページをプリフェッチ周りの面倒をみてくれるからです。

> このAPI は、本番環境限定の機能です。開発環境ではページをプリフェッチしません。

```jsx
import Router from 'next/router';

Router.prefetch(url, as);
```

- `url` - `pages` ディレクトリに含まれる `page`へのパスです。
- `as` - `url` のオプションのデコレータであり、[動的ルート](/docs/routing/dynamic-routes) をプリフェッチするために用いられます。デフォルトでは `url`です。

#### 使い方

例えば。ログインページがあり、ログイン後にユーザーをダッシュボードにリダイレクトさせるとします。この場合、次のようより高速なページ遷移するために、ダッシュボードをプリフェッチできます:

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
      //　プリフェッチされたダッシュボードのページに、クライアント側で高速に遷移します。 
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

場合によっては ( 例えば、[カスタムサーバー](/docs/advanced-features/custom-server.md)を使用する場合 ) において、[popstate](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) をリッスンして、ルーターが実行される前に何かさせたい場合があります。

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
　
- `cb` - 入力された `popstate` イベントによって実行される関数です。この関数は、次の props をもつオブジェクトとしてイベントの状態を受け取ります。: 
  - `url`: `String` - 新しい state のためのルートです。この値は通常 `page` の名前です。
  - `as`: `String` - ブラウザに表示される URL です。
  - `options`: `Object` - [Router.push](#router.push) によって送信される追加オプションです。

もし、`beforePopState` に渡した関数が `false` を返す場合、`Router` は `popstate`を処理しません。その場合、`popstate` 自分の責任で操作することになります。[ファイルシステムのルーティングを無効化する](/docs/advanced-features/custom-server.md#disabling-file-system-routing) をご覧ください。

### Router.back

履歴を遡ります。ブラウザの戻るボタンをクリックするのと同じです。クリックすると `window.history.back()` が実行されます。

```jsx
import Router from 'next/router';

Router.back();
```

### Router.reload

現在の URL をリロードします。ブラウザの更新ボタンをクリックするのと同じです。クリックすると、`window.location.reload()` が実行されます。

```jsx
import Router from 'next/router';

Router.reload();
```

### Router.events

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-loading">ページ読み込みインディケータと一緒に利用する</a></li>
  </ul>
</details>

Router 内で発生する様々なイベントをリッスンできます。こちらがサポートされているイベントの一覧です。:

- `routeChangeStart(url)` - ルートの変更が開始した時に発火されます。
- `routeChangeComplete(url)` - ルートの変更が完了した時に発火されます。
- `routeChangeError(err, url)` - ルートの変更時にエラーが発生した際、あるいはルートのローディングが中止された際に発火されます。
  - `err.cancelled` - ページ遷移が中止されたかどうかを示します。
- `beforeHistoryChange(url)` -ブラウザーのヒストリーを変更する直前に発火します。 
- `hashChangeStart(url)` - ハッシュの変更されるものの、ページが変更されないときに発火します。
- `hashChangeComplete(url)` - ハッシュの変更が完了したものの、ページが変更されないときに発火します。

> ここでの  `url` は、ブラウザーで表示されている URL です。`Router.push(url, as)`(あるいは類似のメソッド)　を呼び出すと、`url` の値は `as` になります。

例えば、ルーターのイベント `routeChangeStart` をリッスンするには、次のようにしてください:

```jsx
import Router from 'next/router';

const handleRouteChange = url => {
  console.log('App is changing to: ', url);
};

Router.events.on('routeChangeStart', handleRouteChange);
```

そのイベントを呼び出したくないのであれば、`off`メソッドをつかってイベントの購読を解除してください。

```jsx
import Router from 'next/router';

Router.events.off('routeChangeStart', handleRouteChange);
```

ルートのローディング中にキャンセルされたら（例えば、２つのリンクを連続で高速にクリックしたとき）、`routeChangeError`が発火されます。そして、渡される `err` には以下の例のように、`true`がセットされた `cancelled`プロパティを含みます。

```jsx
import Router from 'next/router';

Router.events.on('routeChangeError', (err, url) => {
  if (err.cancelled) {
    console.log(`Route to ${url} was cancelled!`);
  }
});
```

コンポーネントがマウントされたとき([useEffect](https://reactjs.org/docs/hooks-effect.html) 、または [componentDidMount](https://reactjs.org/docs/react-component.html#componentdidmount) / [componentWillUnmount](https://reactjs.org/docs/react-component.html#componentwillunmount)　が実行されたとき)、あるいはイベントが発生した際、ルーターイベントは以下の例のように、imperatively に登録する必要があります。

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
