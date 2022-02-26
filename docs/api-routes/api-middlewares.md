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

`bodyParser` is automatically enabled. If you want to consume the body as a `Stream` or with [`raw-body`](https://www.npmjs.com/package/raw-body), you can set this to `false`.

One use case for disabling the automatic `bodyParsing` is to allow you to verify the raw body of a **webhook** request, for example [from GitHub](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks#validating-payloads-from-github).

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

また、[Connect](https://github.com/senchalabs/connect) と互換性のあるミドルウェアも利用できます。

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

## Extending the `req`/`res` objects with TypeScript

For better type-safety, it is not recommended to extend the `req` and `res` objects. Instead, use functions to work with them:

```ts
// utils/cookies.ts
import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'
/**
 * This sets `cookie` using the `res` object
 */
type Options = {
  expires?: Date
  maxAge?: number
}
export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)
  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }
  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}
// pages/api/cookies.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Calling our pure function using the `res` object, it will add the `set-cookie` header
  setCookie(res, 'Next.js', 'api-middleware!')
  // Return the `set-cookie` header so we can display it in the browser and show that it works!
  res.end(res.getHeader('Set-Cookie'))
}
export default handler
```

If you can't avoid these objects from being extended, you have to create your own type to include the extra properties:

```ts
// pages/api/foo.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { withFoo } from 'external-lib-foo'
type NextApiRequestWithFoo = NextApiRequest & {
  foo: (bar: string) => void
}
const handler = (req: NextApiRequestWithFoo, res: NextApiResponse) => {
  req.foo('bar') // we can now use `req.foo` without type errors
  res.end('ok')
}
export default withFoo(handler)
```

Keep in mind this is not safe since the code will still compile even if you remove `withFoo()` from the export.
