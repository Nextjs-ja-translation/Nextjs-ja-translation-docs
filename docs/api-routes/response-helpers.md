---
description: APIルートには、レスポンスのためのExpress.jsライクなメソッドが用意されており、新しいAPIエンドポイントの作成に役立ちます。どのように動作するか学んでいきましょう。
---

# レスポンスヘルパー

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/api-routes">基本的なAPIルート</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/api-routes-rest">RESTによるAPIルート</a></li>
  </ul>
</details>

レスポンス (`res`) には、Express.jsライクなメソッドのセットが用意されています。これらは、より良い開発者体験を提供し、より手早くAPIエンドポイントを作成できます。次の例を見てみましょう:

```js
export default (req, res) => {
  res.status(200).json({ name: 'Next.js' });
};
```

用意されているメソッドは以下の通りです:

- `res.status(code)` -  ステータスコードを設定するための関数です。 `code` は正しい[HTTPステータスコード](https://ja.wikipedia.org/wiki/HTTP%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89)である必要があります。
- `res.json(json)` - JSONレスポンスを送信します。`json` は正しい JSON オブジェクトである必要があります。
- `res.send(body)` - HTTPレスポンスを送信します。 `body` は `string` か `object` 、または `Buffer` である必要があります。
