---
description: Next.js pagesとはpagesディレクトリ内のファイルからエクスポートされたReactコンポーネントです。どのように動作するか学んでいきましょう。
---

# Pages

> このドキュメントはNext.jsバージョン9.3以上を想定しています。
もし古いバージョンのNext.jsを使用する場合、[過去のドキュメント](https://nextjs.org/docs/tag/v9.2.2/basic-features/pages)を参照してください。

Next.jsでは、**ページ(page)**というのは`pages`ディレクトリ内の`.js`, `jsx`, `.ts`, `.tsx`ファイルから`export`された[React コンポーネント](https://ja.reactjs.org/docs/components-and-props.html) のことです。
それぞれのページのルーティングはファイル名によって決まります。

**例**: 以下のようなReactコンポーネントを`export`する`pages/about.js`というファイルを作成すると、`/about`へとアクセスできるようになります。

```jsx
function About() {
  return <div>About</div>;
}

export default About;
```

### Pagesにおける動的なルーティング

Next.jsのpagesは動的なルーティングをサポートしています。
例えば、`pages/posts/[id].js`というファイルを作成すると、`posts/1`, `posts/2`などにアクセスできます。

> 動的なルーティングについてさらに知るには、[動的なルーティングのドキュメント](/docs/routing/dynamic-routes.md) をご覧ください。

## プリレンダリング

通常、Next.jsはそれぞれのページを**事前にレンダリング**します。
つまり、クライアント側のJavaScriptでページ全体を生成する代わりに、それぞれのページのHTMLをあらかじめ生成します。
プリレンダリングは優れたパフォーマンスとSEOをもたらします。

生成されたそれぞれのHTMLには、そのページの生成に最低限必要なJavaScriptコードが関連づけられています。
ページがブラウザから読み込まれると、JavaScriptコードが走りページをインタラクティブなものにします。（この処理は_ハイドレーション_と呼ばれています。）

### プリレンダリングの2つの方式

Next.jsではプリレンダリングに関して**静的生成(Static Generation)**と**サーバーサイドレンダリング(Server-side Rendering)**の2つの方式が利用可能です。
これらの違いは、HTMLを**いつ**生成するかです。

- [**静的生成（推奨）**](#static-generation-recommended): **ビルド時**にHTMLが生成され、リクエストの度に再利用されます。
- [**サーバーサイドレンダリング**](#server-side-rendering): HTMLが**リクエストの度に**生成されます。

重要なのは、Next.jsではどちらのプリレンダリング方法を用いるかを、それぞれのページに対して**選ぶことができる**ということです。
つまり、ほとんどのページには静的生成を用い、残りのページにはサーバーサイドレンダリングを用いるといった、"ハイブリッド"な構成でNext.jsアプリを作ることができます。

パフォーマンスの観点から、サーバーサイドレンダリングよりも**静的生成**を用いることを**推奨**しています。
静的に生成されたページはCDNによりキャッシュされ、パフォーマンスが高まります。ただし、サーバーサイドレンダリングを選択せざるを得ない場合もあります。

**クライアントサイドレンダリング**も静的生成やサーバーサイドレンダリングと同様にいつでも用いることができます。
つまり、ページの特定部分をクライアント側のJavaScriptで丸ごとレンダーしても良いです。
これについてさらに知りたい場合には、[データ取得のドキュメント](/docs/basic-features/data-fetching.md#fetching-data-on-the-client-side)をご覧ください。

## 静的生成（推奨）

<details open>
  <summary><b>サンプル</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress">WordPressの例</a> (<a href="https://next-blog-wordpress.now.sh">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/blog-starter">Markdownファイルを用いたブログの例</a> (<a href="https://next-blog-starter.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/cms-datocms">DatoCMSを用いた例</a> (<a href="https://next-blog-datocms.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/cms-takeshape">TakeShapeを用いた例</a> (<a href="https://next-blog-takeshape.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/cms-sanity">Sanityを用いた例</a> (<a href="https://next-blog-sanity.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/cms-prismic">Prismicを用いた例</a> (<a href="https://next-blog-prismic.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/zeit/next.js/tree/canary/examples/cms-contentful">Contentfulを用いた例</a> (<a href="https://next-blog-contentful.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-strapi">Strapiを用いた例</a> (<a href="https://next-blog-strapi.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-agilitycms">Agility CMSを用いた例</a> (<a href="https://next-blog-agilitycms.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-cosmic">Cosmicを用いた例</a> (<a href="https://next-blog-cosmic.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-buttercms">ButterCMSを用いた例</a> (<a href="https://next-blog-buttercms.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-storyblok">Storyblokを用いた例</a> (<a href="https://next-blog-storyblok.now.sh/">デモ</a>)</li>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/cms-graphcms">GraphCMSを用いた例</a> (<a href="https://next-blog-graphcms.now.sh/">デモ</a>)</li>
    <li><a href="https://static-tweet.now.sh/">ツイートの静的埋め込みのデモ</a></li>
  </ul>
</details>

ページを**静的生成**するということは、そのページのHTMLを**ビルド時に**生成するということです。
本番用のアプリケーションでは、`next build`を実行するとHTMLが生成されます。
このHTMLはリクエストの度に再利用され、CDNによりキャッシュが可能です。

Next.jsでは、**外部データの取得の有無に関わらず**ページの静的生成が可能です。それぞれのケースについて見ていきましょう。

### 外部データの取得がない場合の静的生成

通常、Next.jsはデータを取得せずに静的生成によってページをプリレンダリングします。以下がその例です。

```jsx
function About() {
  return <div>About</div>;
}

export default About;
```

このページは外部からのデータ取得が必要ないことに留意してください。
このような場合、Next.jsはビルド時に1ページ当たり1つのHTMLファイルを生成します。

### 外部データの取得がある場合の静的生成

ページによってはプリレンダリング時に外部のデータを取得しなければならない場合があります。
これには以下2つのシナリオのいずれかあるいは両方が考えられます。
それぞれのケースにおいて、Next.jsの提供する以下の関数を用います。

1. ページの**コンテンツ**が外部データに依存する場合、`getStaticProps`を用いてください。
2. ページの**パス(path)**が外部データに依存する場合、`getStaticPaths`を用いてください（通常、`getStaticProps`と合わせて用いられます）。

#### シナリオ 1: ページの**コンテンツ**が外部データに依存する場合

**例**: ブログのページがCMS (コンテンツ管理システム)から投稿した記事を取得する必要がある場合。

```jsx
// TODO: ページをプリレンダリングする前に、
//       (APIのエンドポイントをコールして)`posts`を取得する必要あり
function Blog({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

export default Blog;
```

プリレンダリング時にデータを取得するために、Next.jsでは`getStaticProps`と呼ばれる`async`関数を同じファイルから`export`します。
この関数はビルド時に呼ばれ、取得されたデータをページのプリレンダリング時の`props`に渡します。

```jsx
function Blog({ posts }) {
  // 記事のレンダー
}

// この関数はビルド時に呼ばれる
export async function getStaticProps() {
  // 投稿記事を取得する外部APIエンドポイントをコール
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // { props: posts }を返すことで、ビルド時にBlogコンポーネントが
  // `posts`をpropとして受け取れる
  return {
    props: {
      posts
    }
  };
}

export default Blog;
```

`getStaticProps`の動作についてさらに知るためには、[データ取得のドキュメント](/docs/basic-features/data-fetching.md#getstaticprops-static-generation)をご覧ください。

#### シナリオ 2: ページのパス(path)が外部データに依存する場合

Next.jsでは**動的なルーティング**によるページの生成が可能です。例えば、`id`に紐づくブログ投稿を表示するためには、`pages/posts/[id].js`というファイルを作成します。
これにより、`posts/1`にアクセスすると`id: 1`の投稿内容が表示されます。

> 動的ルーティングについてさらに知るためには、[動的ルーティングのドキュメント](/docs/routing/dynamic-routes.md)をご覧ください。

しかしながら、どの`id`をビルド時にプリレンダリングするかが外部データに依存する可能性があります。

**例**: データベースに`id: 1`のブログ記事のみが追加された場合を考えてみましょう。この場合、ビルド時にプリレンダリングによってページを生成したいのは`posts/1`のみです。

後になって`id: 2`のブログ記事を追加するとしましょう。今度はビルド時に`posts/2`もプリレンダリングする必要があります。

つまり、プリレンダリングするページの**パス**は外部のデータに依存します。外部データに依存するパスを扱うために、Next.jsでは`getStaticPaths`という`async`関数を`export`します。（今回の場合、`pages/posts/[id].js`に追加します。）


```jsx
// この関数はビルド時に呼ばれる
export async function getStaticPaths() {
  // 記事を取得する外部APIのエンドポイントをコール
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // 記事にもとづいてプリレンダするパスを取得
  const paths = posts.map(post => `/posts/${post.id}`);

  // 設定したパスのみ、ビルド時にプリレンダ
  // { fallback: false } は、他のルートが404になるという意味
  return { paths, fallback: false };
}
```

`pages/posts/[id].js`は、`id`のブログ記事の内容を取得してページをプリレンダリングするために、`getStaticProps`も合わせて`export`する必要があります。


```jsx
function Post({ post }) {
  // 記事のレンダー
}

export async function getStaticPaths() {
  // ...
}

// この関数もビルド時に呼ばれる
export async function getStaticProps({ params }) {
  // `params`は`id`の記事内容を含む
  // ルートが/posts/1とすると、params.idは1となる
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // propsを通じてpostをページに渡す
  return { props: { post } };
}

export default Post;
```

`getStaticPaths`の動作についてさらに知りたい場合には、[データ取得のドキュメント](/docs/basic-features/data-fetching.md#getstaticpaths-static-generation)をご覧ください。

### どのような場合に静的生成を行うべきか？

ページは一度だけビルドしてしまえばCDNによって配信できるので、（データ取得の有無に関わらず）可能な限り**静的生成**を行うことを推奨しています。
これにより、それぞれのリクエストに対してサーバー側でHTMLを生成するよりもずっと高速になります。

静的生成は以下のような様々なページに対して行うことができます。

- マーケティングのページ
- ブログ記事
- eコマースの製品リスト
- ヘルプやドキュメント

「このページはユーザのリクエストより**前に**コンテンツを準備しておくことが可能か？」と自分自身に問いかけてみてください。
もし答えがYESなら、静的生成を選択すべきでしょう。

一方、ユーザーのリクエストよりも前にページの内容を準備できない場合、静的生成は推奨されません。
ページに含まれる情報が頻繁に更新され、リクエストの度に内容が変わることもあり得るでしょう。

このような場合には、以下の方法をとることができます。

- **クライアントサイドレンダリング**と静的生成を併用する: ページの一部のプリレンダリングを一旦飛ばし、クライアント側のJavaScriptを使って残りを表示させます。
このアプローチについてさらに知るためには、[データ取得のドキュメント](/docs/basic-features/data-fetching.md#fetching-data-on-the-client-side)をご覧ください。
- **サーバーサイドレンダリング**を用いる: Next.jsがそれぞれのリクエストに対してプリレンダリングします。
CDNによるキャッシュができないので表示が遅くなりますが、常に最新の情報が表示されます。このアプローチについてこれから説明します。


## サーバーサイドレンダリング

> "SSR"や"ダイナミックレンダリング"とも呼ばれます。

**サーバーサイドレンダリング**を用いると、ページのHTMLが**リクエストの度に**生成されます。

サーバーサイドレンダリングを使うためには、`getServerSideProps`と呼ばれる`async`関数を`export`する必要があります。この関数はリクエストごとにサーバー側で呼ばれます。

例えば、ページの表示に用いるデータ（外部のAPIから取得する）が頻繁に更新される場合を考えましょう。この場合、以下のように`getServerSideProps`を追加することで、データを取得して`Page`に渡す処理を行うことができます。

```jsx
function Page({ data }) {
  // 記事のレンダー
}

// この関数はリクエストのたびに呼ばれる
export async function getServerSideProps() {
  // 外部のAPIからデータを取得
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // propsを通してdataを渡す
  return { props: { data } };
}

export default Page;
```

見ての通り、`getServerSideProps`は`getStaticProps`とよく似ています。両者の違いは、`getServerSideProps`がビルド時ではなくリクエストの度に呼ばれることです。

`getServerSideProps`の動作についてさらに知りたい場合には、[データ取得のドキュメント](/docs/basic-features/data-fetching.md#getserversideprops-server-side-rendering)をご覧ください。

## まとめ

Next.jsのプリレンダリングの方法として、以下の2つについて説明しました。

- **静的生成（推奨）:** HTMLは**ビルド時に**生成され、それぞれのリクエストに対して再利用されます。
静的生成では、ページの内容を`export`するか、`getStaticProps`（必要であれば`getStaticPaths`も）を`export`してください。
ユーザーからのリクエストの前に, ページをプリレンダリングできるということは素晴らしいことです。クライアントサイドレンダリングと併用することで、追加のデータもレンダリングすることができます。
- **サーバーサイドレンダリング:** HTMLは**リクエストの度に**生成されます。サーバーサイドレンダリングを行うためには、`getServerSideProps`を`export`してください。
サーバーサイドレンダリングは静的生成に比べて動作が遅くなるため、どうしても必要な場合にのみ使用してください。

## 関連

以下のセクションを次に読むことをお勧めします。

<div class="card">
  <a href="/docs/basic-features/data-fetching.md">
    <b>データの取得:</b>
    <small>Next.jsのデータ取得について学びましょう。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/advanced-features/preview-mode.md">
    <b>プレビューモード:</b>
    <small>Next.jsのプレビューモードについて学びましょう。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/routing/introduction.md">
    <b>ルーティング:</b>
    <small>Next.jsのルーティングについて学びましょう。</small>
  </a>
</div>

<div class="card">
  <a href="/docs/basic-features/typescript.md#pages">
    <b>TypeScript:</b>
    <small>ページにTypeScriptを追加しましょう。</small>
  </a>
</div>
