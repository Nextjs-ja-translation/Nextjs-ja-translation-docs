---
description: ビルトインの Image コンポーネントを用いて画像最適化を有効にできます。
---

# next/image

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/image-component">Image コンポーネント</a></li>
  </ul>
</details>

<details>
  <summary><b>バージョン履歴</b></summary>

| バージョン   | 変更点                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------- |
| `v12.0.9` | `lazyRoot` prop 追加。                                                                             |
| `v12.0.0` | `formats` 設定追加。<br/>AVIF サポート追加。<br/>ラッパー `<div>` が `<span>` に変更。   |
| `v11.1.0` | `onLoadingComplete` と `lazyBoundary` props 追加。                                               |
| `v11.0.0` | `src` prop の静的インポートサポート。<br/>`placeholder` prop 追加。<br/>`blurDataURL` prop 追加。 |
| `v10.0.5` | `loader` prop 追加。                                                                              |
| `v10.0.1` | `layout` prop 追加。                                                                              |
| `v10.0.0` | `next/image` 導入。                                                                          |

</details>

> **備考: これは Image コンポーネントと画像最適化に関する API ドキュメントです。 Next.js における画像の概要や利用方法については、[Images](/docs/basic-features/image-optimization.md) をご覧ください。**

## 必要となる Props

`<Image />` コンポーネントは以下のプロパティを必要とします。

### src

以下のいずれか 1 つが必須です:

