---
description: Next.js は Cloudinary や Imgix などのようなサードパーティのローダーと同様に、画像最適化をビルトインでサポートしています。ここではそれについて詳しく学びましょう。
---

# 画像コンポーネントと画像最適化

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/image-component">画像コンポーネント</a></li>
  </ul>
</details>

バージョン **10.0.0** から、Next.js はビルトインの画像コンポーネントと自動的な画像最適化があります。

Next.js の画像コンポーネント, [`next/image`](/docs/api-reference/next/image.md) はモダン Web 用に進化した HTML `<img>` 要素の拡張です。

自動的な画像最適化により、ブラウザがサポートしている場合、 [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types) のようなモダンな形式で画像のサイズ変更、最適化及び提供が可能です。これはビューポートがより小さいデバイスに大きな画像を送信することを避けます。また、 Next.js が将来の画像形式を採用し、それらをサポートするブラウザへ提供できるようにします。

自動的な画像最適化は、どんな画像ソースに対しても機能します。画像が CMS などの外部データソースにホストされている場合でも、最適化できます。

ビルド時に画像を最適化する代わりに、 Next.js はユーザーのリクエストに応じてオンデマンドで画像を最適化します。静的サイトジェネレーターや静的のみのソリューションと異なり、 10 枚の画像を公開する場合でも 1,000 万枚の画像を公開する場合でも、ビルド時間は増加しません。

画像はデフォルトで遅延読み込みされます。つまりビューポート外の画像に対してページ速度が低下することはありません。画像はビューポートにスクロールされると読み込まれます。

画像は常に Google が[検索ランキングで使用](https://webmasters.googleblog.com/2020/05/evaluating-page-experience.html)する [Core Web Vital](https://web.dev/vitals/) である [Cumulative Layout Shift](https://web.dev/cls/) を回避するようにレンダリングされます。

## 画像コンポーネント

アプリケーションに画像を追加するには、 [`next/image`](/docs/api-reference/next/image.md) コンポーネントをインポートします:

```jsx
import Image from 'next/image'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}

export default Home
```

`next/image` コンポーネントで使用可能なすべてのプロパティを[表示します](/docs/api-reference/next/image.md)。

## 設定

`next/image` コンポーネントに使用可能な[プロパティを使う](/docs/api-reference/next/image.md)ことに加えて、オプションで `next.config.js` を介してより高度なユースケース用に画像最適化を設定できます。

### ドメイン

外部にホストされた画像を最適化するには、画像の `src` に絶対 URL を使用し、最適化できる `domains` を指定します。これは外部の　URL を悪用されないために必要です。 `loader` が外部の画像サービスに設定されている場合、このオプションは無視されます。

```js
module.exports = {
  images: {
    domains: ['example.com'],
  },
}
```

### ローダー

もし Next.js のビルトイン画像最適化を使う代わりにクラウドプロバイダーを使用して画像を最適化したい場合、ローダーとプレフィックスを設定できます。これにより画像の `src` に相対 URL を使用し、プロバイダーの正しい絶対 URL を自動的に生成できます。

```js
module.exports = {
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/',
  },
}
```

次の画像最適化クラウドプロバイダーが含まれます:

- [Vercel](https://vercel.com): Vercel にデプロイすると自動的に機能し、設定は必要ありません。[詳しく学ぶ](https://vercel.com/docs/next.js/image-optimization)
- [Imgix](https://www.imgix.com): `loader: 'imgix'`
- [Cloudinary](https://cloudinary.com): `loader: 'cloudinary'`
- [Akamai](https://www.akamai.com): `loader: 'akamai'`
- Default: `next dev`, `next start`, もしくはカスタムサーバーで自動的に機能します。

もし異なるプロバイダーが必要な場合、 `next/image` の [`loader`](/docs/api-reference/next/image.md#loader) プロパティを使用できます。

## キャッシュ

次にデフォルトの [ローダー](#loader) のキャッシュアルゴリズムについて説明します。他の全てのローダーについては、クラウドプロバイダーのドキュメントを参照してください。

画像はリクエストに対して動的に最適化され `<distDir>/cache/images`  ディレクトリに保存されます。最適化された画像ファイルは、有効期限に達するまで、後続のリクエストに対して提供されます。キャッシュされているが期限切れのファイルと一致するリクエストが生成されたとき、キャッシュファイルは削除されてから、新しい最適化された画像を生成され、新しいファイルがキャッシュされます。

有効期限（または最大経過時間）は、アップストリームサーバーの `Cache-Control` ヘッダーによって定義されます。

`s-maxage` が `Cache-Control` に見つかった場合、それを使用します。 `s-maxage` が見つからない場合、 `max-age` を使用します。 `max-age` が見つからない場合、 60 秒を使用します。

[`deviceSizes`](#device-sizes) と [`imageSizes`](#device-sizes) を設定して、生成され得る画像の総数を減らすことができます。

## Advanced

次の設定は高度なユースケース向けであり、通常は必要ありません。以下のプロパティを設定することを選択した場合、今後の Next.js のデフォルトへの変更を上書きします。

### デバイスサイズ

Web サイトのユーザーから予想されるデバイス幅が分かっている場合、 `deviceSizes` プロパティを使用してデバイス幅のブレークポイントのリストを指定できます。これらの幅は [`next/image`](/docs/api-reference/next/image.md) コンポーネントが `layout="responsive"` か `layout="fill"` を使用している場合に使用され、 Web サイトにアクセスするデバイスへ適切な画像が提供されます。

設定がないときは、以下のデフォルトが使用されます。

```js
module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
}
```

### 画像サイズ

`imageSizes` プロパティを使用して、画像の幅のリストを指定できます。これらの幅は、配列で連結されるため、 `deviceSizes` で定義された幅とは異なる（通常はより小さい）必要があります。これらの幅は、 [`next/image`](/docs/api-reference/next/image.md) コンポーネントが `layout="fixed"` か `layout="intrinsic"` を使用するときに使われます。

設定がないときは、以下のデフォルトが使用されます。

```js
module.exports = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

## 関連事項

次にやるべきこととして、以下のセクションをお勧めします:

<div class="card">
  <a href="/docs/api-reference/next/image.md">
    <b>next/image</b>
    <small>画像コンポーネントで使用可能な全てのプロパティを見る</small>
  </a>
</div>
