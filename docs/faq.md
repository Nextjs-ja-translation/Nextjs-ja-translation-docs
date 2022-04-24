---
description: よくある質問を通して Next.js について理解を深めましょう。
---

# よくある質問

<details>
  <summary>製品利用することはできますか？</summary>
  <p>Yes! Next.js is used by many of the top websites in the world. See the
  <a href="https://nextjs.org/showcase">Showcase</a> for more info.</p>
</details>

<details>
  <summary>データを取得するにはどうすればいいですか？</summary>
  Next.js provides a variety of methods depending on your use case. You can use:
  <ul>
    <li> Client-side rendering: Fetch data with <a href="/docs/basic-features/data-fetching/client-side.md#client-side-data-fetching-with-useeffect">useEffect</a> or <a href="/docs/basic-features/data-fetching/client-side.md#client-side-data-fetching-with-swr">SWR</a> inside your React components</li>
    <li> Server-side rendering with <a href="/docs/basic-features/data-fetching/get-server-side-props.md">getServerSideProps</a></li>
    <li> Static-site generation with <a href="/docs/basic-features/data-fetching/get-static-props.md">getStaticProps</a></li>
    <li> Incremental Static Regeneration by <a href="/docs/basic-features/data-fetching/incremental-static-regeneration.md">adding the `revalidate` prop to getStaticProps</a></li>
  </ul>
  To learn more about data fetching, visit our <a href="/docs/basic-features/data-fetching/overview.md">data fetching documentation</a>.
</details>

<details>
  <summary>なぜ Next.js は独自のルーターを持ってますか？</summary>
  Next.js には以下の特徴があります:
  <ul>
    <li>It uses a file-system based router which reduces configuration</li>
    <li>It supports shallow routing which allows you to change the URL without running data fetching methods</li>
    <li>ルーティングは常に遅延読み込みが可能です</li>
  </ul>
    If you're migrating from React Router, see the <a href="/docs/migrating/from-react-router.md">migration documentation</a>.
</details>

<details>
  <summary>Next でお気に入りの JavaScript ライブラリやツールを使うことはできますか？</summary>
  <p>使えます！何百もの<a href="https://github.com/vercel/next.js/tree/canary/examples">ディレクトリ例</a>があります。</p>
</details>

<details>
  <summary>GraphQL と一緒に使えますか？</summary>
  <p>使えます！ <a href="https://github.com/vercel/next.js/tree/canary/examples/with-apollo">Apollo を使ったサンプル</a> を見てください。</p>
</details>

<details>
  <summary>Reduxと一緒に Next.js を使えますか？</summary>
  <p>使えます！ こちらの<a href="https://github.com/vercel/next.js/tree/canary/examples/with-redux">サンプル</a> を見てください。 <a href="https://github.com/vercel/next.js/tree/canary/examples/with-redux-thunk">thunk を用いたサンプル</a> もあります。</p>
</details>

<details>
  <summary>Can I make a Next.js Progressive Web App (PWA)?</summary>
   <p>Yes! Here's our <a href="https://github.com/vercel/next.js/tree/canary/examples/progressive-web-app">Next.js PWA Example</a>.</p>
</details>

<details>
  <summary>静的ファイルのために CDN を使うことはできますか？</summary>
  <p>Yes! When you deploy your Next.js application to <a href="https://vercel.com">Vercel</a>, your static assets are automatically detected and served by the Edge Network. If you self-host Next.js, you can learn how to manually configure the asset prefix <a href="/docs/api-reference/next.config.js/cdn-support-with-asset-prefix.md">here</a>.</p>
</details>


<details>
  <summary>webpack の内部設定を変えるにはどうすればいいですか？</summary>
  <p>In most cases, no manual webpack configuration is necessary since Next.js automatically configures webpack. For advanced cases where more control is needed, refer to the <a href="/docs/api-reference/next.config.js/custom-webpack-config.md">custom webpack config documentation</a>.</p>
</details>

<details>
  <summary>Next.js は何から影響を受けましたか？</summary>
  <p>私たちが設定した達成目標の多くは、 Guillermo Rauch の <a href="https://rauchg.com/2014/7-principles-of-rich-web-applications">7 principles of Rich Web Applications</a> に記されているものです。</p>

  <p>PHP の使いやすさから大きな影響を受けています。 HTML を出力するために PHP を使わなければならない多くの場合において、 Next.js は最適な代替手段になると思っています。</p>

  <p>PHP とは違って ES6 モジュールシステムの恩恵を受けることができ、ページ毎にコンポーネントや関数がエクスポートされており、遅延評価やテストのためにそれらを簡単にインポートできます。</p>

  <p>手間がかからない React のサーバーサイドレンダリングの選択肢を調査していた時、 Next.js と似た手法を取っている <a href="https://github.com/facebookarchive/react-page">react-page</a> （現在は非推奨）に出会いました。これは React の製作者である Jordan Walke によるものです。</p>
</details>
