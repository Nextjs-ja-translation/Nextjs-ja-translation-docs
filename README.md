# Nextjs-ja-translation-docs

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Next.jsのドキュメントを翻訳する非公式プロジェクトです。

本家公式ドキュメント

[https://nextjs.org/docs/getting-started](https://nextjs.org/docs/getting-started)

## 翻訳手順

翻訳の状況は、[翻訳の概要と進捗状況](https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/issues/3)のissusを確認してください。

### 手順1:翻訳を始める準備

まずは、このリポジトリを右上からForkしてください。

そして、リポジトリをクローンします。

```
$ git clone https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs
$ cd Nextjs-ja-translation-docs
```

depencencyのインストールをしてください。必ず`yarn`で行ってください。

```
$ yarn install
```

翻訳作業を行うためのブランチを作成します。ここでは、例として`docs/example.md`を翻訳するためのブランチを作成します。

```
$ git switch -c docs/example.md
```

これで、翻訳を始める準備は完了です。エディタを使って、翻訳箇所のファイルを編集します。

### 手順2:翻訳完了からプルリクエスト

翻訳作業が完了したら、textlintを使って文章のチェックを行います。text-lintの後に自分が翻訳作業したファイルを指定してください。

```
$ yarn text-lint ./docs/example.md
```

エラーを修正する場合は、`text-lint:fix`を使います。

```
$ yarn text-lint:fix ./docs/example.md
```

翻訳箇所をコミットしてプッシュします。コミットはできるだけ 1 つにまとめてください。

```
$ git add .
$ git commit -m "docs: translate docs/example.md"
$ git push -u origin docs/example.md
```

最後に、GitHub上からプルリクエストを作成してください。その後、メンテナーがレビューをして問題がなければマージされます。

## Q&A

質問がある場合は、[Slack](https://join.slack.com/t/nextjs-ja/shared_invite/zt-f9knbi69-AjTZqNZpYv7knG30jPwHcQ)に参加して、#questions チャンネル までお願いします。



## Contributors ✨

Thanks to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://shinyaigeek.dev/"><img src="https://avatars1.githubusercontent.com/u/42742053?v=4" width="100px;" alt=""/><br /><sub><b>Shinobu Hayashi</b></sub></a><br /><a href="https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/commits?author=Shinyaigeek" title="Code">💻</a></td>
    <td align="center"><a href="https://code-log.hatenablog.com/"><img src="https://avatars0.githubusercontent.com/u/39504660?v=4" width="100px;" alt=""/><br /><sub><b>かみむら</b></sub></a><br /><a href="https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/commits?author=hiro08gh" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/hoosan"><img src="https://avatars3.githubusercontent.com/u/40290137?v=4" width="100px;" alt=""/><br /><sub><b>hoosan</b></sub></a><br /><a href="#translation-hoosan" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
