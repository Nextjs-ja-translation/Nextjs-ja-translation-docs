---
description: ルートの `pages` ディレクトリの代わりに `src` ディレクトリにページを格納します。
---

# `src` ディレクトリ

ページはルートの `pages` ディレクトリの代わりに `src/pages` 配下にも追加できます。

`src` ディレクトリは多くのアプリで一般的で、Next.jsはデフォルトでサポートしています。

## 注意点

- `src/pages` は、ルートディレクトリに `pages` がある場合は無視されます。
- `next.config.js` や `tsconfig.json` のような設定ファイルはルートディレクトリに配置して下さい。これらは `src` に配置しても動作しません。[`public` ディレクトリ](/docs/basic-features/static-file-serving.md)についても同様です。

## 関連事項

次に何をすればいいのかについては、以下の項目をご覧になることをお勧めします:

<div class="card">
  <a href="/docs/basic-features/pages.md">
    <b>Pages:</b>
    <small>Next.jsのページについて詳しく学ぶ</small>
  </a>
</div>
