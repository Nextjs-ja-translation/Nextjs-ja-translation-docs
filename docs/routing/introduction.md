---
description: Next.js はファイルシステムに沿った、独自の思想に基づくルーターがビルトインで導入されています。このページで学んでいきましょう。
---

# ルーティング

Next.js は[ページという概念](/docs/basic-features/pages.md)に基づいて、ファイルシステムに沿ったルーターを持っています。

`pages` ディレクトリにファイルが追加されたとき、ルートとして自動で使用可能になります。

`pages` ディレクトリ内のファイルは次の一般的なパターンで定義されます。

#### インデックスルート

ルーターは `index` という名前のファイルをディレクトリのルートとしてルーティングします。

- `pages/index.js` → `/`
- `pages/blog/index.js` → `/blog`

#### ネストされたルート

ルーターはネストされたファイルもサポートします。ネストされたフォルダ構造を作ると、内部に置かれたファイルも同じようにルーティングされます。

- `pages/blog/first-post.js` → `/blog/first-post`
- `pages/dashboard/settings/username.js` → `/dashboard/settings/username`

#### 動的なルートのセグメント

動的なセグメントにマッチさせたければブラケット記法を使うことができます。名前をつけたパラメータとのマッチが可能です。

- `pages/blog/[slug].js` → `/blog/:slug` (`/blog/hello-world`)
- `pages/[username]/settings.js` → `/:username/settings` (`/foo/settings`)
- `pages/post/[...all].js` → `/post/*` (`/post/2020/id/title`)

> Check out the [Dynamic Routes documentation](/docs/routing/dynamic-routes.md) to learn more about how they work.

## ページ間をリンクする

Next.js のルーターは、シングルページアプリケーションのようにクライアントサイドでのページ間遷移が可能です。

このクライアントサイドでのページ遷移のために、`Link` という React コンポーネントが提供されています。

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

The example above uses multiple links. Each one maps a path (`href`) to a known page:

- `/` → `pages/index.js`
- `/about` → `pages/about.js`
- `/blog/hello-world` → `pages/blog/[slug].js`

Any `<Link />` in the viewport (initially or through scroll) will be prefetched by default (including the corresponding data) for pages using [Static Generation](/docs/basic-features/data-fetching/get-static-props.md). The corresponding data for [server-rendered](/docs/basic-features/data-fetching/get-server-side-props.md) routes is _not_ prefetched.

### Linking to dynamic paths

You can also use interpolation to create the path, which comes in handy for [dynamic route segments](#dynamic-route-segments). For example, to show a list of posts which have been passed to the component as a prop:

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

> [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) is used in the example to keep the path utf-8 compatible.

Alternatively, using a URL Object:

```jsx
import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },
            }}
          >
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
```

Now, instead of using interpolation to create the path, we use a URL object in `href` where:

- `pathname` is the name of the page in the `pages` directory. `/blog/[slug]` in this case.
- `query` is an object with the dynamic segment. `slug` in this case.

## ルーターを React コンポーネント内で使う

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/dynamic-routing">動的なルーティング</a></li>
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
