---
概要: Next.js CLIを使用すると、アプリケーションの起動やビルド、エクスポートを行うことができます。詳細はこちらをご覧ください。
---

# Next.js CLI

Next.js CLIを使用すると、アプリケーションの起動やビルド、エクスポートを行うことができます。

利用可能なCLIコマンドのリストを取得するには、プロジェクトのディレクトリ内で以下のコマンドを実行してください:

```bash
npx next -h
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) はnpm 5.2+ 以上が組み込まれています。)_

以下のように出力されます:

```bash
Usage
  $ next <command>

Available commands
  build, start, export, dev, telemetry

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
- **First Load JS** – サーバーからページへアクセスしたときにダウンロードされたアセットの数。すべてのアプリケーションで共有されるJSの量は、別の指標として表示されます。

最初のロードは、緑色か黄色、あるいは赤色のいずれかで表示されます。緑色を目指すことは、パフォーマンスの高いアプリケーションを開発することに繋がります。

## 開発環境

`next dev` は開発モードでアプリケーションを起動し、ホットコードのリロードやエラーの報告などを行います。

アプリケーションはデフォルトで `http://localhost:3000` で起動します. デフォルトのポートは、以下のように `-p` で変更できます:

```bash
npx next dev -p 4000
```

## 本番環境

`next start` は本番モードでアプリケーションを起動します。 アプリケーションはまず最初に、 [`next build`](#build) でコンパイルされる必要があります。

アプリケーションはデフォルトで `http://localhost:3000` で起動します. デフォルトのポートは、以下のように `-p` で変更できます:

```bash
npx next start -p 4000
```

## 遠隔測定データ

Next.jsは通常、利用状況に関する**完全匿名**の遠隔測定データを収集しています。
匿名であるこのプログラムへの参加は任意であり、情報を共有したくない場合にはオプトアウトできます。

詳細については、 [こちらのドキュメントをお読みください](https://nextjs.org/telemetry/)。
