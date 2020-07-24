---
description: ページに使用される動的ルーティングはAPIのルーティングにおいても使用できます。ここでは、それがどのように機能するかを学びます。
---

# 動的APIルーティング

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/api-routes">基本的なAPIのルーティング</a></li>
  </ul>
</details>

APIのルーティングは[動的ルーティング](/docs/routing/dynamic-routes.md)をサポートし、`pages`に使用されるものと同じファイル命名規則に従います。

例えば、APIルート`pages/api/post/[pid].js`に以下のコードがあるとします:

```js
export default (req, res) => {
  const {
    query: { pid },
  } = req

  res.end(`Post: ${pid}`)
}
```

このとき、`/api/post/abc`へのリクエストは`Post: abc`というテキストを返します。 

### インデックスのルーティングと動的APIルーティング

ごく一般的なRESTfulパターンは、次のようなルートを設定します:

- `GET api/posts/` - 投稿の一覧を取得します。おそらくページネーションがあります。
- `GET api/posts/12345` - 投稿ID 12345 を取得します。

これは2つの方法でモデル化できます:

- オプション 1:
  - `/api/posts.js`
  - `/api/posts/[postId].js`
- オプション 2:

  - `/api/posts/index.js`
  - `/api/posts/[postId].js`

どちらも同等です。3つ目のオプションとして`/api/posts/[postId].js`のみを使うことは正しくありません。なぜなら、どんな状況でも動的ルーティング（すべてのルートのキャッチを含む-下記を参照）には`未定義`な状態はなく、`GET api/posts/`は`/api/posts/[postId].js`に一致しないためです。

### すべてのAPIルートをキャッチ

角括弧`[]`内に3つのドット（`...`）を追加することで、APIルートを拡張してすべてのパスをキャッチできます。例えば:

- `pages/api/post/[...slug].js`は`/api/post/a`に一致しますが、`/api/post/a/b`、`/api/post/a/b/c`などにも一致します。

> **備考**: `slug`以外の名前も使用できます。例えば: `[...param]`

一致したパラメータはクエリパラメータ（例では`slug`）としてページに送信され、常に配列になり、パス`/api/post/a`は次の`query`オブジェクトを持ちます:

```json
{ "slug": ["a"] }
```

そして、`/api/post/a/b`やその他の一致するパスである場合、次のように新しいパラメータが配列に追加されます:

```json
{ "slug": ["a", "b"] }
```

`pages/api/post/[...slug].js`のAPIルートは、次のようになります:

```js
export default (req, res） => {
  const {
    query: { slug },
  } = req

  res.end(`Post: ${slug.join(', ')}`)
}
```

このとき、`/api/post/a/b/c`へのリクエストは次のテキストを返します: `Post: a, b, c`

### オプショナルにすべてのAPIルートをキャッチ

すべてのルートをキャッチすることは、`[[...slug]]`のようにパラメータを二重角括弧内に含めることでオプショナルにできます。

例えば、`pages/api/post/[[...slug]].js`は`/api/post`、`/api/post/a`、`/api/post/a/b`などにマッチします。

`query`オブジェクトは次のようになります:

```json
{ } // GET `/api/post` (空のオブジェクト)
{ "slug": ["a"] } // `GET /api/post/a` (要素が1つの配列)
{ "slug": ["a", "b"] } // `GET /api/post/a/b` (要素が複数の配列)
```

## 注意事項

- 予め定義されたAPIのルーティングは動的APIルーティングよりも優先され、動的APIルーティングはすべてのAPIルートのキャッチよりも優先されます。次の例を見てください:
  - `pages/api/post/create.js` - `/api/post/create`に一致します
  - `pages/api/post/[pid].js` - `/api/post/1`、`/api/post/abc`などに一致します。しかし、`/api/post/create`には一致しません。
  - `pages/api/post/[...slug].js` - `/api/post/1/2`、`/api/post/a/b/c`などにマッチします。しかし、`/api/post/create`、`/api/post/abc`などには一致しません。

## 関連

さらに詳細については、以下のセクションをお勧めします:

<div class="card">
  <a href="/docs/routing/dynamic-routes.md">
    <b>動的ルーティング:</b>
    <small>ビルトインされた動的ルーティングについて学びましょう。</small>
  </a>
</div>
