---
description: Next.jsは、publicディレクトリの中で画像などの静的ファイルを配信できます。どのように動作するか学んでいきましょう。
---

# 静的ファイルの配信

Next.js は、ルートディレクトリの `public` フォルダ下で、画像などの静的ファイルを配信できます。`public` 内のファイルは、ベース URL(`/`)から始まるコードで参照できます。

例えば、 `public/me.png` に画像を追加した場合、次のコードで画像にアクセスします:

```jsx
import Image from 'next/image'

function Avatar() {
  return <Image src="/me.png" alt="me" width="64" height="64" />
}

export default Avatar
```
> 備考: `next/image` は Next.js 10 以降が必要です。

このフォルダは、`robots.txt`、`favicon.ico`、Google Site Verification、その他の静的ファイル(`.html` を含む)にも役立ちます！

> **備考**: `public` ディレクトリを他の名前にしないでください。名前を変更することはできず、静的アセットを配信できる唯一のディレクトリです。

> **備考**: `pages/` ディレクトリ内のファイルと、同じ名前の静的ファイルを持たないようにしてください。これはエラーになります。
>
> もっと読む: <https://nextjs.org/docs/messages/conflicting-public-file-page>

> **備考**: [ビルド時](/docs/api-reference/cli.md#build)に `public` ディレクトリ内にあるアセットのみ、Next.js によって配信されます。実行時に追加されたファイルは利用できません。永続的なファイルストレージには [AWS S3](https://aws.amazon.com/jp/s3/) のようなサードパーティーのサービスを利用することを推奨します。
