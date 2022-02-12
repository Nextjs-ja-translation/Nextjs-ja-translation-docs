---
description: Next.js アプリケーションにおける認証のパターンについて説明し、いくつかの具体例を見ていきます。
---

# 認証

認証 (authentication) とは「ユーザーが何者であるか」を検証するものであり、一方で認可 (authorization) は「ユーザーがアクセスできるものは何か」を管理するものです。Next.js は複数の認証パターンをサポートしていて、それぞれが異なるユースケースのために設計されています。このページではそれらのユースケースについて紹介していきますので、自分の要件にしたがって適切な方法を選択できるでしょう。

## 認証パターン

どの認証パターンが必要か考えるときの最初のステップは、自分がどのような[データ取得](/docs/basic-features/data-fetching/overview.md)方法を取ろうとしているかについて正しく理解することです。それによって、そのデータ取得方法に適切な認証パターンはどれかを判断できます。データ取得方法というのは、主に以下の 2 種類に大別されます:

- [静的生成](/docs/basic-features/pages.md#static-generation-recommended)を利用して、読み込み中の状態をサーバーでレンダリングする方法。その後で、クライアント側でユーザーデータを取得する
- 認証前のコンテンツがフラッシュ (一瞬表示されること) するのを完全に防ぐために、[サーバーサイドで](/docs/basic-features/pages.md#server-side-rendering)ユーザーデータを取得する方法

### 静的生成されたページの認証

Next.js は、ブロッキングを伴うデータの取得がページに必要ではないとき、そのページが静的生成されたページであることを自動的に判定します。言い換えると、これは、ページに [`getServerSideProps`](/docs/basic-features/data-fetching/get-server-side-props.md) と `getInitialProps` が存在しないことを意味しています。その代わりに、ページは読み込み中の状態を表示し、その後、クライアントサイドでユーザーの取得が実行されます。

このパターンの利点の 1 つは、ページをグローバルな CDN から配信し、[`next/link`](/docs/api-reference/next/link.md) によってページの先読みができることです。これは、実用面では TTI ([Time to Interactive](https://web.dev/interactive/)) がより高速になるという効果に繋がります。

プロフィールページを例として見てみましょう。以下は、まず最初に読み込み中のスケルトン表示をレンダリングします。そして、ユーザーを取得するためのリクエストが完了した時点でユーザーの名前を表示します:

```jsx
// pages/profile.js

import useUser from '../lib/useUser'
import Layout from '../components/Layout'

const Profile = () => {
  // クライアントサイドでユーザーを取得する
  const { user } = useUser({ redirectTo: '/login' })

  // サーバーが読み込み中の状態をレンダリングする
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>
  }

  // ユーザー取得リクエストが完了したらユーザーを表示する
  return (
    <Layout>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  )
}

export default Profile
```

[実際に動作する例](https://iron-session-example.vercel.app/)でこれを確認できます。[`with-iron-session`](https://github.com/vercel/next.js/tree/canary/examples/with-iron-session) を見て、これがどのように動作しているかを確認してみてください。

### サーバーレンダリングされるページの認証

[`getServerSideProps`](/docs/basic-features/data-fetching/get-server-side-props.md) という `async` 関数をページで export すると、Next.js はリクエストのたびに、`getServerSideProps` が返すデータを使ってページをプリレンダリングします。

```jsx
export async function getServerSideProps(context) {
  return {
    props: {}, // props としてページコンポートネントに渡される
  }
}
```

先ほどのプロフィールページの例を[サーバーサイドレンダリング](/docs/basic-features/pages#server-side-rendering)を使うように書き換えてみましょう。もしセッションが有効であれば、`user` が props としてページの `Profile` コンポーネントに渡されます。[この例](https://iron-session-example.vercel.app/)のような読み込み中のスケルトン表示がないことに気づいたでしょうか。

```jsx
// pages/profile.js

import withSession from '../lib/session'
import Layout from '../components/Layout'

export const getServerSideProps = withSession(async function ({ req, res }) {
  const { user } = req.session

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
})

const Profile = ({ user }) => {
  // ユーザーを表示する。読み込み中の状態は不要
  return (
    <Layout>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  )
}

export default Profile
```

このパターンの利点は、認証前のコンテンツがリダイレクト前にフラッシュするのを防ぐことができる点です。ただ、`getServerSideProps` でユーザーデータを取得すると、認証プロバイダーがリクエストを完了するまでの間レンダリングがブロックされるということは認識しておくべきです。これがボトルネックとなってしまい、TTFB ([Time to First Byte](https://web.dev/time-to-first-byte/)) が増加してしまうことを避けるには、認証処理が高速に実行されることを確認しておかなければいけません。もしそうでないのであれば、[静的生成](#authenticating-statically-generated-pages)を検討してください。

## 認証プロバイダー

ここまで認証のパターンを見てきました。ここからは、具体的な認証プロバイダーと、Next.js でそれらを利用する方法について見ていきます。

### 自前のデータベースを利用する

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-iron-session">with-iron-session</a></li>
    <li><a href="https://github.com/nextauthjs/next-auth-example">next-auth-example</a></li>
  </ul>
</details>

ユーザーデータの格納された既存のデータベースがある場合は、特定のプロバイダーに依存しないオープンソースのソリューションを利用するのがよいでしょう。

- 低レベルで暗号化されたステートレスなセッションを扱いたいときは [`iron-session`](https://github.com/vercel/next.js/tree/canary/examples/with-iron-session) を利用する
- 組み込みのプロバイダー（Google、Facebook、GitHub...）、JWT、JWE、E メール/パスワード、マジックリンクなど、フル機能の認証システムが欲しいときには [`next-auth`](https://github.com/nextauthjs/next-auth-example) を利用する

どちらの認証パターンにも上記のライブラリは対応しています。もし、[Passport](http://www.passportjs.org/) に興味があれば、安全で暗号化された cookies を使用した例も用意しています:

- [with-passport](https://github.com/vercel/next.js/tree/canary/examples/with-passport)
- [with-passport-and-next-connect](https://github.com/vercel/next.js/tree/canary/examples/with-passport-and-next-connect)

### その他のプロバイダー

その他の認証プロバイダーを使った例については、[examples フォルダー](https://github.com/vercel/next.js/tree/canary/examples) を参照ください。

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-firebase-authentication">with-firebase-authentication</a></li>
    <li><a href="https://github.com/vercel/examples/tree/main/solutions/auth-with-ory">auth-with-ory</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-magic">with-magic</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/auth0">auth0</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-supabase-auth-realtime-db">with-supabase-auth-realtime-db</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-userbase">with-userbase</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-supertokens">with-supertokens</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-nhost-auth-realtime-graphql">with-nhost-auth-realtime-graphql</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-clerk">with-clerk</a></li>
  </ul>
</details>

## 関連事項

より理解を深めるために、次は以下のセクションに目を通すことをお勧めします。

<div class="card">
  <a href="/docs/basic-features/pages.md">
    <b>ページ:</b>
    <small>Next.js のページと異なるプリレンダリング方法についてより詳しく学びます</small>
  </a>
</div>

<div class="card">
  <a href="/docs/basic-features/data-fetching.md">
    <b>データ取得:</b>
    <small>Next.js でのデータ取得についてより詳しく学びます</small>
  </a>
</div>
