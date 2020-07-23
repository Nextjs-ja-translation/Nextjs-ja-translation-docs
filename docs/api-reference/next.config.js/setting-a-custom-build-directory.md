---
description: デフォルトの.nextディレクトリの代わりに使用する、カスタムビルドディレクトリの設定をします。
---

# カスタムビルドディレクトリの設定

`.next` の代わりに使用する、カスタムビルドディレクトリの名前を指定できます。

`next.config.js` に `distDir` の設定を追記します :

```js
module.exports = {
  distDir: 'build'
};
```

上記の設定で `next build` を実行すると、 Next.js はデフォルトの `.next` フォルダの代わりに `build` フォルダを使用します。

> `distDir` はプロジェクトのディレクトリから離れ**ないで**下さい。 例えば、 `../build` は**無効な**ディレクトリです。

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js入門:</b>
    <small>Next.jsの設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>
