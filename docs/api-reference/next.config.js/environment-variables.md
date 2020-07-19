---
description: ビルド時に、Next.jsアプリケーションに環境変数を追加して使用する方法を学びます。
---

# 環境変数

> Next.js 9.4のリリース以降、[環境変数の追加](/docs/basic-features/environment-variables.md)がより直感的かつ人間工学に基づいて行えるようになりました。 試してみてください！

<details>
  <summary><b>使用例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-env-from-next-config-js">envのみ</a></li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-now-env">Nowとenv</a></li>
  </ul>
</details>

JavaScriptバンドルに環境変数を追加するには、`next.config.js`を開き、`env`の設定を追加します:

```js
module.exports = {
  env: {
    customKey: 'my-value'
  }
};
```

そうすると、`process.env.customKey`を使用できるようになります。 例:

```jsx
function Page() {
  return <h1>カスタムキーの値は: {process.env.customKey}</h1>;
}

export default Page;
```
Next.jsはビルド時に`process.env.customKey`を`'my-value'`に置き換えます。 Webpack [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)の性質上、`process.env` の変数を上書きしようとしてもうまくいきません。

例として、下記のような環境変数は:

```jsx
return <h1>カスタムキーの値は: {process.env.customKey}</h1>;
```

最終的にこうなります:

```jsx
return <h1>カスタムキーの値は: {'my-value'}</h1>;
```

## 関連

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.jsの紹介:</b>
    <small>Next.jsが使用する設定ファイルについて学ぶ。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/basic-features/environment-variables.md">
    <b>環境変数の組み込みサポート:</b>
    <small>環境変数の新しいサポート方法について学ぶ。</small>
  </a>
</div>
