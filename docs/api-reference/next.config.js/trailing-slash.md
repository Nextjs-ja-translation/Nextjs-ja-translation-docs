---
description: トレイリングスラッシュで Next.js のページを解決できるように設定します。
---

# トレイリングスラッシュ

> この機能は [Next.js 9.5](https://nextjs.org/blog/next-9-5) で導入されました。古いバージョンの Next.js をお使いの場合は、アップグレードしてお試しください。

Next.js では、末尾にスラッシュが付いている URL から、末尾にスラッシュが付いていない URL にデフォルトでリダイレクトします。例えば、 `/about/` は `/about` にリダイレクトされます。この動作を逆に設定し、URL の末尾にスラッシュがない場合は、末尾にスラッシュがある URL にリダイレクトさせることもできます。

`next.config.js` を開き、 `trailingSlash` の設定を追加してください:

```js
module.exports = {
  trailingSlash: true,
}
```

このオプションの設定を追加すると、 `/about` のような URL は `/about/` へリダイレクトされるようなります。


## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の紹介:</b>
    <small>Next.js の設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>
