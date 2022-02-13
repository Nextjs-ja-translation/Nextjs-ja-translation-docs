# マルチゾーン

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-zones">マルチゾーン</a></li>
  </ul>
</details>

ゾーンとは Next.js アプリケーションの単一のデプロイメントのことです。複数のゾーンを単一のアプリケーションに統合もできます。

例えば、以下のアプリケーションがあるとします:

- `/blog/**` を配信するためのアプリケーション
- 他のすべてのページを配信するための別のアプリケーション

マルチゾーンのサポートにより、これら両方のアプリケーションを 1 つに統合して単一の URL から閲覧できるようにしながらも、両方のアプリケーションを独立して開発・デプロイできます。

## ゾーンを定義する方法

ゾーンに関係した API はありません。必要な作業は以下だけです:

- アプリケーションに必要なページのみを保持するようにしてください。これは、あるアプリケーションが別のアプリケーションのページを保持できないことを意味します。もしもアプリケーション `A` に `/blog` が存在している場合は、アプリケーション `B` はそれを持つべきではありません。
- ページと静的ファイルのコンフリクトを避けるために、[basePath](/docs/api-reference/next.config.js/basepath.md) を設定してください。

## ゾーンを統合する方法

[Rewrites](/docs/api-reference/next.config.js/rewrites.md) は任意の HTTP プロキシを使用してゾーンを統合できます。

[Vercel](https://vercel.com/) の場合、 [monorepo](https://vercel.com/blog/monorepos) を使うことで両方のアプリケーションをデプロイできます。 より詳しい詳細は [Monorepos blog post](https://vercel.com/blog/monorepos) を、 複数の Next.js アプリケーションを使った詳しいガイドは [`with-zones` example](https://github.com/vercel/next.js/tree/canary/examples/with-zones) を確認してください。