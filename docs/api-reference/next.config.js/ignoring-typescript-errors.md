---
description: Next.js はデフォルトで TypeScript のエラーを報告します。 この動作を止めるにはこちらをご覧ください。
---

# TypeScript のエラーを無視する

あなたのプロジェクトに TypeScript エラーが存在するとき、Next.js は **本番のビルド** (`next build`) に失敗します。

アプリケーションにエラーがある場合でも Next.js で危険なプロダクションコードを生成したいのであれば、組み込みの型チェック機能を無効にできます。

ビルド、またはデプロイ手順の一部として、型チェックを実行していることを必ず確認してください。確認しなかった場合、これは非常に危険です。

`next.config.js` を開いて、 `typescript` 設定内の `ignoreBuildErrors` オプションを有効にします:

```js
module.exports = {
  typescript: {
    // !! 警告 !!
    // あなたのプロジェクトに型エラーがあったとしても、プロダクションビルドを正常に完了するために危険な許可をする。
    // !! 警告 !!
    ignoreBuildErrors: true
  }
};
```

## 関連事項

<div class="card">
  <a href="/docs/api-reference/next.config.js/introduction.md">
    <b>next.config.js の紹介</b>
    <small>Next.js で使用する設定ファイルについて詳しく学びましょう。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/basic-features/typescript.md">
    <b>TypeScript:</b>
    <small>Next.js で TypeScript を始める。</small>
  </a>
</div>
