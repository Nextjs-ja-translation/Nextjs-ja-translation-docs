---
description: Next.js はファイルシステムに沿った、独自の思想に基づくルーターがビルトインで導入されています。このページで学んでいきましょう。
---

# ルーティング

Next.js は[ページという概念](/docs/basic-features/pages.md)に基づいて、ファイルシステムに沿ったルーターを持っています。

`pages` ディレクトリにファイルが追加されたとき、ルートとして自動で使用可能になります。

`pages` ディレクトリ内のファイルは次の一般的なパターンで定義されます。

### インデックスルート

ルーターは `index` という名前のファイルをディレクトリのルートとしてルーティングします。

- `pages/index.js` → `/`
- `pages/blog/index.js` → `/blog`

### ネストされたルート

ルーターはネストされたファイルもサポートします。ネストされたフォルダ構造を作ると、内部に置かれたファイルも同じようにルーティングされます。

- `pages/blog/first-post.js` → `/blog/first-post`
- `pages/dashboard/settings/username.js` → `/dashboard/settings/username`

### 動的なルートのセグメント

動的なセグメントにマッチさせたければ角括弧（ブラケット）を使うことができます。パラメーターに名前を付けてマッチされられます。

- `pages/blog/[slug].js` → `/blog/:slug` (`/blog/hello-world`)
- `pages/[username]/settings.js` → `/:username/settings` (`/foo/settings`)
- `pages/post/[...all].js` → `/post/*` (`/post/2020/id/title`)

## ページ間をリンクする

Next.js のルーターは、シングルページアプリケーションのようにクライアントサイドでのページ間を遷移できます。

`Link` という React コンポーネントはクライアントサイドでの遷移を提供します。

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

[動的なパスセグメント](/docs/routing/dynamic-routes.md)でリンクするとき、ルータがどの JavaScript ファイルを読む込むのかを知るために `href` と `as` を渡す必要があります。

- `href` - `pages` ディレクトリ中のページの名前。例：`/blog/[slug]`.
- `as` - ブラウザに表示される URL. 例：`/blog/hello-world`.

```jsx
import Link from 'next/link';

function Home() {
  return (
    <ul>
      <li>
        <Link href="/blog/[slug]" as="/blog/hello-world">
          <a>To Hello World Blog post</a>
        </Link>
      </li>
    </ul>
  );
}

export default Home;
```

`as` プロパティも動的に生成できます。as プロパティでページを渡されたポストのリストを表示するときは次のようになります。

```jsx
function Home({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

## ルーターを注入する

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/dynamic-routing">動的なルーティング</a></li>
  </ul>
</details>

React コンポーネント内で [`router` オブジェクト](/docs/api-reference/next/router.md#router-object) にアクセスするには [`useRouter`]( /docs/api-reference/next/router.md#useRouter) もしくは [`withRouter`](/docs/api-reference/next/router.md#withRouter) を使うことができます。

一般的に [`useRouter`](/docs/api-reference/next/router.md#useRouter) を使うことをお勧めします。

## さらに学ぶ

ルーターは複数のパーツに分かれています。

<div class="card">
  <a href="/docs/api-reference/next/link.md">
    <b>next/link:</b>
    <small>クライアントサイドでの遷移を制御する</small>
  </a>
</div>

<div class="card">
  <a href="/docs/api-reference/next/router.md">
    <b>next/router:</b>
    <small>ページ内でルーター API を活用する</small>
  </a>
</div>
