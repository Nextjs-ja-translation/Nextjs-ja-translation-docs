---
description: 独自の設定をNext.jsに追加して、Babelプリセットを拡張します。
---

# Babel設定のカスタマイズ

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-custom-babel-config">Babel設定のカスタマイズ</a></li>
  </ul>
</details>

Next.js のアプリに含まれる `next/babel` プリセットは、React アプリケーションや、サーバーサイドコードのコンパイルに必要なすべてのことが含まれます。ですが、デフォルトの Babel 設定を拡張したい場合は、それも可能です。

開始するには、アプリのトップに `.babelrc` を定義する必要があるだけです。もし、そのようなファイルを見つけた場合信頼できるソースだと考えます。それから、`next/babel`プリセットを Next.js で定義する必要があります。

こちらが `.babelrc` ファイルの例です:

```json
{
  "presets": ["next/babel"],
  "plugins": []
}
```

`next/babel`はプリセットを含みます:

- preset-env
- preset-react
- preset-typescript
- plugin-proposal-class-properties
- plugin-proposal-object-rest-spread
- plugin-transform-runtime
- styled-jsx

これらの presets/plugins を設定する場合、カスタムした `.babelrc` の `presets` や `plugins` を追加しないでください。その代わり、`next/babel`プリセットでこのように設定します:

```json
{
  "presets": [
    [
      "next/babel",
      {
        "preset-env": {},
        "transform-runtime": {},
        "styled-jsx": {},
        "class-properties": {}
      }
    ]
  ],
  "plugins": []
}
```

各設定で、利用可能なオプションについてはドキュメントサイトに訪れて学んでください。

> Next.jsは、サーバーサイドのコンパイルに現在のNode.jsのバージョンを使用します。

> `"preset-env"`の `mobules` オプションは `false` にすべきで、そうでなければ、webpackのコード分割はオフになります。
