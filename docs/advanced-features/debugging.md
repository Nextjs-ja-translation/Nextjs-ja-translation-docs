---
description: Next.js アプリケーションをデバッグする
---

# デバッグ

このドキュメントでは、[VSCode デバッガー](https://code.visualstudio.com/docs/editor/debugging)または [Chrome デベロッパーツール](https://developers.google.com/web/tools/chrome-devtools)を利用し、ソースマップの完全なサポートで Next.js のフロントエンドとバックエンドをデバッグする方法について説明します。

Node.js にアタッチできるデバッガーであれば、Next.js アプリケーションのデバッグにも使用できます。詳しくは Node.js の[デバッグガイド](https://nodejs.org/ja/docs/guides/debugging-getting-started/)をご覧ください。

## VS Code を利用したデバッグ

プロジェクトのルートに `.vscode/launch.json` というファイルを作成し、次の内容を記述してください:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

Yarn を使っている場合には、`npm run dev` の代わりに `yarn dev` を使用できます。もしアプリケーションが起動する[ポート番号を変更](/docs/api-reference/cli#development)した場合は、`http://localhost:3000` の `3000` を変更したポート番号に置き換えてください。

次に、デバッグパネルに移動し（Windows/Linux の場合は <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>、macOS の場合は <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>D</kbd>）、起動設定を選択した後 F5 キーを押すかコマンドパレットから**デバッグ: デバッグを開始する**を選んでデバッグセッションを開始してください。

## Chrome デベロッパーツールを利用したデバッグ

### クライアントサイドコード

`next dev`、`npm run dev`、または `yarn dev` で通常通りに開発サーバーを起動します。サーバーが起動したら、`http://localhost:3000`（あるいは代わりの URL）を Chrome で開きます。次に、Chrome のデベロッパーツールを開き（Windows/Linux の場合は <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd>、macOS は <kbd>⌥</kbd>+<kbd>⌘</kbd>+<kbd>I</kbd>）、**ソース**タブに移動します。

これで、クライアントサイドのコードが [`debugger`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/debugger) 文に到達する度コードの実行が一時停止し、そのファイルがデバッグエリア内で表示されるようになります。Windows/Linux の場合は <kbd>Ctrl</kbd>+<kbd>P</kbd>、macOS の場合は <kbd>⌘</kbd>+<kbd>P</kbd> を押すことで、ファイルを検索して手動でブレークポイントを設定できます。ここで検索する時、ソースファイルのパスは `webpack://_N_E/./` から始まることに注意してください。

### サーバーサイドコード

Chrome のデベロッパーツールを使って Next.js のサーバーサイドコードをデバッグするためには、以下のように [`--inspect`](https://nodejs.org/api/cli.html#cli_inspect_host_port) フラグを Node.js プロセスに渡す必要があります:

```bash
NODE_OPTIONS='--inspect' next dev
```

`npm run dev` や `yarn dev` を使っている場合は（[はじめに](/docs/getting-started)をご覧ください）、`package.json` の `dev` スクリプトを更新する必要があります:

```json
"dev": "NODE_OPTIONS='--inspect' next dev"
```

Next.js の開発サーバーを　`--inspect` フラグを付けて起動すると、次のような表示になります:

```bash
Debugger listening on ws://127.0.0.1:9229/0cf90313-350d-4466-a748-cd60f4e47c95
For help, see: https://nodejs.org/en/docs/inspector
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

> `NODE_OPTIONS='--inspect' npm run dev` や `NODE_OPTIONS='--inspect' yarn dev` を実行しても動作しないことに注意してください。これは同じポートで複数のデバッガーを起動しようとするためです。1 つは npm または yarn のプロセス、もう 1 つは Next.js のために起動しようとします。コンソールには、`Starting inspector on 127.0.0.1:9229 failed: address already in use` のようなエラーが表示されるでしょう。

サーバーを起動した後、Chrome の新しいタブで `chrome://inspect` を開くと、**Remote Target** セクションに Next.js アプリケーションが表示されているはずです。 アプリケーションの下にある **inspect** をクリックしデベロッパーツールを別のウィンドウで開いた後、**ソース**タブに移動します。

ここでのサーバーサイドのコードのデバッグは、デベロッパーツールでクライアントサイドのコードをデバッグする時と同じように動作しますが、ここで <kbd>Ctrl</kbd>+<kbd>P</kbd> や <kbd>⌘</kbd>+<kbd>P</kbd> を使ってファイルを検索するとき、ソースファイルのパスは `webpack://{application-name}/./` で始まります（`{application-name}` には `package.json` に基づいてアプリケーション名が入ります）。

### Windows でのデバッグ

`NODE_OPTIONS='--inspect'` の構文は Windows のプラットフォームではサポートされていないため、Windows ユーザーは、この構文を使用するとき問題に直面する可能性があります。これを回避するには、[`cross-env`](https://www.npmjs.com/package/cross-env) を開発時の依存パッケージとしてインストールし（NPM の場合は `--dev`、Yarn の場合は `-D` をつける）、`dev` スクリプトを以下のように置き換えてください。

```json
"dev": "cross-env NODE_OPTIONS='--inspect' next dev",
```

`cross-env` は、プラットフォーム（Mac、Linax、Windows を含む）に関係なく環境変数 `NODE_OPTIONS` を設定することで、デバイスやオペレーションシステムを超えて一貫したデバッグをできるようにします。

## もっと詳しく知る

JavaScript のデバッガーについてさらに詳しく学ぶには、以下のドキュメントをご覧ください:

- [VS Code における Node.js のデバッグ: ブレークポイント](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_breakpoints)
- [Chrome デベロッパーツール: JavaScript のデバッグ](https://developers.google.com/web/tools/chrome-devtools/javascript)