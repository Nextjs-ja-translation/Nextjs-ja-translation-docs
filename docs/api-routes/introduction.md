---
description: Next.jsはAPIルートをサポートしており、Next.jsアプリから離れずにAPIを構築することができます。 どのように動作するか学んでいきましょう。
---

# API ルート

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/api-routes">基本的なAPI ルート</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/api-routes-middleware">ミドルウェアを用いたAPI ルート</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/api-routes-graphql">GraphQLを用いたAPI ルート</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/api-routes-rest">RESTを用いたAPI ルート</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/api-routes-cors">CORSを用いたAPI ルート</a></li>
  </ul>
</details>

API ルートは Next.js で**API**を構築する簡単な方法を提供しています。

`pages/api`フォルダ内にあるすべてのファイルは `/api/*` にマッピングされ、`page`の代わりに API エンドポイントとして扱われます。

例えば、以下の API ルート `pages/api/user.js` は `json` レスポンスを扱います:

```js
export default (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ name: 'John Doe' }));
};
```

API ルートを使用するためには、関数(**リクエストハンドラ**)をデフォルトとしてエクスポートする必要があり、この関数は以下の 2 つのパラメータを受け取ります:

- `req`: [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)のインスタンスと、[こちら](/docs/api-routes/api-middlewares.md)にある組み込みミドルウェア。
- `res`: [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)のインスタンスと、[こちら](/docs/api-routes/response-helpers.md)にあるヘルパー関数。

API ルートで異なる HTTP メソッドを処理するには、次のようにリクエストハンドラの `req.method` を使うことができます:

```js
export default (req, res) => {
  if (req.method === 'POST') {
    // POSTリクエストを処理します
  } else {
    // その他のHTTPメソッドを処理します
  }
};
```

API エンドポイントを取得するには、このセクションの最初にある例のどれかをご覧ください。

> API ルートは[CORSヘッダーを指定しません](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)。つまり、標準では**同一オリジンのみ**となります。[cors ミドルウェア](/docs/api-routes/api-middlewares.md#connectexpress-middleware-support)でリクエストハンドラをラップすることで挙動をカスタマイズすることができます。

> API ルートを使用しても、クライアントサイドのバンドルサイズが大きくなることはありません。これらはサーバーサイドのみのバンドルです。

## 関連事項

以下のセクションを次に読むことをお勧めします:

<div class="card">
  <a href="/docs/api-routes/api-middlewares.md">
    <b>API ミドルウェア:</b>
    <small>リクエストのための組み込みミドルウェアについて学ぶ。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/api-routes/response-helpers.md">
    <b>レスポンスヘルパー:</b>
    <small>レスポンスのための組み込みメソッドについて学ぶ。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/basic-features/typescript.md#api-routes">
    <b>TypeScript:</b>
    <small>API ルートにTypeScriptを追加する。</small>
  </a>
</div>
