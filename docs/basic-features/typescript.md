---
description: Next.jsは標準でTypeScriptをサポートし、ページとAPIに対してビルトインの型を備えています。ここではNext.jsでTypeScriptを使い始めることができます。
---

# TypeScript

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/with-typescript">TypeScript</a></li>
  </ul>
</details>

Next.js は、IDE のように統合された革新的な[TypeScript](https://www.typescriptlang.org/)体験を提供します。

はじめに、プロジェクトのルートに空の `tsconfig.json` ファイルを作成します:

```bash
touch tsconfig.json
```

Next.js はこのファイルをデフォルト値で自動的に構成します。独自の `tsconfig.json` カスタム[コンパイラオプション](https://www.typescriptlang.org/docs/handbook/compiler-options.html)を提供することもサポートされています。

> Next.jsはTypeScriptを処理するためにBabelを用いますが、いくつかの[注意点](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats)があり、一部の[コンパイラオプションの挙動が異なります](https://babeljs.io/docs/en/babel-plugin-transform-typescript#typescript-compiler-options)。

次に、`next`（通常は `npm run dev`）を実行すると、セットアップのために Next.js が必要なパッケージのインストールを案内します:

```bash
npm run dev

# 次のような指示が表示されます:
#
# Please install typescript, @types/react, and @types/node by running:
#
#         yarn add --dev typescript @types/react @types/node
#
# ...
```

これで、ファイルを `.js` から `.tsx` に変換し、TypeScript の利点を活用する準備が整いました！

> `next-env.d.ts`という名前のファイルがプロジェクトのルートに作成されます。
> このファイルにより、TypeScriptコンパイラによってNext.jsの型が確実に取得されます。このファイルを**削除することはできません**が、編集することはできます（ただし、必須ではありません）。

> Next.jsでは `strict` モードはデフォルトでオフになっています。TypeScriptに慣れてきたら `tsconfig.json` でオンにすることをお勧めします。

デフォルトでは、Next.js はアクティブに開発に取り組んでいるページに対して TypeScript のエラーを報告します。アクティブでないページに対する TypeScript のエラーは開発工程を邪魔**しません**。

エラー報告を静かにさせたい場合は、[TypeScriptのエラーを無視する](/docs/api-reference/next.config.js/ignoring-typescript-errors.md)ためのドキュメントを参照してください。

## 静的生成とサーバーサイドレンダリング

`getStaticProps`、`getStaticPaths`、`getServerSideProps`に対して、
それぞれ `GetStaticProps` 、`GetStaticPaths`、`GetServerSideProps`型を使用できます。

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

> `getInitialProps`を使用している場合は、[このページの指示に従って](/docs/api-reference/data-fetching/getInitialProps.md#typescript)ください。

## APIのルート

以下は、API ルートにビルトインの型を使用する方法の例です:

```ts
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' });
};
```

レスポンスデータにも型を指定できます:

```ts
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
```

## カスタム `App` 

[カスタム `App` ](/docs/advanced-features/custom-app)がある場合は、ビルトインの `AppProps` 型を使用して、ファイル名を `./pages/_app.tsx` に変更できます:

```ts
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

## PathのエイリアスとbaseUrl

Next.js は、`tsconfig.json`の `"paths"` および `"baseUrl"` オプションを自動的にサポートします。

この機能の詳細については、[モジュールパスエイリアスのドキュメント](/docs/advanced-features/module-path-aliases.md)をご覧ください。

