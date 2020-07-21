---
description: 'Next.jsには2つのプリレンダリングモードがあります。静的生成とサーバーサイドレンダリングです。これらの動作についてはこちらを御覧ください。'
---

# データ取得

> このドキュメントはNext.jsのバージョン9.3以降が対象となります。旧バージョンのNext.jsを使用している場合は、[以前のドキュメント](https://nextjs.org/docs/tag/v9.2.2/basic-features/data-fetching)を参照してください。

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/blog-starter">マークダウンファイルを使ったブログスターター</a> (<a href="https://next-blog-starter.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/cms-datocms">DatoCMSの例</a> (<a href="https://next-blog-datocms.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/cms-takeshape">TakeShapeの例</a> (<a href="https://next-blog-takeshape.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/cms-sanity">Sanityの例</a> (<a href="https://next-blog-sanity.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/cms-prismic">Prismicの例</a> (<a href="https://next-blog-prismic.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/cms-contentful">Contentfulの例</a> (<a href="https://next-blog-contentful.now.sh/">デモ</a>)</li>
    <li><a href="https://static-tweet.now.sh/">静的Tweetのデモ</a></li>
  </ul>
</details>

[Pagesのドキュメント](/docs/basic-features/pages.md)において、Next.js には 2 種類のプリレンダリングがあることを説明しました。**静的生成**と**サーバーサイドレンダリング**です。このページでは、それぞれの場合でのデータ取得戦略について掘り下げていきます。 まず最初に[Pagesのドキュメントを読む](/docs/basic-features/pages.md)ことをお勧めします。

プリレンダリングのデータ取得に使える 3 つの特徴的な Next.js の関数についてお話します。

- [`getStaticProps`](#getstaticprops-static-generation)（静的生成）: **ビルド時**のデータ取得する
- [`getStaticPaths`](#getstaticpaths-static-generation)（静的生成）: データに基づきプリレンダリングする[動的ルート](/docs/routing/dynamic-routes.md)を特定する
- [`getServerSideProps`](#getserversideprops-server-side-rendering)（サーバーサイドレンダリング）: **リクエストごと**にデータを取得する

また、クライアント側でのデータ取得について簡潔にお話します。

## `getStaticProps`（静的生成）

ページから `getStaticProps` という `async` 関数をエクスポートすると、Next.js はビルド時に `getStaticProps` から返される props を使ってプリレンダリングします。

```jsx
export async function getStaticProps(context) {
  return {
    props: {} // ページコンポーネントにpropsとして渡されます。
  };
}
```

`context`パラメータは次のキーを含むオブジェクトです。

- `params`はページが動的ルートを利用するためのルートパラメータを持ちます。たとえば、ページ名が `[id].js` である時、`params`は `{ id: ...}` のように見えます。詳細は [動的ルーティングのドキュメント](/docs/routing/dynamic-routes.md)をご覧ください。後に説明する `getStaticPaths`と一緒に使う必要があります。
- ページがプレビューモードになっている時は `preview` が `true` になり、そうでない場合は `false` になります。[プレビューモードのドキュメント](/docs/advanced-features/preview-mode.md)をご覧ください。
- `previewData`は、`setPreviewData`によって設定されたプレビューデータを含みます。[プレビューモードのドキュメント](/docs/advanced-features/preview-mode.md)
をご覧ください。

### 簡単な例

`getStaticProps`を使って CMS（コンテンツマネジメントシステム）からブログ記事の一覧を取得する例です。この例は[Pagesのドキュメント](/docs/basic-features/pages.md)にもあります。

```jsx
// posts はビルド時に getStaticProps() によって生成されます。
function Blog({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

// この関数はサーバー側でのビルド時に呼び出されます。
// クライアント側では呼び出されないため、データベースクエリを直接実行することも可能です。
// 「技術詳細」のセクションをご覧ください。
export async function getStaticProps() {
  // 外部のAPIエンドポイントを呼び出してpostsを取得します。
  // 任意のデータ取得ライブラリを使用できます。
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // { props: posts } を返すことで、Blog コンポーネントは
  // ビルド時に`posts`を prop として受け取ります。
  return {
    props: {
      posts
    }
  };
}

export default Blog;
```

### `getStaticProps`をいつ使うべきか？

`getStaticProps`を使うのはこんな時。

- ページをレンダリングするのに必要なデータが、ビルド時にユーザーのリクエストよりも先に利用可能。
- データがヘッドレス CMS から取得される。
- データが公開キャッシュ（ユーザー固有ではない）。
- ページがプリレンダリング（SEO のため）されて非常に高速。`getStaticProps`は HTML と JSON ファイルを生成し、どちらもパフォーマンスのために CDN でキャッシュされる。

### TypeScript: `GetStaticProps`を使う

TypeScript では、`GetStaticProps`型を `next` から利用できます。

```ts
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async context => {
  // ...
};
```

### ファイル読み込み: `process.cwd()`を使う

ファイルは `getStaticProps` でファイルシステムから直接読み込みできます。

そのためにはファイルのフルパスが必要です。

Next.js はコードを別のディレクトリにコンパイルするため、`__dirname`はページディレクトリとは異なり、パスとしては使えません。

代わりに `process.cwd()` を使って Next.js が実行されたディレクトリを取得できます。

```jsx
import fs from 'fs';
import path from 'path';

// posts はビルド時に getStaticProps() によって生成されます。
function Blog({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li>
          <h3>{post.filename}</h3>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  );
}

// この関数はサーバー側のビルド時に呼び出されます。
// クライアント側では呼び出されないので、直接データベースクエリを実行できます。
// 「技術詳細」セクションをご覧ください。
export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // 通常はコンテンツをパースもしくは変換するでしょう。
    // たとえば、ここではマークダウンをHTMLに変換できます。

    return {
      filename,
      content: fileContents
    };
  });
  // { props: posts } を返すことで、Blogコンポーネントはビルド時に
  // `posts`をpropとして受け取ります。
  return {
    props: {
      posts
    }
  };
}

export default Blog;
```

### 技術詳細

#### ビルド時のみ実行

`getStaticProps`はビルド時に実行されるため、リクエスト時でのみ利用可能なクエリパラメータや、静的 HTML を生成した時の HTTP ヘッダーのようなデータを**受け取りません**。

#### サーバー側のコードを直接記述

`getStaticProps`はサーバー側でのみ実行されることに注意してください。クライアント側では決して実行されません。ブラウザ用の JS バンドルにも含まれません。つまり、直接データベースクエリのようなコードを書いてもブラウザに送信されることはないということです。**API ルート**を `getStaticProps` から取得するのではなく、代わりに `getStaticProps` で直接サーバー側のコードを書くことができます。

#### HTMLとJSONの両方を静的に生成

`getStaticProps`を持つページがビルド時にプリレンダリングされると、ページの HTML ファイルだけでなく Next.js は `getStaticProps` の結果を持つ JSON ファイルを生成します。

この JSON ファイルは、`next/link`([ドキュメント](/docs/api-reference/next/link.md))もしくは `next/router` ([ドキュメント](/docs/api-reference/next/router.md))経由のクライアント側のルーティングで使われます。`getStaticProps`　でプリレンダリングされたページに遷移すると、Next.js はこの JSON ファイル（ビルド時に事前計算）を取得してページコンポーネントの props として使います。つまり、クライアント側のページ遷移は `getStaticProps` を呼び出さず、エクスポートされた JSON だけが使われます。

#### ページ内でのみ許可

`getStaticProps`は **ページ** からのみエクスポートされます。ページ以外のファイルからはエクスポートできません。

この制約の理由の 1 つは、React がページレンダリングの前に必要なデータを全て持つ必要があるという点です。

また、`export async function getStaticProps() {}`を使用しなければなりません。`getStaticProps`をページコンポーネントのプロパティとして追加しても機能しません。

#### 開発中はリクエストごとに実行

開発中（`next dev`）は、`getStaticProps`はリクエストごとに呼び出されます。

#### プレビューモード

一時的に静的生成を迂回してビルド時ではなく**リクエスト時**にレンダリングしたい時もあるでしょう。たとえば、ヘッドレス CMS を使って公開前に下書きをプレビューするような時です。

このユースケースは Next.js の**プレビューモード**という機能でサポートされています。詳細は[プレビューモードのドキュメント](/docs/advanced-features/preview-mode.md)をご覧ください。

## `getStaticPaths`（静的生成）

ページが動的ルート([ドキュメント](/docs/routing/dynamic-routes.md))を持ち、`getStaticProps`を使用する場合、ビルド時に HTML をレンダリングするためのパス一覧を定義する必要があります。

動的ルートを使ったページから `getStaticPaths` という `async` 関数をエクスポートすると Next.js は `getStaticPaths` で指定された全パスを静的にプリレンダリングします。

```jsx
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } } // 下記の「パス」セクションをご覧ください。
    ],
    fallback: true or false // 下記の「フォールバック」セクションをご覧ください。
  };
}
```

####`paths`キー（必須）

`paths`キーはどのパスがプリレンダリングされるかを決定します。たとえば、動的ルートを使った `pages/posts/[id].js` というページがあります。このページから `getStaticPaths` をエクスポートして `paths` に次のような値を返すとしましょう。

```js
return {
  paths: [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ],
  fallback: ...
}
```

Next.js はビルド時に `pages/posts/[id].js` でページコンポーネントを使って `静的に` posts/1`と`posts/2`を生成します。

各 `params` の値はページ名で使われたパラメータと一致しなければならないことに注意してください。

- ページ名が `pages/posts/[postId]/[commentId]` であれば、`params`は `postId` と `commentId` を含まなければなりません。
-`pages/[...slug] のように`ページ名が catch-all ルートを使用していれば、`params`は `slug` という配列を含まなければなりません。たとえば、この配列が `['foo', 'bar']` であれば、 Next.js は静的に `/foo/bar` というページを生成します。

#### `fallback`キー（必須）

`getStaticPaths`で返されるオブジェクトはブール値の `fallback` キーを含まなければなりません。

#### `fallback: false`

`fallback`が `false` であれば、`getStaticPaths`で返されないパスは全て**404 ページ**となります。プリレンダリングの必要なパスが少ない時に使えます。つまり、ビルド時に全てのパスが静的に生成されます。新しいページがあまり追加されないような時にも役立ちます。データソースに項目を増やして新しいページをレンダリングしたい場合には、再度ビルドする必要があります。

こちらは `pages/posts/[id].js` というページごとに 1 件のブログ記事をプリレンダリングする例です。ブログ記事の一覧は CMS から取得され、`getStaticPaths`で返されます。各ページでは、`getStaticProps`を使って CMS から記事データを取得します。この例は[ページのドキュメント](/docs/basic-features/pages.md)にもあります。

```jsx
// pages/posts/[id].js

function Post({ post }) {
  // 記事をレンダリングします...
}

// この関数はビルド時に呼び出されます。
export async function getStaticPaths() {
  // 外部APIエンドポイントを呼び出して記事を取得します。
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // 記事に基づいてプリレンダリングしたいパスを取得します
  const paths = posts.map(post => ({
    params: { id: post.id }
  }));

  // ビルド時にこれらのパスだけをプリレンダリングします。
  // { fallback: false } は他のルートが404になることを意味します。
  return { paths, fallback: false };
}

// ビルド時にも呼び出されます。
export async function getStaticProps({ params }) {
  // paramsは記事の`id`を含みます。
  // ルートが/posts/1のような時、params.id は1です。
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // 記事データをprops経由でページに渡します。
  return { props: { post } };
}

export default Post;
```

#### `fallback: true`

`fallback`が `true` の時、`getStaticProps`の振る舞いは変わります。

- `getStaticPaths`が返すパスはビルド時に HTML でレンダリングされます。
- ビルド時に生成されなかったパスは 404 ページには**なりません**。代わりに、Next.js はそのようなパス（[「フォールバックページ」](#fallback-pages)をご覧ください）への最初のリクエストに対して「フォールバック」版のページを提供します。
- バックグラウンドで、Next.js はリクスエストされたパスの HTML と JSON を静的に生成します。これは `getStaticProps` の実行を含みます。
- 完了したら、ブラウザは生成されたパスの JSON を受け取ります。これは必須の props を使ってページを自動的にレンダリングするのに使われます。
- 同時に、Next.js はこのパスをプリレンダリングされたページの一覧に追加します。同じパスに対する後続のリクエストは、ビルド時にプリレンダリングされた他のページと同じように生成されたページを提供します。

#### フォールバックページ

「フォールバック」版ページの特徴は下記のとおりです。

- ページの props は空になります。
- [ルーター](/docs/api-reference/next/router.md)を使うと、フォールバックがレンダリングされたことを検知でき、`route.isFallback`は `true` となります。

`isFallback`を使った例を示します。

```jsx
// pages/posts/[id].js
import { useRouter } from 'next/router';

function Post({ post }) {
  const router = useRouter();

  // ページが未生成の時、
  // getStaticProps() が実行完了するまで初期状態で表示されます。
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // 記事をレンダリングします...
}

// この関数はビルド時に呼び出されます。
export async function getStaticPaths() {
  return {
    // `/posts/1`と`/posts/2`だけがビルド時に生成されます。
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // `/posts/3`のような追加ページの静的生成を有効にします。
    fallback: true
  };
}

// ビルド時にも呼び出されます。
export async function getStaticProps({ params }) {
  // params は記事の`id`を含みます。
  // ルートが/posts/1のような時、params.idは1です。
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // 記事データをprops経由でページに渡します。
  return { props: { post } };
}

export default Post;
```

#### `fallback: true`がいつ役立つか？

`fallback: true`は、アプリケーションがデータに依存する多数の静的ページ（巨大な E コマースサイトなど）を持つ時に役立ちます。全商品のページをプリレンダリングしたくても、ビルドに膨大な時間がかかってしまうような時です。

代わりに、ページの小さなサブセットを静的に生成し、残りは `fallback: true` にできます。未生成のページがリクエストされると、ユーザーにはローディングインジケーターが表示されます。その直後に、`getStaticProps`が完了して、ページはリクエストされたデータでレンダリングされます。それ以降は、同じページがリクエストされると静的にプリレンダリングされたページが表示されます。

これにより、ユーザーは高速なビルドと静的生成の利点を保ったまま、常に高速な体験を得ることができます。

### `getStaticPaths`をいつ使うべきか？

動的ルートを使ったページを静的にプリレンダリングするときに `getStaticPaths` を使うと良いでしょう。

### TypeScript: `GetStaticPaths`を使う

TypeScript では、`next`から `GetStaticPaths` 型を利用できます。

```ts
import { GetStaticPaths } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
};
```

### 技術詳細

#### `getStaticProps`と一緒に使う

動的ルートパラメータを持つページで `getStaticProps` を使う時は `getStaticPaths` を使わなければなりません。

`getStaticPaths`と `getServerSideProps` は併用できません。

#### サーバー側でビルド時のみ実行

`getStaticPaths`はサーバー側のビルド時のみ実行されます。

#### ページ内でのみ許可

`getStaticPaths`は**ページ**からのみエクスポートできます。ページ以外のファイルからはエクスポートできません。

また、`export async function getStaticPaths() {}`を使わなければなりません。これは `getStaticPaths` をページコンポーネントのプロパティとして追加しても**動作しません**。

#### 開発中はリクエストごとに実行

開発中（`next dev`）は、`getStaticPaths`はリクエストごとに呼び出されます。

## `getServerSideProps`（サーバーサイドレンダリング）

`getServerSideProps`という `async` 関数をエクスポートすると Next.js はリクエストごとに `getServerSideProps` から返されるデータでプリレンダリングします。

```js
export async function getServerSideProps(context) {
  return {
    props: {} // ページコンポーネントにpropsとして渡されます。
  };
}
```

`context`パラメータは以下のキーを含むオブジェクトです。

- `params`: ページが動的ルートを使えば、`params`はルートパラメータを含みます。ページ名が `[id].js` であれば、`params`は `{ id: ... }` のようになります。詳細は[動的ルーティングのドキュメント](/docs/routing/dynamic-routes.md)をご覧ください。

- `req`: [HTTPインカミングメッセージオブジェクト](https://nodejs.org/api/http.html#http_class_http_incomingmessage)。
- `res`: [HTTPレスポンスオブジェクト](https://nodejs.org/api/http.html#http_class_http_serverresponse)。
- `query`: クエリストリング。
- `preview`: `preview`はページがプレビューモードであれば `true` 、そうでなければ `false` になります。[プレビューモードのドキュメント](/docs/advanced-features/preview-mode.md)をご覧ください。
- `previewData`: プレビューデータは `setPreviewData` によって設定されます。[プレビューモードのドキュメント](/docs/advanced-features/preview-mode.md)をご覧ください。

### 簡単な例

`getServerSideProps`を使ってリクエスト時にデータを取得してプリレンダリングする例を示します。この例は [ページのドキュメント](/docs/basic-features/pages.md)にもあります。

```jsx
function Page({ data }) {
  // データをレンダリングします...
}

// リクエストごとに呼び出されます。
export async function getServerSideProps() {
  // 外部APIからデータを取得します。
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // データをprops経由でページに渡します。
  return { props: { data } };
}

export default Page;
```

### `getServerSideProps`はいつ使うべきか？

`getServerSideProps`は、リクエスト時にデータを取得するページのプリレンダリングが必要な時のみ使うべきです。最初のバイトの所要時間（TTFB）は `getStaticProps` よりも遅くなります。サーバーはリクエストごとに演算しなければならず、その結果は追加設定なしで CDN にキャッシュされないためです。

データをプリレンダリングする必要がなければ、クライアント側でのデータ取得を検討すべきです。[詳細はこちら]](#fetching-data-on-the-client-side)。

### TypeScript: `GetServerSideProps`を使う

TypeScript では、`GetServerSideProps`型を `next` から利用できます。

```ts
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async context => {
  // ...
};
```

### 技術詳細

#### サーバー側でのみ実行

`getServerSideProps`はサーバー側でのみ実行され、ブラウザでは決して実行されません。ページが `getServerSideProps` を使うとこのような挙動になります。

- このページを直接リクエストすると、`getServerSideProps`はリクエスト時に実行され、返された props でプリレンダリングされます。
- `next/link`([ドキュメント](/docs/api-reference/next/link.md)) や `next/router` ([ドキュメント](/docs/api-reference/next/router.md)) でのクライアント側のページ遷移をリクエストすると Next.js は API リクエストをサーバーに送信します。続けて `getServerSideProps` を実行します。この挙動は全て自動的に Next.js によって処理されるため、`getServerSideProps`を定義しさえすれば他にやることはありません。

#### ページ内でのみ許可

`getServerSideProps`は**ページ**からのみエクスポートされます。ページ以外のファイルからはエクスポートされません。

また、`export async function getStaticPaths() {}`を使わなければなりません。これは `getServerSideProps` をページコンポーネントのプロパティとして追加しても**動作しません**。

## クライアント側でのデータ取得

ページが頻繁に更新されるデータを持ち、データをプリレンダリングする必要がないようであれば、クライアント側でデータ取得もできます。ユーザー固有のデータなどが該当します。このように機能します。

- 最初に、データなしのページを直ちに表示します。ページのパーツは静的生成によりプリレンダリングもできます。データがない箇所にはローディング状態を表示できます。
- 次に、クライアント側でデータを取得して準備ができたら表示します。

このアプローチは、ユーザーダッシュボードのようなページで活用できます。ダッシュボードはプライベートかつユーザー固有のページであり、SEO も不要なのでページをプリレンダリングする必要もないためです。データは頻繁に更新され、リクエスト時のデータ取得を必要とします。

### SWR

Next.js の開発チームはデータ取得用の [**SWR**](https://swr.now.sh/) という React フックを作成しました。クライアント側でデータ取得する際にはその利用を強くお勧めします。キャシュ、再バリデーション、フォーカスの追跡、一定間隔での再取得などを処理できます。このように使用します。

```jsx
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

[詳しくはSWRのドキュメントをご覧ください](https://swr.now.sh/)。

## もっと詳しく

次のセクションを読むことをお勧めします。

<div class="card">
  <a href="/docs/advanced-features/preview-mode.md">
    <b>プレビューモード</b>
    <small>Next.jsのプレビューモードについてはこちら。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/routing/introduction.md">
    <b>ルーティング</b>
    <small>Next.jsのルーティングについてはこちら。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/basic-features/typescript.md#pages">
    <b>TypeScript</b>
    <small>TypeScriptをページに追加します。</small>
  </a>
</div>
