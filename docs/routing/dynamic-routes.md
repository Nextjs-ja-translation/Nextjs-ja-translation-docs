---
description: 動的なルーティングを用いてページのURLにカスタムパラメータを追加できます。動的なルーティングをつくり、詳しくみていきましょう。
---

# 動的なルーティング

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/dynamic-routing">Dynamic Routing</a></li>
  </ul>
</details>

複雑なアプリケーションでは、予め定義されたパスを用いてルートを定義するだけでは不十分な場合があります。Next.js では `[param]` のようにしてページ名に角括弧(ブラケット)を使うことで動的なルーティング(別名 slug や pretty url など)を作成できます。

`pages/post/[pid].js` というページが以下の内容であるとします:

```jsx
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Post: {pid}</p>;
};

export default Post;
```

 このとき、`/post/1` や `/post/abc` などのルートは `pages/post/[pid].js` にマッチします。そして、マッチしたパスのパラメータはクエリパラメータとしてページに送られ、他のクエリパラメータと統合されます。

例えば、`/post/abc` というルートは以下の `query` オブジェクトを持ちます:

```json
{ "pid": "abc" }
```

同様に、`/post/abc?foo=bar` というルートは以下の `query` オブジェクトを持ちます:

```json
{ "foo": "bar", "pid": "abc" }
```

しかし、ルートパラメータは同じ名前のクエリパラメータを上書きします。例えば `/post/abc?pid=123` というルートは以下の `query` オブジェクトを持ちます:

```json
{ "pid": "abc" }
```

複数の動的なルートセグメントがあるときも同様に機能します。例えば `pages/post/[pid]/[comment].js` は `/post/abc/a-comment` のルートにマッチし `query` オブジェクトは以下のようになります:

```json
{ "pid": "abc", "comment": "a-comment" }
```

動的ルーティングへのクライアント側のナビゲーションは [`next/link`](/docs/api-reference/next/link.md#dynamic-routes) で処理できます。

### すべてのルートを受け取る

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/catch-all-routes">Catch All Routes</a></li>
  </ul>
</details>

動的ルーティングは角括弧(ブラケット)のなかに 3 つのドット `...` を使うことで、すべてのパスを受け取ることができるようになります。例えば以下のようになります:

- `pages/post/[...slug].js` は `/post/a` にマッチしますが、`/post/a/b` や `/post/a/b/c` などにも同様にマッチします。

> **備考**: `[...param]`のように `slug` 以外の名前も使うことができます。

マッチしたパラメータはクエリパラメータ(例では `slug`)としてページに常に配列として送られ `/post/a` は以下の `query` オブジェクトを持ちます:

```json
{ "slug": ["a"] }
```

また `/post/a/b` など、その他にマッチするパスがある場合は、以下のように新しいパラメータが配列に追加されます。

```json
{ "slug": ["a", "b"] }
```

> すべてのルートを受け取る良い例はNext.jsのdocsです。 [pages/docs/[...slug].js](https://github.com/zeit/next-site/blob/master/pages/docs/%5B...slug%5D.js) という1つのページが、現在見ているdocsをすべて処理しています。

### オプショナルにすべてのルートを受け取る

すべてのルートをキャッチすることは、`[[...slug]]`のようにパラメータを二重括弧内に含めることでオプショナルにできます。

例えば、`pages/post/[[...slug]].js` は `/post`, `/post/a`, `/post/a/b`, などにマッチします。

その時 `query` は以下のようになります:

```json
{ } // GET `/post` (空オブジェクト)
{ "slug": ["a"] } // `GET /post/a` (単一要素の配列)
{ "slug": ["a", "b"] } // `GET /post/a/b` (複数要素の配列)
```

## 注意事項

- 予め定義されたルートは動的ルーティングよりも優先され、動的ルーティングはすべてのルートを受け取りよりも優先されます。以下の例をみてください:
  - `pages/post/create.js` は  `/post/create`　にマッチします。
  - `pages/post/[pid].js` は  `/post/1`　や `/post/abc` 　にマッチしますが、 `/post/create` にはマッチしません。
  - `pages/post/[...slug].js` は `/post/1/2`　や `/post/a/b/c`にマッチしますが、 `/post/create`, `/post/abc`などにはマッチしません。
- [Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md)によって静的に最適化されたページはルートパラメータが指定されていない状態でハイドレートされます。つまり、`query` は `{}`のように空オブジェクトになります。

  ハイドレート後に Next.js はアプリケーションの更新をトリガーにして、 `query` オブジェクトにルートパラメータを提供します。
