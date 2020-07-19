<!-- textlint-disable -->
# Nextjs-ja-translation-docs
<!-- textlint-enable -->

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-10-orange.svg?style=flat-square)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Next.jsのドキュメントを翻訳する非公式プロジェクトです。

[本家公式ドキュメント](https://nextjs.org/docs/getting-started)

## 翻訳手順

翻訳の状況は、[翻訳の概要と進捗状況](https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/issues/3)のissuesを確認してください。

### 手順1:翻訳を始める準備

まずは、このリポジトリを右上からForkしてください。

そして、リポジトリをクローンします。`your`には、あなたのGitHubのユーザーネームを入れてください。

```
$ git clone https://github.com/your/Nextjs-ja-translation-docs
$ cd Nextjs-ja-translation-docs
```

dependencyのインストールをしてください。必ず`yarn`で行ってください。

```
$ yarn install
```

開発サーバーが無事に起動するか確認してください。

```
$ yarn dev
```

翻訳作業を行うためのブランチを作成します。ここでは、例として`docs/example.md`を翻訳するためのブランチを作成します。

```
$ git checkout -b docs/example.md
```

これで、翻訳を始める準備は完了です。エディタを使って、翻訳箇所のファイルを編集します。

また、docs/manifest.jsonの各セクションのタイトルが設定されています。自分の担当箇所のタイトルを翻訳してください。

getting-staredを翻訳する例:

```
{ "title": "はじめに", "path": "/docs/getting-started.md" },
```

### 手順2:翻訳完了からプルリクエスト

precommit時に翻訳の対象ファイルに対してtextlintが走ります。textlintが通らない限りcommitできません。エラーを修正する場合は、`text-lint:fix`を使います。

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

質問がある場合は、[Slack](https://join.slack.com/t/nextjs-ja/shared_invite/zt-f9knbi69-AjTZqNZpYv7knG30jPwHcQ)に参加して、#questionsチャンネルまでお願いします。

## Contributors ✨

Thanks to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://shinyaigeek.dev/"><img src="https://avatars1.githubusercontent.com/u/42742053?v=4" width="100px;" alt=""/><br /><sub><b>Shinobu Hayashi</b></sub></a><br /><a href="https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/commits?author=Shinyaigeek" title="Code">💻</a></td>
    <td align="center"><a href="https://code-log.hatenablog.com/"><img src="https://avatars0.githubusercontent.com/u/39504660?v=4" width="100px;" alt=""/><br /><sub><b>かみむら</b></sub></a><br /><a href="https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/commits?author=hiro08gh" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/hoosan"><img src="https://avatars3.githubusercontent.com/u/40290137?v=4" width="100px;" alt=""/><br /><sub><b>hoosan</b></sub></a><br /><a href="#translation-hoosan" title="Translation">🌍</a> <a href="https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/commits?author=hoosan" title="Documentation">📖</a> <a href="https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/pulls?q=is%3Apr+reviewed-by%3Ahoosan" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://twitter.com/okumura_daiki"><img src="https://avatars3.githubusercontent.com/u/4679138?v=4" width="100px;" alt=""/><br /><sub><b>Daiki Okumura</b></sub></a><br /><a href="#translation-okmr-d" title="Translation">🌍</a></td>
    <td align="center"><a href="https://about.me/yokinist"><img src="https://avatars2.githubusercontent.com/u/19779874?v=4" width="100px;" alt=""/><br /><sub><b>yokinist</b></sub></a><br /><a href="https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/commits?author=yokinist" title="Documentation">📖</a> <a href="#translation-yokinist" title="Translation">🌍</a> <a href="#tool-yokinist" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/96-38"><img src="https://avatars1.githubusercontent.com/u/48713768?v=4" width="100px;" alt=""/><br /><sub><b>kurosawa</b></sub></a><br /><a href="#translation-96-38" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.facebook.com/noriaki.uchiyama"><img src="https://avatars3.githubusercontent.com/u/44050?v=4" width="100px;" alt=""/><br /><sub><b>Noriaki UCHIYAMA</b></sub></a><br /><a href="#translation-noriaki" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://ria-blog.org"><img src="https://avatars2.githubusercontent.com/u/11747541?v=4" width="100px;" alt=""/><br /><sub><b>ria</b></sub></a><br /><a href="#translation-ria3100" title="Translation">🌍</a></td>
    <td align="center"><a href="https://peaceful-mcclintock-c87ee2.netlify.app/"><img src="https://avatars0.githubusercontent.com/u/36391432?v=4" width="100px;" alt=""/><br /><sub><b>ryuckel</b></sub></a><br /><a href="#translation-ryuckel" title="Translation">🌍</a></td>
    <td align="center"><a href="https://yamanoku.net"><img src="https://avatars1.githubusercontent.com/u/1996642?v=4" width="100px;" alt=""/><br /><sub><b>Okuto Oyama</b></sub></a><br /><a href="#translation-yamanoku" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/syakoo"><img src="https://avatars1.githubusercontent.com/u/12678450?v=4" width="100px;" alt=""/><br /><sub><b>syakoo</b></sub></a><br /><a href="#translation-syakoo" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
