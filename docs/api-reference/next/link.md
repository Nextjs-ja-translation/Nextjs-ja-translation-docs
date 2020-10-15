---
description: 組み込みの Link コンポーネントを使用して、ルート間のクライアント側のトランジションを有効にします。
---

# next/link

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/hello-world">Hello World</a></li>
  </ul>
</details>

> 先に進む前に、まずは[ルーティング入門](/docs/routing/introduction.md)をお読みになることをお勧めします。

ルート間のクライアント側のトランジションは、`next/link` でエクスポートされた `Link` コンポーネントを介して有効にできます。

`/` と `/about` をリンクした例:

```jsx
import Link from 'next/link';

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
    </ul>
  );
}

export default Home;
```

`Link` は以下のような props を受け入れる:

- `href` - `pages` ディレクトリ内のパス。これは唯一必須のプロパティです。
- `as` - ブラウザの URL バーに表示されるパス。動的ルーティングに使用されます。
- [`passHref`](#子が-a-タグをラップするカスタムコンポーネントの場合) - `Link` が子に `href` プロパティを強制送信します。デフォルトは `false` です。
- `prefetch` - バックグラウンドでページをプリフェッチします。デフォルトは `true` です。ビューポート内にある `<Link />` はすべてプリロードされます (初期状態やスクロール中)。[静的生成](/docs/basic-features/data-fetching#getstaticprops-static-generation)を使用しているページでは、ページ遷移を高速化するためにデータと一緒に `JSON` ファイルがプリロードされます。
- [`replace`](#プッシュの代わりにURLを置換する) - スタックに新しい URL を追加する代わりに、現在の `history` の state を置き換えます。デフォルトは `false` です。
- [`scroll`](#ページ上部へのスクロールを無効にする) - ナビゲーションの後にページの先頭にスクロールします。デフォルトは `true` です。
- [`shallow`](/docs/routing/shallow-routing.md) - [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops-static-generation)、 [`getServerSideProps`](/docs/basic-features/data-fetching.md#getserversideprops-server-side-rendering)、 [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md) を再実行せずに現在のページのパスを更新します。デフォルトは `false` です。

外部 URL や `/pages` を使ったルートナビゲーションを必要としないリンクは、`Link` で処理する必要はありません; このような場合には、代わりにアンカータグを使用してください。

## 動的ルーティング

動的ルーティングへの `Link` は、`href` と `as` の props の組み合わせです。`pages/post/[pid].js` のページへのリンクは以下のようになります:

```jsx
<Link href="/post/[pid]" as="/post/abc">
  <a>First Post</a>
</Link>
```

`href` はページが使用するファイルシステムのパスであり、実行時に変更されるべきではありません。一方、 `as` は必要に応じてほとんどの場合動的に変化します。ここでは、リンクのリストを作成する方法の例を示します:

```jsx
const pids = ['id1', 'id2', 'id3'];
{
  pids.map(pid => (
    <Link href="/post/[pid]" as={`/post/${pid}`}>
      <a>Post {pid}</a>
    </Link>
  ));
}
```

## 子が `<a>` タグをラップするカスタムコンポーネントの場合

`Link` の子が `<a>` タグをラップするカスタムコンポーネントの場合は、`Link` に `passHref` を追加する必要があります。これは [styled-components](https://styled-components.com/) のようなライブラリを使用している場合は必要です。これがないと、`<a>` タグには `href` 属性が付与されず、サイトの SEO に悪影響を及ぼす可能性があります。

```jsx
import Link from 'next/link';
import styled from 'styled-components';

// これは、<a>タグをラップするカスタムコンポーネントを作成します
const RedLink = styled.a`
  color: red;
`;

function NavLink({ href, name }) {
  // リンクにpassHrefを追加する必要があります
  return (
    <Link href={href} passHref>
      <RedLink>{name}</RedLink>
    </Link>
  );
}

export default NavLink;
```

> **備考**: [emotion](https://emotion.sh/) の JSX pragma 機能(`@jsx jsx`)を使用している場合は、`<a>` タグを直接使用していても `passHref` を使用しなければなりません。

## 子が関数コンポーネントの場合

`Link` の子が関数コンポーネントの場合、`passHref` の使用に加えて、[`React.forwardRef`](https://reactjs.org/docs/react-api.html#reactforwardref) でコンポーネントをラップする必要があります:

```jsx
import Link from 'next/link';

// `onClick`, `href`, `ref` を適切に処理するためには
// DOM 要素に渡す必要があります
const MyButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      Click Me
    </a>
  );
});

function Home() {
  return (
    <Link href="/about" passHref>
      <MyButton />
    </Link>
  );
}

export default Home;
```

## URLオブジェクト

`Link` は URL オブジェクトを受け取ることもでき、それを自動的にフォーマットして URL 文字列を作成してくれます。その方法は以下の通りです:

```jsx
import Link from 'next/link';

function Home() {
  return (
    <div>
      <Link href={{ pathname: '/about', query: { name: 'test' } }}>
        <a>About us</a>
      </Link>
    </div>
  );
}

export default Home;
```

上記の例では、`/about?name=test` へのリンクになります。[Node.jsのURLモジュールのドキュメント](https://nodejs.org/api/url.html#url_url_strings_and_url_objects)で定義されているすべてのプロパティを使用できます。

## プッシュの代わりにURLを置換する

`Link` コンポーネントのデフォルトの挙動は、新しい URL を `history` スタックに `push` することです。以下の例のように、`replace` prop を使って新しいエントリを追加しないようにできます:

```jsx
<Link href="/about" replace>
  <a>About us</a>
</Link>
```

## `onClick` をサポートするコンポーネントを使う

`Link` は `onClick` イベントをサポートする任意のコンポーネントをサポートしますが、`<a>` タグを指定しない場合は、以下の例を考えてみましょう:

```jsx
<Link href="/about">
  <img src="/static/image.png" alt="image" />
</Link>
```

`Link` の子は `<a>` の代わりに `<img>` となります。`Link` は `onClick` プロパティを `<img>` に送りますが、`href` プロパティは渡しません。

## ページ上部へのスクロールを無効にする

`Link` のデフォルトの挙動はページの先頭までスクロールします。ハッシュが定義されている場合は、通常の `<a>` タグのように特定の id にスクロールします。ページのトップ / ハッシュへのスクロールを防ぐために、`Link` に `scroll={false}` を追加できます:

```jsx
<Link href="/?counter=10" scroll={false}>
  <a>Disables scrolling to the top</a>
</Link>
```
