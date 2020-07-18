---
description: Next.jsは、publicディレクトリの中で画像などの静的ファイルを配信できます。どのように動作するか学んでいきましょう。
---

# 静的ファイルの配信 

Next.jsは、ルートディレクトリのpublicフォルダ下で、画像などの静的ファイルを配信できます。
`public`内のファイルは、ベースURL(/)から始まるコードで参照できます。

例えば、`public/my-image.png`に画像を追加場合、次のコードで画像にアクセスします:

```jsx
function MyImage() {
  return <img src="/my-image.png" alt="my image" />;
}

export default MyImage;
```

このフォルダは、Googleのサイト検証、robots.txtや他の静的ファイル(.htmlを含む)にも役立ちます！

> 備考: publicディレクトリを他の名前にしないでください。名前を変更することはできず、静的アセットを配信できる唯一のディレクトリです。

> 備考: `pages/`ディレクトリ内のファイルと、同じ名前の静的ファイルを持たないようにしてください。これはエラーになります。
>
> もっと読む: <http://err.sh/next.js/conflicting-public-file-page>
