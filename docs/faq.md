---
description: Get to know more about Next.js with the frequently asked questions.
---

# よくある質問

<details>
  <summary>どのブラウザに対応していますか？</summary>
  <p>Next.js は <a href="https://new.babeljs.io/docs/en/next/babel-preset-env.html">@babel/preset-env</a> を利用することで IE11 と全てのモダンブラウザに対応しています。また IE11 に対応するため、 Next.js は Promise polyfill をグローバルインストールしています。</p>

  <p>目的のブラウザが対応していない機能を必要とするコードや外部 npm パッケージを使用する場合は、 Polyfill を実装する必要があります。 Polyfill を実装する必要がある場合、 <a href="https://github.com/vercel/next.js/tree/canary/examples/with-polyfills">Polyfill</a> のサンプルで推奨されている方法を見ることができます。</p>
</details>

<details>
  <summary>製品利用することはできますか？</summary>
  <p><a href="https://vercel.com">https://vercel.com</a> は当初から Next.js で実装されています。</p>

  <p>開発経験とエンドユーザーのパフォーマンスの双方にとって満足いくものになったと考えたため、コミュニティに共有することを決めました。</p>
</details>

<details>
  <summary>ファイルサイズはどれくらいですか？</summary>
  <p>クライアントサイドのバンドルサイズはアプリごとに計測されるべきですが、 Next のメインバンドルは gzip 形式で約 65kb に圧縮されています。</p>
</details>

<details>
  <summary>webpack の内部設定を変えるにはどうすればいいですか？</summary>
  <p>Next.js は webpack 設定のオーバーヘッドを無くすように最善を尽くしています。 しかし、独自で設定する必要がある場合は、こちらの <a href="/docs/api-reference/next.config.js/custom-webpack-config.md">webpack 設定のカスタマイズのドキュメント</a>を見てください。</p>
</details>

<details>
  <summary>コンパイルされている構文機能は何ですか？ それを変更するにはどうしたらいいですか？</summary>
  <p>V8 を踏襲しています。 V8 は ES6 と async/await をサポートしてきたので Next.js にもコンパイルされています。 V8 はクラスデコレーターをサポートしていないので Next.js でもコンパイルされていません。</p>

  <p>もっと知りたい場合は <a href="/docs/advanced-features/customizing-babel-config.md">babel 設定のカスタマイズ</a>のドキュメントを見てください。</p>
</details>

<details>
  <summary>なぜ新しいルーターなのですか？</summary>
  Next.js には以下の特徴があります:
  <ul>
    <li>ルーティングは事前に知られておく必要はなく、ルートマニフェストを送りません</li>
    <li>ルーティングは常に遅延読み込みが可能です</li>
  </ul>
</details>

<details>
  <summary>データを取得するにはどうすればいいですか？</summary>
  <p>好きな方法を選ぶことができます。 React コンポーネント内でリモートデータを取得するには、 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">fetch API</a> か <a href="https://swr.now.sh/">SWR</a> のどちらかを使うことができます。 もしくは Next.js 独自の<a href="/docs/basic-features/data-fetching.md">データ取得メソッド</a>を使って初期データ群を取得することができます。</p>
</details>

<details>
  <summary>GraphQL と一緒に使えますか？</summary>
  <p>使えます！ <a href="https://github.com/vercel/next.js/tree/canary/examples/with-apollo">example with Apollo</a> を見てください。</p>
</details>

<details>
  <summary>Reduxと一緒に使えますか？</summary>
  <p>使えます！ <a href="https://github.com/vercel/next.js/tree/canary/examples/with-redux">example</a> を見てください。 <a href="https://github.com/vercel/next.js/tree/canary/examples/with-redux-thunk">example with thunk</a> もあります。</p>
</details>

<details>
  <summary>静的ファイルのために CDN を使うことはできますか？</summary>
  <p>はい。<a href="/docs/api-reference/next.config.js/cdn-support-with-asset-prefix.md">こちら</a>に詳しく書いてあります。</p>
</details>

<details>
  <summary>Next でお気に入りの JavaScript ライブラリやツールを使うことはできますか？</summary>
  <p>最初のリリース以来、多くの他ライブラリやツールとの併用例がコントリビュートされてきました。 <a href="https://github.com/vercel/next.js/tree/canary/examples">examples</a> ディレクトリで見ることができます。</p>
</details>

<details>
  <summary>何から影響を受けて開発されましたか？</summary>
  <p>私たちが設定した達成目標の多くは、 Guillermo Rauch の <a href="https://rauchg.com/2014/7-principles-of-rich-web-applications">7 principles of Rich Web Applications</a> に記されているものです。</p>

  <p>PHP の使いやすさから大きな影響を受けています。 HTML を出力するために PHP を使わなければならない多くの場合において、 Next.js は最適な代替手段になると思っています。</p>

  <p>PHP とは違って ES6 モジュールシステムの恩恵を受けることができ、ページ毎にコンポーネントや関数がエクスポートされることで遅延評価やテストを簡単に導入することができます。</p>

  <p>手間がかからない React のサーバーサイドレンダリングの選択肢を調査していた時、 Next.js と似た手法を取っている <a href="https://github.com/facebookarchive/react-page">react-page</a> （現在は非推奨）に出会いました。これは React の製作者である Jordan Walke によるものです。</p>
</details>
