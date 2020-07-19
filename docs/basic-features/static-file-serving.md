---
description: Next.jsでは、画像のような静的なファイルをpublicディレクトリ内で提供することができます。どのように動作するのかをここで学びましょう。
---

# Static File Serving

Next.jsでは画像の様な静的なファイルを、`public`と呼ばれるルートディレクトリの中のフォルダーに置くことで提供できます。`public`内にあるファイルは、ベースURL(`/`)から始まるコードで参照できます。

例えば、もしあなたが画像を`public/my-image.png`に追加した場合、以下のコードからその画像にアクセスできます:

```jsx
function MyImage() {
  return <img src="/my-image.png" alt="my image" />;
}

export default MyImage;
```

このフォルダーは、`robots.txt`や、Google Site Verification、その他全ての静的ファイルの提供にも役に立ちます。(`.html`ファイルも含みます)

> ****: `public`ディレクトリにはその他の名前を付けないようにしてください。この名前は変更不可であり、静的ファイルを提供するのに使用される唯一のディレクトリです。

> **注**:`pages/`にあるファイルと同じ名前の静的ファイルが存在しないことを確認してください。エラーが発生します。
>
>さらに読む: <http://err.sh/next.js/conflicting-public-file-page>
