---
description: カスタムサーバーを使用してプログラム上で Next.js アプリを起動します。
---

# カスタムサーバー

<details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/custom-server">Basic custom server</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/custom-server-express">Express integration</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/custom-server-hapi">Hapi integration</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/custom-server-koa">Koa integration</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/ssr-caching">SSR Caching</a></li>
  </ul>
</details>

通常、next サーバーは `next start` で起動します。しかしながら、カスタムしたルーティングパターンを使用するために、100％ プログラム上での起動が可能です。

> カスタムサーバーの使用を決定する前に、Next.js の統合ルーターがアプリの要件を満たせない場合にのみ使用すべきことを気に留めてください。カスタムサーバーでは、**サーバーレス関数**や **[Automatic Static Optimization](/docs/advanced-features/automatic-static-optimization.md).** などの重要なパフォーマンス最適化が削除されます。

次のカスタムサーバーの例を見てください:

```js
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // `url.parse` の2番目の引数として必ず `true` を渡してください。
    // これは、URLのクエリ部分を解析するように指示します。
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      app.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

> `server.js` は babel や webpack を経由しません。このファイルに必要な構文とソースが、現在実行中の node バージョンと互換性があることを確認してください。

次に、カスタムサーバーを実行するには、このように、`package.json` の `scripts` を更新する必要があります:

```json
"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
}
```

---

カスタムサーバーは、次のようにインポートして、サーバーを Next.js アプリケーションに接続します:

```js
const next = require('next');
const app = next({});
```

上記の `next` インポートは、次のオプションを持つオブジェクトを受け取る関数です:

- `dev`: `Boolean` - Next.js を開発モードで起動するか。デフォルトは `false` です
- `dir`: `String` - Next.js プロジェクトの場所。デフォルトは `'.'`です
- `quiet`: `Boolean` - サーバー情報を含むエラーメッセージを非表示にします。デフォルトは `false` です
- `conf`: `object` - [next.config.js](/docs/api-reference/next.config.js/introduction.md) で使用するのと同じオブジェクト。デフォルトは `{}` です

返された `app` を使用して、必要に応じて Next.js でリクエストを処理できます。

## ファイルシステムルーティングの無効化

デフォルトでは、`Next` はファイル名と一致するパス名の下の `pages` フォルダー内の各ファイルを提供します。プロジェクトでカスタムサーバーを使用する場合、この挙動で同じコンテンツが複数のパスから提供される恐れがあり、SEO と UX に問題を起こす可能性があります。

この動作を無効にし、 `pages` 内のファイルに基づくルーティングを防ぐには、 `next.config.js` を開いて `useFileSystemPublicRoutes` 設定を無効にします:

```js
module.exports = {
  useFileSystemPublicRoutes: false
};
```

> `useFileSystemPublicRoutes`は SSR のファイル名ルートのみを無効にすることに注意してください。クライアント側のルーティングは、これらのパスに引き続きアクセスできます。このオプションを使用する場合は、プログラム上で不要なルートへのナビゲーションを防ぐ必要があります。

> クライアント側ルーターを構成して、ファイル名ルートへのクライアント側リダイレクトを禁止することもできます。これについては、[`Router.beforePopState`](/docs/api-reference/next/router.md#router.beforePopState) を参照してください。
