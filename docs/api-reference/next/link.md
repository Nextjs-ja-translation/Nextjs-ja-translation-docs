---
description: 組み込みの Link コンポーネントを使用して、ルート間のクライアント側のトランジションを有効にします。
---

# next/link

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/hello-world">Hello World</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/active-class-name">Active className on Link</a></li>
  </ul>
</details>

> 先に進む前に、まずは[ルーティング入門](/docs/routing/introduction.md)をお読みになることをお勧めします。

ルート間のクライアント側のトランジションは、`next/link` でエクスポートされた `Link` コンポーネントを介して有効にできます。

例として、以下のファイルを含む `pages` ディレクトリを考えてみましょう:

- `pages/index.js`
- `pages/about.js`
- `pages/blog/[slug].js`

以下のようにして、それぞれのページに対してリンクを設定できます:

```jsx
import Link from 'next/link'

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
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
```

`Link` は以下の props を受け入れます:

- `href` - 遷移したい先のパスまたは URL です。これは唯一必須のプロパティです。
- `as` - ブラウザの URL バーに表示される、パスのオプショナルなデコレーターです。Next.js 9.5.3 以前は動的ルーティングに使用されていました。以前のバージョンでどのように動作していたかを知りたい場合は[過去のドキュメント](https://nextjs.org/docs/tag/v9.5.2/api-reference/next/link#dynamic-routes)をご確認ください。備考: このパスが `href` で与えられるパスと異なる場合は、以前の `href`/`as` の挙動になります。詳細は[過去のドキュメント](https://nextjs.org/docs/tag/v9.5.2/api-reference/next/link#dynamic-routes)に記載があります。
- [`passHref`](#子が-a-タグをラップするカスタムコンポーネントの場合) - `Link` が子に `href` プロパティを強制送信します。デフォルトは `false` です。
- `prefetch` - バックグラウンドでページをプリフェッチします。デフォルトは `true` です。ビューポート内にある `<Link />` はすべてプリロードされます (初期状態やスクロール中)。`prefetch={false}` を渡すことでプリフェッチは無効になります。`prefetch` が `false` に設定されている場合でも、ホバー時にはプリフェッチが行われます。[静的生成](/docs/basic-features/data-fetching#getstaticprops-static-generation)を使用しているページでは、ページ遷移を高速化するためにデータと一緒に `JSON` ファイルがプリロードされます。プリフェッチは本番環境でのみ有効です。
- [`replace`](#プッシュの代わりにURLを置換する) - スタックに新しい URL を追加する代わりに、現在の `history` の state を置き換えます。デフォルトは `false` です。
- [`scroll`](#ページ上部へのスクロールを無効にする) - ナビゲーションの後にページの先頭にスクロールします。デフォルトは `true` です。
- [`shallow`](/docs/routing/shallow-routing.md) - [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops-static-generation)、 [`getServerSideProps`](/docs/basic-features/data-fetching.md#getserversideprops-server-side-rendering)、 [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md) を再実行せずに現在のページのパスを更新します。デフォルトは `false` です。
- `locale` - アクティブなロケールが自動的に先頭に追加されます。`locale` を設定することで異なるロケールを指定できます。`false` の場合は、デフォルトの動作が無効であるため `href` にロケールを含める必要があります。

## ルーティングに動的なセグメントが含まれる場合

Next.js 9.5.3 以降では（古いバージョンについては[過去のドキュメント](https://nextjs.org/docs/tag/v9.5.2/api-reference/next/link#dynamic-routes)をご確認ください）、何もせずとも[動的ルーティング](/docs/routing/dynamic-routes.md)（[すべてのルートを受け取る](/docs/routing/dynamic-routes.md#catch-all-routes)場合を含めて）へのリンクを設定できます。しかし、[補間](/docs/routing/introduction.md#linking-to-dynamic-paths) や [URL オブジェクト](#with-url-object)を用いてリンクを生成することが非常に一般的で便利な状況も存在します。

たとえば、 `pages/blog/[slug].js` という動的ルーティングは以下のリンクにマッチします:

```jsx
import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
```

## 子が `<a>` タグをラップするカスタムコンポーネントの場合

`Link` の子が `<a>` タグをラップするカスタムコンポーネントの場合は、`Link` に `passHref` を追加する必要があります。これは [styled-components](https://styled-components.com/) のようなライブラリを使用している場合は必要です。これがないと、`<a>` タグには `href` 属性が付与されず、サイトのアクセシビリティを損ない、SEO に悪影響を及ぼす可能性があります。[ESLint](/docs/basic-features/eslint.md#eslint-plugin) を使っている場合は、`passHref` の正しく使用するための `next/link-passhref` という組み込みのルールがあります。

```jsx
import Link from 'next/link'
import styled from 'styled-components'

// これは、<a> タグをラップするカスタムコンポーネントを作成します
const RedLink = styled.a`
  color: red;
`

function NavLink({ href, name }) {
  // リンクに passHref を追加する必要があります
  return (
    <Link href={href} passHref>
      <RedLink>{name}</RedLink>
    </Link>
  )
}

export default NavLink
```

- [emotion](https://emotion.sh/) の JSX pragma 機能(`@jsx jsx`)を使用している場合は、`<a>` タグを直接使用していても `passHref` を使用しなければなりません。
- ページ遷移を正しくトリガーするために、コンポーネントは `onClick` 属性をサポートする必要があります。

## 子が関数コンポーネントの場合

`Link` の子が関数コンポーネントの場合、`passHref` の使用に加えて、[`React.forwardRef`](https://ja.reactjs.org/docs/react-api.html#reactforwardref) でコンポーネントをラップする必要があります:

```jsx
import Link from 'next/link'

// `onClick`, `href`, `ref` を適切に処理するためには
// DOM 要素に渡す必要があります
const MyButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      Click Me
    </a>
  )
})

function Home() {
  return (
    <Link href="/about" passHref>
      <MyButton />
    </Link>
  )
}

export default Home
```

## URL オブジェクト

`Link` は URL オブジェクトを受け取ることもでき、それを自動的にフォーマットして URL 文字列を作成してくれます。その方法は以下の通りです:

```jsx
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link
          href={{
            pathname: '/about',
            query: { name: 'test' },
          }}
        >
          <a>About us</a>
        </Link>
      </li>
      <li>
        <Link
          href={{
            pathname: '/blog/[slug]',
            query: { slug: 'my-post' },
          }}
        >
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
```

上記の例には以下へのリンクが含まれています:

- 事前に定められたルーティング: `/about?name=test`
- [動的ルーティング](/docs/routing/dynamic-routes.md): `/blog/my-post`

[Node.js の URL モジュールのドキュメント](https://nodejs.org/api/url.html#url_url_strings_and_url_objects)で定義されているすべてのプロパティを使用できます。

## プッシュの代わりに URL を置換する

`Link` コンポーネントのデフォルトの挙動は、新しい URL を `history` スタックに `push` することです。以下の例のように、`replace` prop を使って新しいエントリを追加しないようにできます:

```jsx
<Link href="/about" replace>
  <a>About us</a>
</Link>
```

## ページ上部へのスクロールを無効にする

`Link` のデフォルトの挙動はページの先頭までスクロールします。ハッシュが定義されている場合は、通常の `<a>` タグのように特定の id にスクロールします。ページのトップ / ハッシュへのスクロールを防ぐために、`Link` に `scroll={false}` を追加できます:

```jsx
<Link href="/?counter=10" scroll={false}>
  <a>Disables scrolling to the top</a>
</Link>
```
