---
description: 公式ドキュメントでNext.jsを始めてみましょう！ 
---

# はじめに

Next.jsのドキュメントへようこそ！

Next.jsを初めて使用する場合は、[学習コース](https://nextjs.org/learn/basics/getting-started)から始めることをおすすめします。

`学習コースは翻訳されていません。`

インタラクティブなクイズによる学習コースでは、Next.jsを使うために必要なすべての知識を習得できます。

Next.jsに関連する質問がある場合は、[GitHub Discussions](https://github.com/zeit/next.js/discussions)のコミュニティーでなんでも質問してください。

#### システム要件

- [Node.js 10.13](https://nodejs.org/) または、それ以降
- MacOS, Windows(WSL を含む)、そして Linux をサポート

## セットアップ

すべてを自動的にセットアップする`create-next-app`を使って、Next.js アプリを作成することをおすすめします。プロジェクトを作成するために、次を実行します:

```bash
npx create-next-app
# または
yarn create next-app
```

インストールの完了後、指示に従って開発サーバーを起動してみましょう。`pages/index.js`を編集して、ブラウザで確認してください。

## マニュアル設定

あなたのプロジェクトに、`next`,`react`そして`react-dom`をインストールしてください。

```bash
npm install next react react-dom
```

`package.json`を開いて、`scripts`に追加してください:

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

これらのスクリプトは、アプリケーション開発のさまざまな段階に当てはまります。

- `dev` - `next`はNext.jsを開発モードで実行します。
- `build` - `next build`は本番用にアプリケーションをビルドします。
- `start` - `next start`はNext.jsの本番サーバーを起動します。

Next.jsはpagesの概念を中心に構築されます。`page`とはpagesディレクトリの`.js`、`.jsx`、`.ts`、または`.tsx`ファイルからエクスポートされた[React コンポーネント](https://ja.reactjs.org/docs/components-and-props.html)です。

ページはファイル名に基づいて、ルーティングに紐づけられます。例えば、`pages/about.js`は`/about`にマップされます。ファイル名によって動的パラメータを追加できます。

プロジェクトの`pages`ディレクトリの中に作成してください。

`./pages/index.js`の中に次の内容を記載します:

```jsx
function HomePage() {
  return <div>Welcome to Next.js!</div>;
}

export default HomePage;
```

アプリケーションの開発を始めるために、`npm run dev`を実行します。これで、`http://localhost:3000`で開発サーバーが起動します。

アプリケーションを表示するために、`http://localhost:3000`にアクセスしてください。

これまでのところ:

- 自動コンパイルとバンドル(webpackとbabelを使用)
- [React Fast Refresh](https://nextjs.org/blog/next-9-4#fast-refresh)
- [`./pages/`](/docs/basic-features/pages.md)の[静的生成とサーバーサイドレンダリング](/docs/basic-features/data-fetching.md)
- [静的ファイル配信](/docs/basic-features/static-file-serving.md). `./public/`は`/`にマッピングされます。

さらに、すべてのNext.jsアプリケーションは最初から本番環境で使用できます。詳細は、[デプロイメントのドキュメント](/docs/deployment.md)をご覧ください。

## 関連

以下のセクションを次に読むことをお勧めします。

<div class="card">
  <a href="/docs/basic-features/pages.md">
    <b>Pages:</b>
    <small>Next.jsのpagesについての詳細はこちら。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/basic-features/built-in-css-support.md">
    <b>CSSサポート:</b>
    <small>内蔵のサポートされたCSSを使用して、アプリにカスタムスタイルを追加します。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/api-reference/cli.md">
    <b>CLI:</b>
    <small>Next.js CLIの詳細についてはこちら。</small>
  </a>
</div>
