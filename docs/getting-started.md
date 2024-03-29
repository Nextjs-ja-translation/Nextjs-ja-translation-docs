---
description: 公式ドキュメントでNext.jsを始めてみましょう！
---

# はじめに

Next.js のドキュメントへようこそ！

Next.js を初めて使用する場合は、[学習コース](https://nextjs.org/learn/basics/create-nextjs-app)から始めることをお勧めします。

`学習コースは翻訳されていません。`

インタラクティブなクイズによる学習コースでは、Next.js を使うために必要なすべての知識を習得できます。

Next.js に関連事項する質問がある場合は、[GitHub Discussions](https://github.com/vercel/next.js/discussions) のコミュニティーでなんでも質問してください。

#### システム要件

- [Node.js 12.22.0](https://nodejs.org/) または、それ以降
- MacOS, Windows (WSL を含む)、そして Linux をサポート

## 自動セットアップ

すべてを自動的にセットアップする `create-next-app` を使って、Next.js アプリを作成することをお勧めします。プロジェクトを作成するために、次を実行します:

```bash
npx create-next-app@latest
# または
yarn create next-app
```

TypeScript のプロジェクトで始めたい場合、 `--typescript` フラグを使うことができます:

```bash
npx create-next-app@latest --typescript
# または 
yarn create next-app --typescript
```

インストールの完了後:

- `npm run dev` または `yarn dev` を実行して `http://localhost:3000` の開発サーバーを立ち上げます 
- アプリケーションは `http://localhost:3000` で確認できます
- `pages/index.js` を編集して、ブラウザで更新後の結果を見ます

`create-next-app` の使い方のより詳しい情報は、[`create-next-app` ドキュメント](/docs/api-reference/create-next-app.md) で確認できます。

## マニュアル設定

あなたのプロジェクトに、`next`,`react`そして `react-dom` をインストールしてください。

```bash
npm install next react react-dom
# または
yarn add next react react-dom
```

`package.json`を開いて、`scripts`に追加してください:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

これらのスクリプトは、アプリケーション開発のさまざまな段階に当てはまります:

- `dev` - [`next`](/docs/api-reference/cli.md#development) は Next.js を開発モードで実行します。
- `build` - [`next build`](/docs/api-reference/cli.md#build) は本番用にアプリケーションをビルドします。
- `start` - [`next start`](/docs/api-reference/cli.md#production) は Next.js の本番サーバーを起動します。
- `lint` - [`next lint`](/docs/api-reference/cli.md#lint) は Next.js に組み込まれた ESLint の設定をします。

Next.js は [pages](/docs/basic-features/pages.md) の概念を中心に構築されます。`page`とは pages ディレクトリの `.js` 、`.jsx`、`.ts`、または `.tsx` ファイルからエクスポートされた[React コンポーネント](https://ja.reactjs.org/docs/components-and-props.html)です。

ページはファイル名に基づいて、ルーティングに紐づけられます。例えば、`pages/about.js`は `/about` にマップされます。ファイル名によって動的パラメータを追加できます。

プロジェクトの `pages` ディレクトリの中に作成してください。

`./pages/index.js`の中に次の内容を記載します:

```jsx
function HomePage() {
  return <div>Welcome to Next.js!</div>
}

export default HomePage
```

これまでのところ:

- 自動コンパイルと[バンドル](/docs/advanced-features/compiler.md)
- [React Fast Refresh](https://nextjs.org/blog/next-9-4#fast-refresh)
- [`./pages/`](/docs/basic-features/pages.md) の[静的生成とサーバーサイドレンダリング](/docs/basic-features/data-fetching/overview.md)
- [静的ファイル配信](/docs/basic-features/static-file-serving.md). `./public/`は `/` にマッピングされます。

さらに、すべての Next.js アプリケーションは最初から本番環境で使用できます。詳細は、[デプロイメントのドキュメント](/docs/deployment.md)をご覧ください。

## 関連事項

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
