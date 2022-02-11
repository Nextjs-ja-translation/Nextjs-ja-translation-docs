---
description: AMPコミュニティのコンポーネントを追加して、よりインタラクティブなAMPページを作成します。
---

# AMPコンポーネントの追加

AMP コミュニティは、よりインタラクティブな AMP ページを作成するのに役立つ [たくさんのコンポーネント](https://amp.dev/documentation/components/) を提供しています。 Next.js はページで使用されるすべてのコンポーネントを自動的にインポートするので、AMP コンポーネントのスクリプトを手動でインポートする必要はありません:

```jsx
export const config = { amp: true };

function MyAmpPage() {
  const date = new Date();

  return (
    <div>
      <p>Some time: {date.toJSON()}</p>
      <amp-timeago width="0" height="15" datetime={date.toJSON()} layout="responsive">
        .
      </amp-timeago>
    </div>
  );
}

export default MyAmpPage;
```

上記の例では、 [`amp-timeago`](https://amp.dev/documentation/components/amp-timeago/?format=websites) コンポーネントを使用しています。

デフォルトでは、最新バージョンのコンポーネントが常にインポートされます。バージョンをカスタマイズしたい場合は、次の例のように `next/head` を使用して下さい:

```jsx
import Head from 'next/head';

export const config = { amp: true };

function MyAmpPage() {
  const date = new Date();

  return (
    <div>
      <Head>
        <script
          async
          key="amp-timeago"
          custom-element="amp-timeago"
          src="https://cdn.ampproject.org/v0/amp-timeago-0.1.js"
        />
      </Head>

      <p>Some time: {date.toJSON()}</p>
      <amp-timeago
        width="0"
        height="15"
        datetime={date.toJSON()}
        layout="responsive"
      >
        .
      </amp-timeago>
    </div>
  );
}

export default MyAmpPage;
```