1. [静的にインポートされた](/docs/basic-features/image-optimization.md#local-images) 画像ファイル、または
2. パスの文字列。これは [loader](#loader) prop や [ローダー構成](#ローダー構成) に応じて、
外部 URL への絶対パスか内部パスのいずれかになります。

外部 URL を使用する場合は `next.config.js` の [domains](#ドメイン) に追加する必要があります。

### width

画像の幅 (ピクセル単位) を表します。単位のない整数である必要があります。

静的にインポートされた画像、または [`layout="fill"`](#layout) の場合を除いて必須です。

### height

画像の高さ (ピクセル単位) を表します。単位のない整数である必要があります。

静的にインポートされた画像、または [`layout="fill"`](#layout) の場合を除いて必須です。

## オプションの Props

`<Image />` コンポーネントは必要なプロパティ以外にも追加で多くのプロパティを受け入れます。
このセクションでは、Image コンポーネントで最も一般的に利用されるプロパティについて説明します。
使用頻度の低いプロパティの詳細については、[高度なProps](#高度なProps) セクションをご覧ください。

### layout

ビューポートのサイズが変更されたときの画像のレイアウト動作。

| `layout`              | 動作                                                 | `srcSet`                                                                                                    | `sizes` |
| --------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| `intrinsic` (デフォルト) | 画像サイズまで、コンテナの幅に合わせて縮小 | `1x`,`2x`([imageSizes](#画像の大きさ) に基づく)                                                            | N/A     |
| `fixed`               | `width` と `height` に正確にサイズ調整                   | `1x`,`2x` ([imageSizes](#画像の大きさ) に基づく)                                                            | N/A     |
| `responsive`          | コンテナの幅に合わせて拡大縮小                          | `640w`,`750w`, ...`2048w`,`3840w` ([imageSizes](#画像の大きさ) と [deviceSizes](#デバイスの大きさ) に基づく) | `100vw` |
| `fill`                | X 軸と Y 軸の両方で拡大し、コンテナを埋める              | `640w`,`750w`, ...`2048w`,`3840w` ([imageSizes](#画像の大きさ) と [deviceSizes](#デバイスの大きさ) に基づく) | `100vw` |

- [`intrinsic` layout のデモ (デフォルト)](https://image-component.nextjs.gallery/layout-intrinsic)
  - `intrinsic` を使う場合、画像は小さいビューポートの場合は寸法を縮小しますが、大きいビューポートの場合は元の寸法を維持します。
- [`fixed` layout のデモ](https://image-component.nextjs.gallery/layout-fixed)
  - `fixed` を使う場合、ネイティブの `img` 要素と同様に、ビューポートが変更されても (応答性がない場合) 、画像のサイズは変更されません。
- [`responsive` layout のデモ](https://image-component.nextjs.gallery/layout-responsive)
  - `responsive` を使う場合、画像は小さいビューポートの場合は寸法を縮小し、大きいビューポートの場合は拡大します。
  - 親要素がスタイルシートで `display: block` を使用していることを確認します。
- [`fill` layout のデモ](https://image-component.nextjs.gallery/layout-fill)
  - `fill` を使う場合、親要素が相対的である場合、画像は幅と高さの両方を親要素の寸法に合わせて拡大します。
  - これは通常、`objectFit` プロパティとペアになっています。
  - 親要素がスタイルシートで `position: relative` を使用していることを確認します。
- [background imageのデモ](https://image-component.nextjs.gallery/background)

### loader

URL を解決するために使用されるカスタム関数です。 loader を Image コンポーネントの prop として設定すると、[`next.config.js` の `images` オプション](#ローダー構成) で定義されているデフォルトのローダーがオーバーライドされます。

`loader` は次のパラメータを指定して、画像の URL 文字列を返す関数です。

- [`src`](#src)
- [`width`](#width)
- [`quality`](#quality)

以下が `next/image` でカスタムローダーを使用した例です:

```js
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const MyImage = (props) => {
  return (
    <Image
      loader={myLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

### sizes

様々なブレークポイントでの画像の幅に関する情報を提供する文字列です。`layout="response"` または `layout="fill"` を使用する場合、デフォルトは `100vw` (画面の全幅) です。

`layout="fill"` または `layout="response"` を使用している場合は、ビューポートの全幅よりも小さい画像に `sizes` を割り当てることが重要です。

例えば、親要素が画像を常にビューポート幅の半分未満に制限する場合は、`sizes="50vw"` を使用します。
`sizes` がないと、画像は本来必要とされる解像度の 2 倍の解像度で送信され、パフォーマンスが低下します。

`layout="intrinsic"` または `layout="fixed"` を使用している場合、上限幅はすでに制限されているため、`sizes` は必要ありません。

[もっと詳しく知る](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img#attr-sizes)

### quality

最適化された画像の品質です。 `1` から `100` までの整数で、`100` が最高の品質です。デフォルトは `75` です。

### priority

true の場合、画像は優先度が高く [preload](https://web.dev/preload-responsive-images/) すると見なされます。
`priority` を使用する画像の遅延読み込みは自動的に無効になります。

[Largest Contentful Paint (LCP)](https://nextjs.org/learn/seo/web-performance/lcp) 要素として検出された画像には `priority` プロパティを使用する必要があります。異なる画像は異なるビューポートサイズの LCP 要素である可能性があるため、複数の優先度のある画像を使用することが適切な場合もあります。

画像が above the fold 内に表示されている場合にのみ使用してください。デフォルトは `false` です。

### placeholder

placeholder は画像の読み込み中に使用します。可能な値は `blur` または `empty` です。デフォルトは `empty` です。

`blur` の場合、[`blurDataURL`](#blurdataurl) プロパティがプレースホルダーとして使用されます。`src` が [静的インポート](/docs/basic-features/image-optimization.md#local-images) のオブジェクトであり、インポートされた画像が `.jpg` 、`.png` 、`.webp` 、または `.avif` の場合、`blurDataURL` は自動的に入力されます。

動的画像の場合、[`blurDataURL`](#blurdataurl) プロパティを指定する必要があります。 [Plaiceholder](https://github.com/joe-bell/plaiceholder) などのソリューションは、`base64` の生成に役立ちます。

`empty` の場合、画像の読み込み中にプレースホルダーはなく、空のスペースのみが表示されます。

試してみてください:

- [`blur` プレースホルダーのデモ](https://image-component.nextjs.gallery/placeholder)
- [`blurDataURL` prop を使った光る効果のデモ](https://image-component.nextjs.gallery/shimmer)
- [`blurDataURL` prop を使った色の効果のデモ](https://image-component.nextjs.gallery/color)

## 高度な Props

場合によっては、より高度な使用法が必要になることがあります。 `<Image />` コンポーネントは、以下の高度なプロパティをオプションで設定できます。

### objectFit

`layout="fill"` を使用するときに、画像が親コンテナにどう収まるかを定義します。

この値は、`src` イメージの [object-fit CSS property](https://developer.mozilla.org/ja/docs/Web/CSS/object-fit) に渡されます。

### objectPosition

`layout="fill"` を使用するときに、画像が親要素内にどう配置されるかを定義します。
この値は、[object-position CSS property](https://developer.mozilla.org/ja/docs/Web/CSS/object-position) に渡され、画像に適用されます。

### onLoadingComplete

画像が完全に読み込まれ、[プレースホルダー](#placeholder) が削除されると呼び出されるコールバック関数です。

`onLoadingComplete` 関数は、次のプロパティを持つオブジェクトを 1 つのパラメータとして受け入れます。

- [`naturalWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth)
- [`naturalHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalHeight)

### loading

> **注意**: このプロパティは、高度な使用のみを目的としています。
> `eager` で画像をロードするように切り替えると、通常、**パフォーマンスが低下します**。
>
> 代わりに [`priority`](#priority) プロパティを使用することをお勧めします。
> これにより、ほぼすべてのユースケースで画像がすぐに読み込まれます。

画像の読み込み動作。デフォルトは `lazy` です。

`lazy` の場合、ビューポートから計算された距離に達するまで画像の読み込みを延期します。

`eager` の場合、即座に画像を読み込みます。

[もっと詳しく知る](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img#attr-loading)

### blurDataURL

`src` 画像の正常読み込み前にプレースホルダー画像として使用される [Data URL](https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)です。
[`placeholder="blur"`](#placeholder) と組み合わせた場合にのみ有効になります。

base64 でエンコードされた画像である必要があります。拡大してぼやけるので、非常に小さい画像 (10px 以下) をお勧めします。
プレースホルダーとして大きな画像を含めると、アプリケーションのパフォーマンスを低下させる可能性があります。

試してみてください:

- [デフォルトの `blurDataURL` prop のデモ](https://image-component.nextjs.gallery/placeholder)
- [`blurDataURL` prop を使った光る効果のデモ](https://image-component.nextjs.gallery/shimmer)
- [`blurDataURL` prop を使った色の効果のデモ](https://image-component.nextjs.gallery/color)

画像に一致する [単色のデータ URL を生成する](https://png-pixel.com) こともできます。

### lazyBoundary

ビューポートと画像の交差を検出し、遅延 [読み込み](#loading) をトリガーするために使用される境界ボックスとして機能する文字列 (margin プロパティと同様の構文) です。デフォルトは `"200px"` です。

画像がルートドキュメント以外のスクロール可能な親要素にネストされている場合は、[lazyRoot](#lazyroot) prop も割り当てる必要があります。

[もっと詳しく知る](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin)

### lazyRoot

React [Ref](https://ja.reactjs.org/docs/refs-and-the-dom.html) はスクロール可能な親要素を指します。
デフォルトは `null` (ドキュメントビューポート) です。

Ref は、基礎となる DOM 要素に [Ref を転送する](https://ja.reactjs.org/docs/forwarding-refs.html) DOM 要素または React コンポーネントを指している必要があります。

**DOM 要素を指している例**

```jsx
import Image from 'next/image'
import React from 'react'

const lazyRoot = React.useRef(null)

const Example = () => (
  <div ref={lazyRoot} style={{ overflowX: 'scroll', width: '500px' }}>
    <Image lazyRoot={lazyRoot} src="/one.jpg" width="500" height="500" />
    <Image lazyRoot={lazyRoot} src="/two.jpg" width="500" height="500" />
  </div>
)
```

**React コンポーネントを指している例**

```jsx
import Image from 'next/image'
import React from 'react'

const Container = React.forwardRef((props, ref) =>
  <div ref={ref} style={{ overflowX: 'scroll', width: '500px' }}>
    {props.children}
  </div>
})

const Example = () => {
  const lazyRoot = React.useRef(null)

  return (<Container ref={lazyRoot}>
    <Image lazyRoot={lazyRoot} src="/one.jpg" width="500" height="500" />
    <Image lazyRoot={lazyRoot} src="/two.jpg" width="500" height="500" />
  </Container>)
}
```

[もっと詳しく知る](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root)

### unoptimized

true の場合、品質、サイズ、形式を変更する代わりに、ソース画像がそのまま提供されます。デフォルトは `false` です。

## その他の Props

`<Image />` コンポーネントの他のプロパティは、以下を除いて、基となる img 要素に渡されます:

- `style` 。 代わりに `className` を使いましょう。
- `srcSet` 。 代わりに [Device Sizes](#デバイスの大きさ) を使いましょう。
- `ref` 。 代わりに [`onLoadingComplete`](#onloadingcomplete) を使いましょう。
- `decoding` 。 常に `"async"` です。

## 構成オプション

### ドメイン

悪意のあるユーザーからアプリケーションを保護するには、Next.js Image Optimization API から提供されるイメージプロバイダードメインのリストを定義する必要があります。これは、次に示すように、`next.config.js` ファイルの `domains` プロパティで構成されます:

```js
module.exports = {
  images: {
    domains: ['assets.acme.com'],
  },
}
```

### ローダー構成

Next.js に組み込まれている Image Optimization API を使用する代わりに、クラウドプロバイダーを使用して画像を最適化する場合は、`next.config.js` ファイルで `loader` と `path` プレフィックスを設定できます。これにより、Image [`src`](#src) に相対 URL を使用し、プロバイダーの正しい絶対 URL を自動的に生成できます。

```js
module.exports = {
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/',
  },
}
```

### ビルトインのローダー

次の画像最適化クラウドプロバイダーが含まれています:

- デフォルト: `next dev`、`next start`、またはカスタムサーバーで自動的に起動します。
- [Vercel](https://vercel.com): Vercel にデプロイすると自動的に機能し、構成は必要ありません。
[もっと詳しく知る](https://vercel.com/docs/next.js/image-optimization)
- [Imgix](https://www.imgix.com): `loader: 'imgix'`
- [Cloudinary](https://cloudinary.com): `loader: 'cloudinary'`
- [Akamai](https://www.akamai.com): `loader: 'akamai'`
- カスタム: `loader: 'custom'` は `next/image` コンポーネントに [`loader`](/docs/api-reference/next/image.md#loader) prop を実装して、カスタムクラウドプロバイダーを使用します

別のプロバイダーが必要な場合は、`next/image` で [`loader`](#loader) prop を使用できます。

> [`next export`](/docs/advanced-features/static-html-export.md) を使用してビルド時にイメージを最適化することはできず、オンデマンドでのみ最適化できます。`next export` で `next/image` を使用するには、デフォルトとは異なるローダーを使用する必要があります。[詳細についてはディスカッションをご覧ください。](https://github.com/vercel/next.js/discussions/19065)


> `next/image` コンポーネントのデフォルトのローダーは、インストールが迅速で開発環境に適しているため、[`squoosh`](https://www.npmjs.com/package/@squoosh/lib) を使用します。本番環境で `next start` を使用する場合、プロジェクトディレクトリで `yarn add sharp` を実行して [`sharp`](https://www.npmjs.com/package/sharp) をインストールすることを強くお勧めします。 `sharp` は自動的にインストールされるため、これはVercelのデプロイには必要ありません。

## 発展的な内容

以降は高度なユースケース用であり、通常は必要ありません。以下のプロパティを利用した場合、今後のアップデートで Next.js のデフォルトへの変更を上書きすることになるでしょう。

### デバイスの大きさ

ユーザーのデバイス幅を予想できる場合は、`next.config.js` の `deviceSizes` プロパティを使用して、デバイス幅のブレークポイントのリストを指定できます。これらの幅は、[`next/image`](/docs/api-reference/next/image.md) コンポーネントが `layout="response"` または `layout="fill"` を使用して、ユーザーのデバイスに正しい画像を提供する場合に使用されます。

設定されていない場合は、以下のデフォルトが使用されます。

```js
module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
}
```

### 画像の大きさ

`next.config.js` ファイルの `images.imageSizes` プロパティを使用して、画像の幅のリストを指定できます。これらの幅は、[device sizes](#デバイスの大きさ) の配列と連結されて、イメージ [srcsets](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset) の生成に使用されるサイズの完全な配列を形成します。

2 つの別々のリストがある理由は、imageSizes が [`sizes`](#sizes) の prop を提供する画像にのみ使用されるためです。これは、画像が画面の全幅よりも小さいことを示します。**したがって、imageSizes のサイズはすべて、deviceSizes の最小サイズよりも小さくする必要があります。**

設定されていない場合は、以下のデフォルトが使用されます。

```js
module.exports = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

### 許可されている形式

デフォルトの [画像最適化API](#ローダー構成) は、リクエストの `Accept` ヘッダーを介して、ブラウザでサポートされている画像形式を自動的に検出します。

`Accept` ヘッダーが複数の設定済み形式と一致する場合、配列内の最初の一致が使用されます。したがって、配列の順序が重要になります。一致するものがない場合、Image Optimization API は元の画像の形式にフォールバックします。

設定されていない場合は、以下のデフォルトが使用されます。

```js
module.exports = {
  images: {
    formats: ['image/webp'],
  },
}
```

次のようにすれば AVIF サポートを有効にできます。

```js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}
```

> 備考: AVIF は通常、エンコードに 20％ 長くかかりますが、WebP と比較して圧縮率は 20％ 小さくなります。これは、最初に画像がリクエストされたときは通常遅くなり、その後キャッシュされるリクエストは速くなることを意味します。

## キャッシュ動作

次に、デフォルト [ローダー](#loader) のキャッシュアルゴリズムについて説明します。他のすべてのローダーについては、クラウドプロバイダーのドキュメントを参照してください。

画像はリクエストに応じて動的に最適化され、`<distDir>/cache/images` ディレクトリに保存されます。最適化された画像ファイルは、有効期限に達するまで、後続のリクエストに提供されます。キャッシュされているが期限切れのファイルと一致するリクエストが行われると、キャッシュされたファイルは削除されてから、新しい最適化されたイメージが生成されて新しいファイルがキャッシュされます。

有効期限 (または最大経過時間) は、[`minimumCacheTTL`](#最小のキャッシュ存続時間) 構成またはアップストリームサーバーの `Cache-Control` ヘッダーのいずれか大きい方によって定義されます。具体的には、`Cache-Control` ヘッダーの `max-age` 値が使用されます。 `s-maxage` と `max-age` の両方が見つかった場合は、`s-maxage` が優先されます。

- アップストリームイメージに `Cache-Control` ヘッダーが含まれていない場合、または値が非常に低い場合に、キャッシュ期間を長くするように [`minimumCacheTTL`](#最小のキャッシュ存続時間) を設定できます。
- [`deviceSizes`](#デバイスの大きさ) と [`imageSizes`](#デバイスの大きさ) を構成して、生成される可能性のある画像の総数を減らすことができます。
- 単一の画像形式を優先して複数の形式を無効にするように [形式](/docs/basic-features/image-optimization.md#acceptable-formats) を設定できます。

### 最小のキャッシュ存続時間

キャッシュされた最適化画像の存続時間 (TTL) を秒単位で設定できます。多くの場合 [静的画像のインポート](/docs/basic-features/image-optimization.md#local-images) の利用をお勧めします。これにより、ファイルの内容が自動的にハッシュ化され、`immutable` に設定された `Cache-Control` ヘッダーを使用して画像が永久にキャッシュされます。

```js
module.exports = {
  images: {
    minimumCacheTTL: 60,
  },
}
```

ブラウザの `Cache-Control` ヘッダーを追加する必要がある場合 (非推奨) 、アップストリームイメージに [`headers`](/docs/api-reference/next.config.js/headers) を設定できます。 `/some-asset.jpg` は `/_next/image` 自体ではありません。

### 静的インポートの無効化

デフォルトの動作では、`import icon from './icon.png` のようにして静的ファイルをインポートし、それを `src` プロパティに渡すことができます。

いくつかのケースにおいて、インポートの動作が異なることを期待する他のプラグインと競合する場合は、この機能を無効にすることをお勧めします。

`next.config.js` 内で静的画像のインポートを無効にできます。

```js
module.exports = {
  images: {
    disableStaticImages: true,
  },
}
```

### Dangerously Allow SVG

デフォルトの [ローダー](#loader) はいくつかの理由で SVG 画像を最適化しません。まず最初の理由として、SVG はベクトル形式であるため、サイズを変更しても劣化しません。次に、SVG は HTML/CSS と同じ特徴を多く持っており、適切な [コンテンツセキュリティポリシー (CSP) ヘッダー](/docs/advanced-features/security-headers.md) が無いと脆弱性につながる可能性があります。

デフォルトの画像最適化 API で SVG 画像を提供する必要がある場合、`next.config.js` で `dangerouslyAllowSVG` と `contentSecurityPolicy` を設定できます:

```js
module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}
```

## 関連事項

Image コンポーネントの機能と使用ガイドラインの概要については、以下を参照してください:

<div class="card">
  <a href="/docs/basic-features/image-optimization.md">
    <b>Images</b>
    <small>Image コンポーネントを使用して画像を表示および最適化する方法を学びます。</small>
  </a>
</div>
