---
description: クライアント側のナビゲーションは、Link コンポーネントの代わりに Router API を使用することができます。このページで学んでいきましょう。
---

# Router APIの命令

<details>
  <summary><b>サンプル</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/using-router">Routerを使用する</a></li>
  </ul>
</details>

[`next/link`](/docs/api-reference/next/link.md) は必要なルーティングをほとんどカバーできるはずですが、 使用せずにクライアントサイドのナビゲーションを行うこともできます。詳しくは [Router API ドキュメント](/docs/api-reference/next/router.md#router-api)を参照してください。

Router APIの基本的な使用例です:

```jsx
import Router from 'next/router';

function ReadMore() {
  return (
    <div>
      Click <span onClick={() => Router.push('/about')}>here</span> to read more
    </div>
  );
}

export default ReadMore;
```
