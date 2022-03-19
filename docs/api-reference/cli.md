---
description: Next.js CLIを使用すると、アプリケーションの起動やビルド、エクスポートを行うことができます。詳細はこちらをご覧ください。
---

# Next.js CLI

Next.js CLI を使用すると、アプリケーションの起動やビルド、エクスポートを行うことができます。

利用可能な CLI コマンドのリストを取得するには、プロジェクトのディレクトリ内で以下のコマンドを実行してください:

```bash
npx next -h
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) はnpm 5.2+ 以上に組み込まれています。)_

以下のように出力されます:

```bash
Usage
  $ next <command>

Available commands
  build, start, export, dev, lint, telemetry, info

Options
  --version, -v   Version number
  --help, -h      Displays this message

For more information run a command with the --help flag
  $ next build --help
```

`next` コマンドには、任意の [node arguments](https://nodejs.org/api/cli.html#cli_node_options_options) を引数として渡すことができます:

```bash
NODE_OPTIONS='--throw-deprecation' next
NODE_OPTIONS='-r esm' next
NODE_OPTIONS='--inspect' next
```

## ビルド

`next build` は、アプリケーションに最適化された本番のビルドを作成します。出力にはそれぞれのルーティングに関する情報が表示されます。

- **Size** – クライアントサイドのページへ移動する際にダウンロードされるアセットの数。各ルーティングのサイズには、依存関係のみが含まれます。
- **First Load JS** – ページへアクセスしたときにサーバーからダウンロードされたアセットの数。すべてのアプリケーションで共有される JS の量は、別の指標として表示されます。

最初のロードは、緑色か黄色、あるいは赤色のいずれかで表示されます。緑色を目指すことは、パフォーマンスの高いアプリケーションを開発することに繋がります。

 `--profile` を `next build` で指定して本番のビルドでのプロファイリングを React で有効にできます。これには [Next.js 9.5](https://nextjs.org/blog/next-9-5) 以降が必要です:

```bash
next build --profile
```

これにより開発時と同じようにプロファイリングを利用できます。

## 開発環境

`next dev` は開発モードでアプリケーションを起動し、ホットコードのリロードやエラーの報告などを行います。

アプリケーションはデフォルトで `http://localhost:3000` で起動します. デフォルトのポートは、以下のように `-p` で変更できます:

```bash
npx next dev -p 4000
```

もしくは `PORT` 環境変数を利用します:

```bash
PORT=4000 npx next dev
```

> 追記: HTTPサーバの起動は、他のコードが初期化される前に行われるため、`PORT` は `.env` で設定することができません。
また、ホスト名をデフォルトの `0.0.0.0` 以外に設定することも可能です。これは同じネットワーク上の他のデバイスからアプリケーションを利用できるようにするのに有用です。デフォルトのホスト名は以下のように `-H` で変更することができます:

```bash
npx next dev -H 192.168.1.2
```

## 本番環境

`next start` は本番モードでアプリケーションを起動します。 アプリケーションはまず最初に、 [`next build`](#build) でコンパイルされる必要があります。

アプリケーションはデフォルトで `http://localhost:3000` で起動します. デフォルトのポートは、以下のように `-p` で変更できます:

```bash
npx next start -p 4000
```

もしくは `PORT` 環境変数を利用します:

```bash
PORT=4000 npx next start
```

> 追記: HTTPサーバの起動は、他のコードが初期化される前に行われるため、`PORT` は `.env` で設定することができません。

## Lint

`next lint` は `pages` と `components` 、 `lib` ディレクトリ以下にある全てのファイルに対して ESLint を実行します。 またアプリケーションで ESLint がまだ設定されていない場合、必要な依存関係をインストールするためのガイド付きのセットアップも提供します。

他に Lint したいディレクトリがある場合には、 `--dir` で指定できます:

```bash
next lint --dir utils
```

## 遠隔測定データ

Next.js は通常、利用状況に関する**完全匿名**の遠隔測定データを収集しています。
匿名であるこのプログラムへの参加は任意であり、情報を共有したくない場合にはオプトアウトできます。

詳細については、 [こちらのドキュメントをお読みください](https://nextjs.org/telemetry/)。

## Info

`next info` は Next.js のバグを報告するために利用できる、現在のシステムに関する詳細を表示します。
この情報には OS のプラットフォーム/アーキテクチャ/バージョン、バイナリ(Node.js、npm、Yarn、pnpm)、npm パッケージのバージョン(`next`、`react`、`react-dom`) が含まれています。

プロジェクトのルートディレクトリで以下を実行します:

```bash
next info
```

この例のような情報が表示されます:

```bash
    Operating System:
      Platform: linux
      Arch: x64
      Version: #22-Ubuntu SMP Fri Nov 5 13:21:36 UTC 2021
    Binaries:
      Node: 16.13.0
      npm: 8.1.0
      Yarn: 1.22.17
      pnpm: 6.24.2
    Relevant packages:
      next: 12.0.8
      react: 17.0.2
      react-dom: 17.0.2
```

これらの情報は GitHub の Issue で報告されるべきです。
