---
description: 浅いルーティングを利用することで、新しいページの変更をトリガーせずにURLを変更できます。このページで学びましょう。
---

# 浅いルーティング

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-shallow-routing">浅いルーティング</a></li>
  </ul>
</details>

浅いルーティングにより、 [`getServerSideProps`](/docs/basic-features/data-fetching.md#getserversideprops-server-side-rendering), [`getStaticProps`](/docs/basic-features/data-fetching.md#getstaticprops-static-generation), そして [`getInitialProps`](/docs/api-reference/data-fetching/getInitialProps.md)を含むデータフェッチメソッドを再度実行せずに URL を変更できます。
 
更新された ` pathname` と `query` は、状態を失うことなく  [`router` オブジェクト](/docs/api-reference/next/router.md#router-object)( [`useRouter`](/docs/api-reference/next/router.md#useRouter) や [`withRouter`](/docs/api-reference/next/router.md#withRouter)によって追加されたもの)を介して受け取ることができます。

浅いルーティングを有効にするには、 `shallow` オプションを `true`に設定します。以下を例に考えてみましょう:

```jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// 現在のURLは '/'
function Page() {
  const router = useRouter();

  useEffect(() => {
    // 最初のレンダリング後は常にナビゲーションを行います
    router.push('/?counter=10', undefined, { shallow: true });
  }, []);

  useEffect(() => {
    // カウンターが変わりました！
  }, [router.query.counter]);
}

export default Page;
```

ルーターオブジェクトをページに追加する必要がない場合は、以下のように [Router API](/docs/api-reference/next/router.md#router-api) に直接使うこともできます:

```jsx
import Router from 'next/router';
// ページ内
Router.push('/?counter=10', undefined, { shallow: true });
```

ページが置き換えられないまま、URL は `/?counter=10` に更新されます。 ルートの状態のみ変更されます。

以下に示すように、 [`componentDidUpdate`](https://reactjs.org/docs/react-component.html#componentdidupdate) を介して URL の変更を監視もできます:

```jsx
componentDidUpdate(prevProps) {
  const { pathname, query } = this.props.router
  // 無限ループを回避するために props が変更されたことを確認します
  if (query.counter !== prevProps.router.query.counter) {
    // 新しい query に基づいてデータを取得する
  }
}
```

## 注意事項

浅いルーティングは同じページの URL の変更に対して**のみ**機能します。例えば、 `pages / about.js`という別のページがあり、これを実行するとします:

```jsx
Router.push('/?counter=10', '/about?counter=10', { shallow: true });
```

これは新しいページなので、浅いルーティングを設定していても現在のページを破棄し、新しいページを読み込みデータの取得を待ちます。
