---
description: よく使われる3つのテストツール、Cypress、Playwright、Jest、React Testing Library を使った Next.js のセットアップ方法をご紹介します。
---

# テスト

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-cypress">Next.js と Cypress</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-playwright">Next.js と Playwright</a></li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-jest">Next.js と Jest ・ React Testing Library</a></li>
  </ul>
</details>

Next.js と、[Cypress](https://nextjs.org/docs/testing#cypress) 、[Playwright](https://nextjs.org/docs/testing#playwright) 、[Jest・React Testing Library](https://nextjs.org/docs/testing#jest-and-react-testing-library) といったよく利用されているテストツールとのセットアップ方法について学んでいきましょう。

## Cypress

Cypress は、**End-to-End(E2E)** テストやインテグレーションテストで使用されるテストツールです。

### クイックスタート

`create-next-app` を使って [with-cypress example](https://github.com/vercel/next.js/tree/canary/examples/with-cypress) のテンプレートを利用することですぐに始めることができます。

```bash
npx create-next-app@latest --example with-cypress with-cypress-app
```

### 手動でのセットアップ

Cypress を利用するために `cypress` パッケージをインストールします:

```bash
npm install --save-dev cypress
```

`package.json` の scripts に Cypress の記述を追加します:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "cypress": "cypress open",
}
```

Cypress を初回起動して Cypress の推奨のフォルダ構造を使ったテンプレートを生成します:

```bash
npm run cypress
```

生成された例や Cypress のドキュメント [Writing Your First Test](https://docs.cypress.io/guides/getting-started/writing-your-first-test) の章を読むことで Cypress をより深く理解できるでしょう。

### Cypress を使った最初のインテグレーションテストの作成

Next.js で作られた 2 つのページを想定します:

```jsx
// pages/index.js
import Link from 'next/link'

export default function Home() {
  return (
    <nav>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  )
}
```

```jsx
// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  )
}
```

ページ遷移が正しく動作していることを確認するためのテストを追加します:

```jsx
// cypress/integration/app.spec.js

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // インデックスページからテストを開始
    cy.visit('http://localhost:3000/')

    // href 属性に "about" が含まれるリンクを探し、クリックする
    cy.get('a[href*="about"]').click()

    // 遷移した新しい url に "about" が含まれていることを確認
    cy.url().should('include', '/about')

    // 遷移した新しいページには "About page" と書かれた h1 要素が含まれていることを確認
    cy.get('h1').contains('About Page')
  })
})
```

設定ファイル `cypress.json` に `"baseUrl": "http://localhost:3000"` を追加することで `cy.visit("http://localhost:3000/")` ではなく `cy.visit("/")` と書くこともできます。

### Cypress のテストを実行する

Cypress は Next.js アプリケーションの動作をテストするため、Cypress を実行する前には Next.js サーバーを起動する必要があります。本来のアプリケーションの動作に近づけるため、本番用のコードに対してテストを実行することをお勧めします。

`npm run build`、`npm run start`を実行し、別のターミナルで `npm run cypress` を実行して Cypress を起動します。

> **備考:** または、`start-server-and-test` パッケージをインストールし、`package.json` の scripts に追加してください: `"test":"start-server-and-test start http://localhost:3000 cypress"` とすると、Next.js の本番サーバーが Cypress と連動して起動します。新しい変更があった場合は、アプリケーションの再構築を忘れないようにしてください。

### 継続的インテグレーションへの準備 (CI)

Cypress を実行すると、CI 環境には向いていない管理画面が起動することにお気づきでしょう。`cypress run` コマンドを使えば、ヘッドレスモードで Cypress を実行できます:

```json
// package.json

"scripts": {
  //...
  "cypress": "cypress open",
  "cypress:headless": "cypress run",
  "e2e": "start-server-and-test start http://localhost:3000 cypress",
  "e2e:headless": "start-server-and-test start http://localhost:3000 cypress:headless"
}
```

Cypress と継続的インテグレーションについては、以下のドキュメントから学ぶことができます:

- [Cypress Continuous Integration Docs](https://docs.cypress.io/guides/continuous-integration/introduction)
- [Cypress GitHub Actions Guide](https://on.cypress.io/github-actions)
- [Official Cypress GitHub Action](https://github.com/cypress-io/github-action)

## Playwright

Playwright は、Chromium 、Firefox や WebKit を 1 つの API で自動化できるテストフレームワークです。すべてのプラットフォームで、**End-to-End (E2E)** テストと**統合**テストを記述するために利用できます。

### クイックスタート

一番手軽なのは、`create-next-app` で [with-playwright example](https://github.com/vercel/next.js/tree/canary/examples/with-playwright)を使ってみることです。この例を利用することで Playwright がセットアップされた Next.js プロジェクトが作成されます。

```bash
npx create-next-app@latest --example with-playwright with-playwright-app
```

### 手動でのセットアップ

`npm init playwright` を使用して、既存の `NPM` プロジェクトに Playwright を追加できます。

Playwright を手動でのセットアップで使い始めるには、`@playwright/test` パッケージをインストールします:

```bash
npm install --save-dev @playwright/test
```

`package.json` の scripts に Playwright を追加します:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test:e2e": "playwright test",
}
```

