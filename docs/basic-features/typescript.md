---
description: Next.jsはデフォルトでTypeScriptをサポートし、ページとAPIの型を備えています。ここではTypeScriptでNext.jsを使い始めることができます。
---

# TypeScript

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-typescript">TypeScript</a></li>
  </ul>
</details>

Next.jsは、IDEのように統合された[TypeScript](https://www.typescriptlang.org/)体験を提供します。

はじめに、プロジェクトルートに空ファイル`tsconfig.json`を作成します。

```bash
touch tsconfig.json
```

Next.jsはこのファイルをデフォルト値で自動的に構成します。独自の`tsconfig.json`カスタム[コンパイラオプション](https://www.typescriptlang.org/docs/handbook/compiler-options.html)を提供することもサポートされています。

> Next.jsはBabelを使用してTypeScriptを処理しますがいくつかの注意点があり、一部のコンパイラオプションは異なる方法で処理されます。

次に、`next`（通常は`npm run dev`）を実行すると、Next.jsが必要なパッケージのインストールを案内し、セットアップを完了します。

```bash
npm run dev

# 次のような手順が表示されます。
#
# Please install typescript, @types/react, and @types/node by running:
#
#         yarn add --dev typescript @types/react @types/node
#
# ...
```

これで、ファイルを`.js`から`.tsx`に変換し、TypeScriptの利点を活用する準備が整いました。

> `next-env.d.ts`という名前のファイルがプロジェクトのルートに作成されます。
> このファイルにより、TypeScriptコンパイラによってNext.jsが確実に取得されます。**削除することはできません**が、編集することはできます（ただし、必須ではありません）。

> Next.jsでは`strict`モードはデフォルトでオフになっています。TypeScriptに慣れてきたら`tsconfig.json`でオンにすることをお勧めします。


エラーを無視にする場合は、[TypeScriptのエラーを無視する](/docs/api-reference/next.config.js/ignoring-typescript-errors.md)に関するドキュメントを参照してください。

## 静的生成とサーバーサイドレンダリング

`getStaticProps`、`getStaticPaths`、`getServerSideProps`のために、
それぞれ`GetStaticProps`、`GetStaticPaths`、`GetServerSideProps`型を使用できます。

```ts
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

export const getStaticProps: GetStaticProps = async context => {
  // ...
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
};

export const getServerSideProps: GetServerSideProps = async context => {
  // ...
};
```

> `getInitialProps`を使用している場合は、[このページ](/docs/api-reference/data-fetching/getInitialProps.md#typescript)の指示に従ってください。

## APIのルーティング

以下は、APIルーティングに型を使用する方法の例です。

```ts
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' });
};
```

レスポンスデータに型を指定できます。

```ts
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
```

## カスタム`App`

[カスタム`App`](/docs/advanced-features/custom-app)がある場合は、`AppProps`型を使用して、ファイル名を`./pages/_app.tsx`に変更できます。

```ts
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

## PathエイリアスとbaseUrl

Next.jsは、`tsconfig.json`の`"paths"`および`"baseUrl"`オプションを自動的にサポートします。

この機能の詳細については、[モジュールパスエイリアスのドキュメント](/docs/advanced-features/module-path-aliases.md)をご覧ください。

