---
description: API ルートは、受け取ったリクエストをパースするための組み込みミドルウェアを提供しています。ここで、詳しく学びましょう。
---

# API ミドルウェア

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/api-routes-middleware">ミドルウェアを用いた API ルート</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/api-routes-cors">CORS を用いた API ルート</a></li>
  </ul>
</details>

API ルートは、受け取ったリクエスト (`req`) をパースするための組み込みミドルウェアを提供しています。以下、それらのミドルウェアです:

- `req.cookies` - リクエストにより送られてきた Cookie が格納されているオブジェクトです。デフォルト値は `{}` です
- `req.query` - [クエリ文字列](https://en.wikipedia.org/wiki/Query_string)が格納されているオブジェクトです。デフォルト値は `{}` です
- `req.body` - `content-type` によりパースされたボディが格納されているオブジェクトです。ボディが含まれていなかった場合は `null` となります

## カスタム設定

次のように、すべての API ルートは `config` オブジェクトをエクスポートすることで、デフォルトの設定を変更できます:

```js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
};
```

`api` オブジェクトには API ルートで利用できるすべての設定が含まれます。

`bodyParser` はボディのパースを有効にできます。もし、`Stream` として利用したい場合は無効にもできます:

```js
export const config = {
  api: {
    bodyParser: false
  }
};
```

`bodyParser.sizeLimit` は、次のようにパースされたボディに対して [bytes](https://github.com/visionmedia/bytes.js) でサポートされている任意の形式を用いて許可する最大サイズのことです:

```js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb'
    }
  }
};
```

`externalResolver` はルーティングが _express_ や _connect_ のような外部リゾルバによって処理されていることをサーバーに伝える明示的なフラグです。このオプションを有効にすると、未解決のリクエストに対する警告を無効にできます。

```js
export const config = {
  api: {
    externalResolver: true
  }
};
```

## Connect/Express ミドルウェアのサポート

また、 [Connect](https://github.com/senchalabs/connect) と互換性のあるミドルウェアも利用できます。

例えば、[cors](https://www.npmjs.com/package/cors) パッケージを活用することで API エンドポイントに [CORS 設定](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS)をできます。

まず、`cors` をインストールします:

```bash
npm i cors
# または
yarn add cors
```

それでは、API ルートに `cors` を追加してみましょう:

```js
import Cors from 'cors';

// CORS のミドルウェアを初期化
const cors = Cors({
  methods: ['GET', 'HEAD']
});

// 後続の処理を行う前にミドルウェアの実行を待ち、
// また、ミドルウェアでエラーが発生したときエラーを投げるためのヘルパーメソッド
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  // ミドルウェアを実行する
  await runMiddleware(req, res, cors);
  // API ロジックの残り部分
  res.json({ message: 'Hello Everyone!' });
}

export default handler;
```

> 完成したアプリを見るには、[CORS を用いた API ルート](https://github.com/vercel/next.js/tree/canary/examples/api-routes-cors)の例を参照してください。
