---
description: Next.jsは標準でTypeScriptをサポートし、ページとAPIに対してビルトインの型を備えています。ここではNext.jsでTypeScriptを使い始めることができます。
---

# TypeScript

<details>
  <summary><b>Version History</b></summary>

| Version   | Changes                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `v12.0.0` | [SWC](https://nextjs.org/docs/advanced-features/compiler) is now used by default to compile TypeScript and TSX for faster builds.    |
| `v10.2.1` | [Incremental type checking](https://www.typescriptlang.org/tsconfig#incremental) support added when enabled in your `tsconfig.json`. |

</details>

Next.js は、IDE のように統合された革新的な[TypeScript](https://www.typescriptlang.org/)体験を提供します。

Next.js provides an integrated [TypeScript](https://www.typescriptlang.org/) experience, including zero-configuration set up and built-in types for Pages, APIs, and more.

- [Clone and deploy the TypeScript starter](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-typescript&project-name=with-typescript&repository-name=with-typescript)
- [View an example application](https://github.com/vercel/next.js/tree/canary/examples/with-typescript)

## `create-next-app` support

You can create a TypeScript project with [`create-next-app`](https://nextjs.org/docs/api-reference/create-next-app) using the `--ts, --typescript` flag like so:

```
npx create-next-app@latest --ts
# or
yarn create next-app --typescript
```

## Existing projects

To get started in an existing project, create an empty `tsconfig.json` file in
the root folder:

```bash
touch tsconfig.json
```

Next.js はこのファイルをデフォルト値で自動的に構成します。独自の `tsconfig.json` カスタム[コンパイラオプション](https://www.typescriptlang.org/docs/handbook/compiler-options.html)を提供することもサポートされています。

You can also provide a relative path to a tsconfig.json file by setting `typescript.tsconfigPath` prop inside your `next.config.js` file.

Starting in `v12.0.0`, Next.js uses [SWC](https://nextjs.org/docs/advanced-features/compiler) by default to compile TypeScript and TSX for faster builds.

> Next.js は `.babelrc` が存在する場合、 TypeScript を処理するために Babel を用いますが、これはいくつかの[注意点](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats)があり、一部の[コンパイラオプションの挙動が異なります](https://babeljs.io/docs/en/babel-plugin-transform-typescript#typescript-compiler-options)。

次に、`next`（通常は `npm run dev` or `yarn dev`）を実行すると、セットアップのために Next.js が必要なパッケージのインストールを案内します:

```bash
npm run dev

# 次のような指示が表示されます:
#
# Please install TypeScript, @types/react, and @types/node by running:
#
#         yarn add --dev typescript @types/react @types/node
#
# ...
```

これで、ファイルを `.js` から `.tsx` に変換し、TypeScript の利点を活用する準備が整いました！

> `next-env.d.ts`という名前のファイルがプロジェクトのルートに作成されます。このファイルにより、TypeScriptコンパイラによってNext.jsの型が確実に取得されます。このファイルをいつでも変更される可能性があるため、**削除または編集することができません**。

> TypeScript の `strict` モードはデフォルトでオフになっています。TypeScriptに慣れてきたら `tsconfig.json` でオンにすることをお勧めします。

By default, Next.js will do type checking as part of `next build`. We recommend using code editor type checking during development.

> Instead of editing `next-env.d.ts`, you can include additional types by adding a new file e.g. `additional.d.ts` and then referencing it in the [`include`](https://www.typescriptlang.org/tsconfig#include) array in your `tsconfig.json`.

エラー報告を静かにさせたい場合は、[TypeScriptのエラーを無視する](/docs/api-reference/next.config.js/ignoring-typescript-errors.md)ためのドキュメントを参照してください。

## 静的生成とサーバーサイドレンダリング

`getStaticProps`、`getStaticPaths`、`getServerSideProps`に対して、
それぞれ `GetStaticProps` 、`GetStaticPaths`、`GetServerSideProps`型を使用できます。

```ts
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  // ...
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
};
```

> `getInitialProps`を使用している場合は、[このページの指示に従って](/docs/api-reference/data-fetching/get-initial-props.md#typescript)ください。

## APIのルート

以下は、API ルートにビルトインの型を使用する方法の例です:

```ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' });
};
```

レスポンスデータにも型を指定できます:

```ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' })
}
```

## カスタム `App`

[カスタム `App` ](/docs/advanced-features/custom-app.md)がある場合は、ビルトインの `AppProps` 型を使用して、ファイル名を `./pages/_app.tsx` に変更できます:

```ts
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

## PathのエイリアスとbaseUrl

Next.js は、`tsconfig.json`の `"paths"` および `"baseUrl"` オプションを自動的にサポートします。

この機能の詳細については、[モジュールパスエイリアスのドキュメント](/docs/advanced-features/module-path-aliases.md)をご覧ください。

## Type checking next.config.js

The `next.config.js` file must be a JavaScript file as it does not get parsed by Babel or TypeScript, however you can add some type checking in your IDE using JSDoc as below:

```js
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /* config options here */
}

module.exports = nextConfig
```

## Incremental type checking

Since `v10.2.1` Next.js supports [incremental type checking](https://www.typescriptlang.org/tsconfig#incremental) when enabled in your `tsconfig.json`, this can help speed up type checking in larger applications.

It is highly recommended to be on at least `v4.3.2` of TypeScript to experience the [best performance](https://devblogs.microsoft.com/typescript/announcing-typescript-4-3/#lazier-incremental) when leveraging this feature.

## Ignoring TypeScript Errors

Next.js fails your **production build** (`next build`) when TypeScript errors are present in your project.

If you'd like Next.js to dangerously produce production code even when your application has errors, you can disable the built-in type checking step.

If disabled, be sure you are running type checks as part of your build or deploy process, otherwise this can be very dangerous.

Open `next.config.js` and enable the `ignoreBuildErrors` option in the `typescript` config:

```js
module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
```