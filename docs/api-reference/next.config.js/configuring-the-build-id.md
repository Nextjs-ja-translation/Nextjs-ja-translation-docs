---
description: ビルド ID を設定してみましょう。これは、アプリケーションが提供されている現在のビルドを識別するために使用されます。
---

# ビルド ID の設定

Next.js では、ビルド時に生成される一定の識別子を利用して、提供されているアプリケーションのバージョンを識別します。  
これによって、それぞれのサーバーで `next build` が行われるような場合、複数サーバーのデプロイに問題を生じる可能性があります。  
そこで、ビルド間で静的なビルド ID を維持するために、独自のビルド ID を提供できます。

`next.config.js` を開いて `generateBuildId` という関数を追加してみましょう:

```js
module.exports = {
  generateBuildId: async () => {
    // 例えば、ここで最新のコミットハッシュを取得することができます
    return 'my-build-id';
  }
};
```

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の紹介:</b>
    <small>Next.js が使用する設定ファイルについてさらに学びましょう。</small>
  </a>
</div>