### Playwright を使った最初の end-to-end テストの作成

Next.js で作られた 2 つのページを想定します:

```jsx
// pages/index.js
import Link from 'next/link'

export default function Home() {
  return (
    <nav>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  )
}
```

```jsx
// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  )
}
```

ページ遷移が正しく動作していることを確認するためのテストを追加します:

```jsx
// e2e/example.spec.ts

import { test, expect } from '@playwright/test'

test('should navigate to the about page', async ({ page }) => {
  // インデックスページからテストを開始 （ baseURL は playwright.config.ts の webServer を通じて設定される）
  await page.goto('http://localhost:3000/')
  // 'About Page' が含まれている要素を見つけてクリック
  await page.click('text=About Page')
  // 新しい URL は "/about"になる（ baseURL はここで利用される）
  await expect(page).toHaveURL('http://localhost:3000/about')
  // 新しく遷移したページの h1 要素には "About Page" が含まれる
  await expect(page.locator('h1')).toContainText('About Page')
})
```

設定ファイル `playwright.config.ts` に [`"baseUrl": "http://localhost:3000"`](https://playwright.dev/docs/api/class-testoptions#test-options-base-url) を追加することで `page.goto("http://localhost:3000/")` ではなく `page.goto("/")` と書くこともできます。

### Playwright のテストを実行する

Playwright は Next.js アプリケーションの動作をテストするため、Playwright を実行する前には Next.js サーバーを起動する必要があります。本来のアプリケーションの動作に近づけるため、本番用のコードに対してテストを実行することをお勧めします。

`npm run build`、`npm run start`を実行し、別のターミナルで `npm run test:e2e` を実行して Playwright を起動します。

> **備考:** また、[`webServer`](https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests) を使って Playwright に開発サーバーを起動させ、アプリケーションが利用可能になるまで待機させることも可能です。

### Playwright で継続的インテグレーション（CI)を実行する

Playwright はデフォルトで [headed mode](https://playwright.dev/docs/ci#running-headed) でテストを実行します。Playwright の依存関係をすべてインストールするには、`npx playwright install-deps` を実行します。

Playwright と継続的インテグレーションについては、以下のドキュメントから学ぶことができます:

- [Getting started with Playwright](https://playwright.dev/docs/intro)
- [Use a development server](https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests)
- [Playwright on your CI provider](https://playwright.dev/docs/ci)

## Jest と React Testing Library

Jest と React Testing Library は、**ユニットテスト**を行うために、よく一緒に使われます。Jest を Next.js のアプリケーションで使い始めるには、3 つの方法があります:

1. [quickstart examples](https://nextjs.org/docs/testing#quickstart-2) のテンプレートを利用する
2. [Next.js Rust Compiler](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler) を利用する
3. [Babel](https://nextjs.org/docs/testing#setting-up-jest-with-babel) を利用する

以下の章では、これらの各方法を利用した Jest を設定する方法について説明します:

### クイックスタート

You can use `create-next-app` with the [with-jest](https://github.com/vercel/next.js/tree/canary/examples/with-jest) example to quickly get started with Jest and React Testing Library:

`create-next-app` で `with-jest` のテンプレートを利用すると、Jest と React Testing Library をすぐに使い始めることができます:

```bash
npx create-next-app@latest --example with-jest with-jest-app
```

### Jest を設定する (Rust コンパイラを利用)

[Next.js 12](https://nextjs.org/blog/next-12) から、Next.js に Jest 用の設定が組み込まれるようになりました。

Jest を利用するには、`jest`、`@testing-library/react`、`@testing-library/jest-dom` をインストールします:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

`jest.config.js` ファイルをプロジェクトのルートディレクトリに作成し、以下を追加します:

```jsx
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // テスト環境の next.config.js と .env ファイルを読み込むために、Next.js アプリケーションへのパスを記載する
  dir: './',
})

// Jest に渡すカスタム設定を追加する
const customJestConfig = {
  // 各テストの実行前に渡すオプションを追加
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // TypeScript の設定で baseUrl をルートディレクトリに設定している場合、alias を動作させるためには以下のようにする必要があります
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig は、非同期で next/jest が Next.js の設定を読み込めるようにするため、下記のようにエクスポートします
module.exports = createJestConfig(customJestConfig)
```

裏側では、next/jest が自動的に以下のような Jest の設定をしています:

- [SWC](https://nextjs.org/docs/advanced-features/compiler) を利用した `transform` の設定
- スタイルシート（`.css`、`.module.css` や scss 関連事項）と画像の自動モック化
- `.env`（とその関連事項）を `process.env` に読み込む
- テスト環境や依存関係から `node_modules` を除外する
- テストの依存関係から `.next` を除外する
- SWC での変換を有効化するフラグを `next.config.js` から読み込む

### Jest を設定する (Babel を利用)

[Rust Compiler](https://nextjs.org/docs/advanced-features/compiler) を使わない場合、Jest を手動で設定し、上記のパッケージに加えて、`babel-jest` と `identity-obj-proxy` をインストールする必要があります。

Jest for Next.js を設定するための推奨オプションは以下のとおりです:

```jsx
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    // CSS インポートの処理 (CSS modules を利用)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // CSS インポートの処理 (CSS modules を利用しない場合)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // 画像インポートの処理
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,

    // モジュールのエイリアスの処理
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  // 各テストの実行前に渡すオプションを追加
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    // next/babel プリセットでテストをトランスパイルするために babel-jest を使用します
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}
```

各設定オプションの詳細については、[Jest Docs](https://jestjs.io/docs/configuration)を参照してください。

**スタイルシートと画像のインポートの処理**

スタイルシートと画像はテストでは使用しませんが、インポートした際にエラーの発生する可能性があるため、モックを作成する必要があります。上記の設定で参照したモックファイルである `fileMock.js` と `styleMock.js` を `__mocks__` ディレクトリ内に作成します:

```js
// __mocks__/fileMock.js
module.exports = {
  src: '/img.jpg',
  height: 24,
  width: 24,
  blurDataURL: 'data:image/png;base64,imagedata',
}
```

```js
// __mocks__/styleMock.js
module.exports = {}
```

より詳しい静的なファイルの扱いについては、[Jest Docs](https://jestjs.io/docs/configuration)を参照してください。

**参考: カスタムマッチャーによる Jest の拡張**

`@testing-library/jest-dom` には `.toBeInTheDocument()` のような便利な[カスタムマッチャー](https://github.com/testing-library/jest-dom#custom-matchers)が含まれており、テストを簡単に書くことができます。Jest の設定ファイルに以下のオプションを追加することで、すべてのテストにカスタムマッチャーをインポートできます:

```js
// jest.config.js
setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
```

そして、`jest.setup.js` の中に、以下のインポートを追加してください:

```jsx
// jest.setup.js
import '@testing-library/jest-dom/extend-expect'
```

各テストの前にさらに設定オプションを追加する必要がある場合は、上記の `jest.setup.js` ファイルに追加するのが一般的です。

**参考: 絶対パスでのインポートとエイリアスを利用したモジュールインポート**

プロジェクトで[エイリアスを利用したモジュールインポート](https://nextjs.org/docs/advanced-features/module-path-aliases)を使用している場合、`jsconfig.json` ファイルの paths オプションと `jest.config.js` ファイルの `moduleNameMapper` オプションをマッチさせて、インポートを解決するように Jest を構成する必要があります。例えば:

```json
// tsconfig.json or jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

```jsx
// jest.config.js
moduleNameMapper: {
  '^@/components/(.*)$': '<rootDir>/components/$1',
}
```

### テストの作成:

**test script を package.json に追加する**

watch モードの Jest コマンドを `package.json` の scripts に追加します:

```jsx
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "jest --watch"
}
```

`jest --watch` は、ファイルが変更されたときにテストを再実行します。その他の Jest CLI のオプションについては、[Jest Docs](https://jestjs.io/docs/cli#reference) を参照してください。

**最初のテストを作成する**

これで、あなたのプロジェクトにテストを実行する準備が整いました。Jest の規約に従って、プロジェクトのルートディレクトリにある `__tests__` ディレクトリへテストを追加してください。

例えば、`<Home />` コンポーネントが見出しの要素を正常にレンダリングするかどうかをチェックするテストを追加できます:

```jsx
// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
```

追加で、`<Home />` コンポーネントへの予期せぬ変更を記録するために、[スナップショットテスト](https://jestjs.io/docs/snapshot-testing)を追加します:

```jsx
// __tests__/snapshot.js

import { render } from '@testing-library/react'
import Home from '../pages/index'

it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})
```

> **備考**: pages ディレクトリの中にあるファイルはすべてルートとみなされるため、pages ディレクトリの中にテストファイルを入れてはいけません。

**テスト環境の実行**

`npm run test` を実行して、テストを実行します。テストが成功または失敗した後、より多くのテストを実行する際に役立つ Jest コマンドのリストが表示されることに気づくでしょう。

さらに詳しい情報は、以下の資料が参考になります:

- [Jest Docs](https://jestjs.io/docs/getting-started)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Playground](https://testing-playground.com/) - 要素を一致させるテストを練習するのに役に立ちます

## コミュニティが提供する例とテンプレート

Next.js コミュニティでは、参考になるパッケージや記事を用意しています:

- [next-page-tester](https://github.com/toomuchdesign/next-page-tester) for DOM Integration Testing.
- [next-router-mock](https://github.com/scottrippey/next-router-mock) for Storybook.
- [Test Preview Vercel Deploys with Cypress](https://glebbahmutov.com/blog/develop-preview-test/) by Gleb Bahmutov.

より多くの情報を得るため次に読むべきものとして、以下をお勧めします:

<div class="card">
  <a href="/docs/basic-features/environment-variables#test-environment-variables.md">
    <b>テスト環境変数</b>
    <small>テスト環境変数について詳しく説明します。</small>
  </a>
</div>
