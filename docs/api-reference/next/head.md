---
description: ビルトインのヘッドコンポーネントを用いてページの `head` にカスタム要素を追加します。
---

# next/head

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/head-elements">ヘッド要素</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/layout-component">レイアウトコンポーネント</a></li>
  </ul>
</details>

Next.js はページの `head` に要素を追加するためのビルトインコンポーネントを公開しています。

```jsx
import Head from 'next/head';

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Hello world!</p>
    </div>
  );
}

export default IndexPage;
```

`head` 内でのタグの重複を避けるため、次の例のような `key` プロパティを利用できます。これにより、タグが 1 度だけレンダリングされるようになります。

```jsx
import Head from 'next/head';

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <p>Hello world!</p>
    </div>
  );
}

export default IndexPage;
```

この場合、 2 番目の `<meta property="og:title" />` のみがレンダリングされます。name 属性が重複する `meta` タグは自動的に処理されます。

> コンポーネントがアンマウントされた際、 `head` の内容は削除されます。そのため、他のページで追加したものは考慮せず、各ページの `head` に必要なものを完全に定義できているか確認してください。

`title` 、 `meta` やその他の要素（`script` など）は `Head` 要素の**直下**の子要素として含まれているか、
`<React.Fragment>` や配列の単一階層にラップされている必要があります。そうでなければ、タグはクライアント側のナビゲーションで正しく取得されません。
