# Nextjs-ja-translation-docs

Next.js のドキュメントを翻訳する非公式プロジェクトです。

Next.js 公式ドキュメント

[https://nextjs.org/docs/getting-started](https://nextjs.org/docs/getting-started)

Next.js 日本語ドキュメント

[https://nextjs-ja-translation-docs.now.sh/docs/getting-started](https://nextjs-ja-translation-docs.now.sh/docs/getting-started)

# 翻訳手順

翻訳の状況は、[翻訳の概要と進捗状況](https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/issues/3)の issue を確認してください。
また、翻訳作業が被らないようにこの issue のコメント で翻訳場所の宣言をしてください。

## 手順 1 翻訳を始める準備

まずは、このリポジトリを右上から Fork してください。

そして、リポジトリをクローンします。

```
$ git clone https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs
$ cd Nextjs-ja-translation-docs
```

depencency のインストールをしてください。必ず`yarn`で行ってください。

```
$ yarn install
```

翻訳作業を行うためのブランチを作成します。ここでは、例として`docs/getting-started.md`を翻訳するためのブランチを作成します。

```
$ git switch -c docs/getting-started.md
```

これで、翻訳を始める準備は完了です。エディタを使って、翻訳箇所のマークダウンを編集します。

### 手順 2 翻訳完了からプルリクエスト

翻訳作業が完了したら、textlint を使って文章のチェックを行います。text-lint の後に自分が翻訳作業したマークダウンファイルを指定してください。

```
$ yarn text-lint ./docs/example.md
```

エラーを修正する場合は、`text-lint:fix`を使います。

```
$ yarn text-lint:fix ./docs/example.md
```

翻訳箇所をコミットしてプッシュします。

```
$ git add .
$ git commit -m "docs/getting-started.md"
$ git push
```

最後に、GitHub からプルリクエストを作成してください。その後、メンテナーがレビューをして、問題がなければマージされます。

# 質問や分からないことがある場合

もし、翻訳作業をしていて質問や分からないことがある場合は、[Slack](https://join.slack.com/t/nextjs-ja/shared_invite/zt-f9knbi69-AjTZqNZpYv7knG30jPwHcQ)に参加して、#questions までお願いします。

# メンテナー

todo

## Contributors ✨

Thanks to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
