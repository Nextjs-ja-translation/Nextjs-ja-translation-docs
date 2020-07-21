# 翻訳スタイルガイド

Next.js のドキュメントを日本語へ翻訳するためのスタイルガイドです。翻訳開始前に必ず読んでください。

もし、わからないことや質問等がある場合は[Slack](https://nextjs-ja.slack.com/join/shared_invite/zt-f9knbi69-AjTZqNZpYv7knG30jPwHcQ#/)の#questions チャンネルで質問してください。

翻訳スタイルガイドの改訂案がある場合は、issues を立てるか、プルリクエストを送ってください。

## 文体

敬体（ですます調）を使って翻訳してください。

敬体の参考記事:

[ですます？である？文章の〈敬体〉と〈常体〉の使い分けを考える](https://blog.gururimichi.com/entry/2015/08/25/222628#:~:text=%E5%8F%A3%E8%AA%9E%E6%96%87%E4%BD%93%E3%81%AE%E4%B8%80%E3%80%82,%E7%94%A8%E3%81%84%E3%82%8B%E6%99%AE%E9%80%9A%E3%81%AE%E6%96%87%E7%AB%A0%E6%A7%98%E5%BC%8F%E3%80%82&text=%E8%BE%9E%E6%9B%B8%E3%82%92%E8%A6%8B%E3%82%8B%E3%81%A8%E3%80%81%E3%81%9D%E3%82%8C%E3%81%9E%E3%82%8C,%E6%9B%B8%E3%81%8D%E6%96%B9%E3%81%8C%E3%80%88%E6%95%AC%E4%BD%93%E3%80%89%E3%80%82)

## 半角と全角のスペース

半角と全角が切り替わる箇所にスペースをいれてください。

良い例:

```
Next.js のドキュメントへようこそ！
```

悪い例:

```
Next.jsのドキュメントへようこそ！
```

もし、スペースを入れる場所が分からない場合は、textlint のルールに沿ってください。

`text-lint:fix`という、textlint のルールに修正するコマンドも用意されています。翻訳対象のファイルを指定して実行してください。
ここでは、例として example.md を指定してます。

```
$ yarn text-lint:fix ./docs/example.md
```

## コードブロック

コードブロックのコメントも翻訳してください。コードブロック内にコードを追加したり、独自のコメントを入れないでください。

良い例:

```
npx create-next-app
# または
yarn create next-app
```

悪い例:

```
// Reactを作成するコマンド
npx create-next-app
# or
yarn create next-app

```

## 内部リンク

内部リンクがある場合は、別のページにリンクする文章は翻訳しても構いません。しかし URL は変えないでください。

良い例:

```
詳細は、[デプロイメントのドキュメント](/docs/deployment.md)をご覧ください。
```

悪い例:

```
詳細は、[デプロイメントのドキュメント](/docs/デプロイメント.md)をご覧ください。
```

## 外部リンク

もし外部リンクに十分なクオリティーの日本語版サイトがある場合、リンクを変えてください。

推奨される日本語翻訳版サイト:

- [React](https://ja.reactjs.org/)
- [MDN](https://developer.mozilla.org/ja/)

良い例:

```
Next.jsでは`export`された[React コンポーネント](https://ja.reactjs.org/docs/components-and-props.html) のことです。
```

悪い例:

```
Next.jsでは`export`された[React コンポーネント](https://reactjs.org/docs/components-and-props.html) のことです。
```

## 末尾の:(コロン)

コードのデモを示す際に、末尾に:(コロン)で終わっている原文があります。
これは、`。`に置き換えず、そのまま:(コロン)を使ってください。

良い例:

```
./pages/index.jsの中に次の内容を記載します:
```

悪い例:

```
./pages/index.jsの中に次の内容を記載します。
```

## 用語集

用語の翻訳に一貫性を持たせるため、下記の単語についての翻訳をまとめました。随時追加中です。

| 用語          | 和訳     |
| ------------- | -------- |
| Caveats       | 注意事項 |
| Note          | 備考     |
| How to use it | 使い方   |
| Introduction  | はじめに |
| Related       | 関連事項 |

### 原文のままの方がいいと判断された用語

| 用語                          |
| ----------------------------- |
| Imperatively                  |
| Automatic Static Optimization |

## 参考

[GatsbyJS 翻訳スタイルガイド](https://github.com/gatsbyjs/gatsby-ja/blob/master/style-guide.md)
