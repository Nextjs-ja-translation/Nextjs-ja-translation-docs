---
description: クライアント側のナビゲーションは、Link コンポーネントの代わりに Next.js の Router を使用することができます。このページで学んでいきましょう。
---

# Imperatively

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/using-router">Router を使用する</a></li>
  </ul>
</details>

[`next/link`](/docs/api-reference/next/link.md) は必要なルーティングをほとんどカバーできるはずですが、 使用せずにクライアントサイドのナビゲーションを行うこともできます。詳しくは [`next/router` のドキュメント](/docs/api-reference/next/router.md#router-api)を参照してください。

以下の例が `useRouter` を使った基本的なページ遷移の方法です:

```jsx
import { useRouter } from 'next/router'

export default function ReadMore() {
  const router = useRouter()

  return (
    <button onClick={() => router.push('/about')}>
      Click here to read more
    </button>
  )
}
```
