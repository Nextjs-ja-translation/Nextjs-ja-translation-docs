---
description: ルートの `pages` ディレクトリの代わりに `src` ディレクトリにpagesを格納します。
---

# `src` ディレクトリ

Pages はルートの `pages` ディレクトリの代わりに `src/pages` 配下にも追加できます。

`src` ディレクトリは多くのアプリで一般的です。Next.js はデフォルトでサポートしています。

## 注意事項

- `src/pages` は、ルートディレクトリに `pages` がある場合は無視されます。
- `next.config.js` や `tsconfig.json` のような設定ファイルは、環境変数と同様にルートディレクトリに配置して下さい。これらは `src` に配置しても動作しません。[`public` ディレクトリ](/docs/basic-features/static-file-serving.md)についても同様です。

## 関連事項

次にやるべきこととして、以下のセクションを読むことをお勧めします:

<div class="card">
  <a href="/docs/basic-features/pages.md">
    <b>Pages:</b>
    <small>Next.jsのpagesについて詳しく学ぶ</small>
  </a>
</div>
