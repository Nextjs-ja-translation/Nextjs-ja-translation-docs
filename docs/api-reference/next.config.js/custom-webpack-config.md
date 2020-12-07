---
description: Next.js で追加されたデフォルトの webpack の設定を拡張します。
---

# webpackの設定のカスタマイズ

よく聞かれる機能には、プラグインとして利用できるものがあります:

- [@zeit/next-sass](https://github.com/vercel/next-plugins/tree/master/packages/next-sass)
- [@zeit/next-less](https://github.com/vercel/next-plugins/tree/master/packages/next-less)
- [@zeit/next-stylus](https://github.com/vercel/next-plugins/tree/master/packages/next-stylus)
- [@zeit/next-preact](https://github.com/vercel/next-plugins/tree/master/packages/next-preact)
- [@next/mdx](https://github.com/vercel/next.js/tree/canary/packages/next-mdx)
- [@next/bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer)

`webpack` の使い方を拡張するために、このように `next.config.js` の中でその設定を拡張する関数を定義できます:

```js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 注意: 上記で webpack を提供しているので、それを `require` するべきではない
    // webpack の設定のカスタマイズを実行する
    // 重要: 変更された設定を返す
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return config;
  },
  webpackDevMiddleware: config => {
    // webpack dev middleware の設定のカスタマイズを実行する
    // 重要: 変更された設定を返す
    return config;
  }
};
```

> `webpack` 関数は、サーバーとクライアントで2回実行されます。これにより、`isServer` プロパティを用いてクライアントとサーバの設定を区別することができます。

`webpack` 関数の第二引数は以下のプロパティを持つオブジェクトです:

- `buildId`: `String` - ビルド間の一意の識別子として使用されるビルド ID
- `dev`: `Boolean` - コンパイルが開発中に行われるかどうかを示す
- `isServer`: `Boolean` - サーバーサイドのコンパイルでは `true`、クライアントサイドのコンパイルでは `false`
- `defaultLoaders`: `Object` - Next.js が内部で使用するデフォルトのローダー:
  - `babel`: `Object` - デフォルトの `babel-loader` の設定

`defaultLoaders.babel` の使い方の例:

```js
// babel-loader に依存するローダーを追加するための設定例
// このソースは @next/mdx プラグインのソースから取得された:
// https://github.com/vercel/next.js/tree/canary/packages/next-mdx
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: pluginOptions.options
        }
      ]
    });

    return config;
  }
};
```

## Related

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.jsの紹介:</b>
    <small>Next.jsが使用する設定ファイルの詳細はこちら.</small>
  </a>
</div>
