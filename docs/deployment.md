---
description: Next.js アプリを Vercel やその他のホスティング方法を使って本番環境にデプロイします。
---

# デプロイ

## Vercel (推奨)

Next.jsを本番環境にデプロイする最も簡単な方法は、Next.jsの開発者が提供する**[Vercel platform](https://vercel.com)**を利用することです。[Vercel](https://vercel.com)は、静的サイト・JAMstackなアーキテクチャでのデプロイ、サーバーレスファンクション機能をサポートするグローバルCDNを備えたオールインワンプラットフォームです。

### はじめに

はじめに、Next.js アプリを任意の Git プロバイダーにプッシュしてください。[GitHub](http://github.com/)、[GitLab](https://gitlab.com/)、[BitBucket](https://bitbucket.org/)などです。リポジトリはプライベートとパブリックのどちらでも構いません。

次に、以下の手順に従ってください:

1. [Vercelにサインアップする](https://vercel.com/signup) （クレジットカードの登録は不要）。
2. サインアップ後に、[「Import Project」](https://vercel.com/import)ページに遷移します。「From Git Repository」でデプロイに使用する Git プロバイダーを選択し、設定をします。(設定は各プロバイダーで次の手順で行います: [GitHub](https://vercel.com/docs/v2/git-integrations/vercel-for-github) / [GitLab](https://vercel.com/docs/v2/git-integrations/vercel-for-gitlab) / [BitBucket](https://vercel.com/docs/v2/git-integrations/vercel-for-bitbucket)).
3. 設定が完了したら、「Import Project From ...」をクリックしてNext.jsアプリをVercelにインポートします。アプリがNext.jsを使用していることが自動検出され、ビルド設定が設定されます。何も変更する必要はありません。
4. インポート後、Next.jsアプリはデプロイされ、デプロイ用URLが提供されます。「Visit」をクリックして、デプロイされたアプリを確認しましょう。

おめでとうございます！Next.jsアプリのデプロイが完了しました。疑問点がある場合は、[Vercel documentation](https://vercel.com/docs) を参照してください。

> [カスタムサーバー](/docs/advanced-features/custom-server.md)を使用している場合は、代替手法への移行を強くお勧めします(例えば、[動的ルーティング](/docs/routing/dynamic-routes.md)を使用するなど)。移行できない場合は、[他のホスティング方法](#other-hosting-options)を検討してください。

### DPS: 開発（Develop）、プレビュー（Preview）、公開（Ship）

ここでは、[Vercel](https://vercel.com)が推奨するワークフローについて説明します。[Vercel](https://vercel.com)では、**DPS**ワークフローと呼ばれるものをサポートしています。**DPS**とは、開発（**D**evelop）・プレビュー（**P**review）・出荷（**S**hip）のことです。

- **開発（Develop）:** Next.js のコードを書きましょう。開発サーバーを稼働させておき、[React Fast Refresh](https://nextjs.org/blog/next-9-4#fast-refresh)を活用しましょう。
- **プレビュー（Preview）:** GitHub / GitLab / BitBucket 上に変更をプッシュするたびに、自動的に一意の URL を持つ新しいデプロイを実施します。
プルリクエストを開くと GitHub で見ることができますし、Vercel のプロジェクトページの「デプロイメントのプレビュー」で見ることもできます。[詳細はこちらをご覧ください](https://vercel.com/features/deployment-previews)。
- **公開（Ship）:** 本番環境で公開する準備ができたら、プルリクエストをデフォルトのブランチ (例: `master`) にマージします。Vercel  は自動的に本番環境へのデプロイを行います。

DPS ワークフローを使用することで、_コードレビュー_ に加えて、_デプロイ前のプレビュー_ を行うことができます。各デプロイはユニークな URL を生成し、それを共有したり、統合テストに使用したりできます。

### Next.js のための最適化

[Vercel](https://vercel.com)は、Next.jsのクリエイターが作ったもので、Next.jsを最も手厚くサポートしています。

例えば、[ハイブリッドページ](/docs/basic-features/pages.md)については完全にサポートされています。

- 各ページについて[静的サイト生成]（/docs/basic-features/pages.md#static-generation）または[サーバサイドレンダリング]（/docs/basic-features/pages.md#server-side-rendering）を使用できます。
- [静的サイト生成]（/docs/basic-features/pages.md#static-generation）により生成される各種アセット（JS、CSS、画像、フォントなど）を使用したページは、自動的に[Vercel Smart CDN](https://vercel.com/smart-cdn)から配信されます。
- [サーバサイドレンダリング](/docs/basic-features/pages.md#server-side-rendering) と [APIルート](/docs/api-routes/introduction.md) を使用しているページは、独立したサーバレス関数へと自動的に変換してデプロイします。これにより、レンダリングとAPIリクエストを無限にスケールさせることができます。

### カスタムドメイン、環境変数、自動HTTPS（SSL化） など

- **カスタムドメイン:** [Vercel](https://vercel.com) にデプロイするNext.jsアプリはカスタムドメインを割り当て可能です。[こちらのドキュメントを参照してください](https://vercel.com/docs/v2/custom-domains)。
- **環境変数:** Vercel では環境変数を設定できます。詳細は、[ここにあるドキュメント](https://vercel.com/docs/v2/build-step#using-environment-variables-and-secrets) を参照してください。Next.js アプリ内で[これらの環境変数](/docs/api-reference/next.config.js/environment-variables.md)を使用できます。
- **自動HTTPS（SSL化）:** HTTPSはデフォルトで有効になっており（カスタムドメインを含む）、余分な設定は必要ありません。SSL証明書は自動で更新されます。
- **その他:** Vervel というプラットフォームをさらに知るために[ドキュメント](https://vercel.com/docs)をご覧ください。

## その他のホスティング方法

### Node.jsサーバー

Next.jsはNode.jsに対応しているホスティング環境であれば、どこにでもデプロイできます。
[カスタムサーバー](/docs/advanced-features/custom-server.md)を使用している場合はこのようなアプローチになります。

あなたの `package.json` に `"build"` と `"start"` のスクリプトが含まれていることを確認してください。

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

`next build`スクリプトは `.next` フォルダ内に本番用アプリケーションをビルドします。
ビルド後に実行する `next start` により、静的に生成されたページとサーバサイドでレンダリングされたページ の[ハイブリッドページ](/docs/basic-features/pages.md) をサポートする Node.js サーバを起動します。

### 静的 HTML の出力

Next.js アプリを静的 HTML へと出力したい場合は、[ドキュメント](/docs/advanced-features/static-html-export.md)の指示に従ってください。デフォルトでは、`next export`によって`out`ディレクトリが生成され、 CDN や静的サイトホスティングサービスで配信することができます。

> ご利用の Next.js アプリが完全に静的サイトの場合でも、[Vercel](https://vercel.com/) を使用することを強くお勧めします。[Vercel](https://vercel.com/) は、静的な Next.js アプリが非常に高速に動作するように最適化されています。`next export` は、Vercel では設定を一切行わずにデプロイしても動作します。
