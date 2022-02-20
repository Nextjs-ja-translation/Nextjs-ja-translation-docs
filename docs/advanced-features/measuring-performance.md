---
description: Next.js の分析を使用してページのパフォーマンスを測定および追跡する
---

# パフォーマンス測定

[Next.js の分析](https://nextjs.org/analytics)には、さまざまな指標を用いてページのパフォーマンスを分析および測定できるリレー機能が組み込まれています。

You can start collecting your [Real Experience Score](https://vercel.com/docs/analytics#metrics) with zero-configuration on [Vercel deployments](https://vercel.com/docs/analytics). There's also support for Analytics if you're [self-hosting](https://vercel.com/docs/analytics#self-hosted).
The rest of this documentation describes the built-in relayer Next.js Analytics uses.

## Build Your Own

最初に、サポートされている指標を測定するには、[カスタム `App`](/docs/advanced-features/custom-app.md) コンポーネントを作成し、関数 `reportWebVitals` を定義します:

```js
// pages/_app.js
export function reportWebVitals(metric) {
  console.log(metric);
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

この関数は、ページのいずれかの指標について、最終的な値の計算が完了すると実行されます。
これを使用して、コンソールに結果を記録したり、特定のエンドポイントに送信できます。

関数に返される `metric` オブジェクトは、以下のプロパティで構成されます。

- `id`: 現在のページ読み込みにおける指標の一意な識別子
- `name`: 指標の名前
- `startTime`: First recorded timestamp of the performance entry in [milliseconds](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp) (if applicable)
- `value`: Value, or duration in [milliseconds](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), of the performance entry
- `label`: 指標のタイプ (`web-vital` または `custom`)

追跡される指標には 2 つのタイプがあります。

- Web Vitals
- カスタム指標

## Web Vitals

[Web Vitals](https://web.dev/vitals/) は、Web ページのユーザーエクスペリエンスを測定することを目的とした有用な指標のセットです。
次の Web Vitals がすべて含まれています。

- [Time to First Byte](https://developer.mozilla.org/ja/docs/Glossary/Time_to_first_byte) (TTFB)
- [First Contentful Paint](https://developer.mozilla.org/ja/docs/Glossary/First_contentful_paint) (FCP)
- [Largest Contentful Paint](https://web.dev/lcp/) (LCP)
- [First Input Delay](https://web.dev/fid/) (FID)
- [Cumulative Layout Shift](https://web.dev/cls/) (CLS)

これらの指標はすべて `web-vital` ラベルを使用して処理できます:

```js
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric); // metricオブジェクト({ id, name, startTime, value, label }) がコンソールに出力されます
  }
}
```

オプションで各指標を個別に処理できます:

```js
export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'FCP':
      // FCP の測定結果に対する処理を記述
      break;
    case 'LCP':
      // LCP の測定結果に対する処理を記述
      break;
    case 'CLS':
      // CLS の測定結果に対する処理を記述
      break;
    case 'FID':
      // FID の測定結果に対する処理を記述
      break;
    case 'TTFB':
      // TTFB の測定結果に対する処理を記述
      break;
    default:
      break;
  }
}
```

サードパーティのライブラリである [web-vitals](https://github.com/GoogleChrome/web-vitals) を用いて、これらの指標を測定します。 
指標によってはブラウザの互換性に依存するため、サポートされているブラウザを確認する場合は、[Browser Support](https://github.com/GoogleChrome/web-vitals#browser-support) セクションを参照してください。

## カスタム指標

上記の主要な指標に加えて、ページのハイドレートとレンダリングにかかる時間を測定する、いくつかのカスタム指標があります。

- `Next.js-hydration`: ページのハイドレーションが開始から終了するまでにかかる時間(ミリ秒)
- `Next.js-route-change-to-render`: ルーティング後、ページがレンダリングを開始するのにかかる時間(ミリ秒)
- `Next.js-render`: ルーティング後、ページのレンダリングが完了するまでにかかる時間(ミリ秒)

`custom` ラベルを使用して、これら指標についてすべての結果を処理できます:

```js
export function reportWebVitals(metric) {
  if (metric.label === 'custom') {
    console.log(metric); // metricオブジェクト({ id, name, startTime, value, label }) がコンソールに出力されます
  }
}
```

オプションで各指標を個別に処理できます:

```js
export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'Next.js-hydration':
      // ハイドレーションの結果に対する処理を記述
      break;
    case 'Next.js-route-change-to-render':
      // ルーティングからレンダリング開始までの結果に対する処理を記述
      break;
    case 'Next.js-render':
      // レンダリングの結果に対する処理を記述
      break;
    default:
      break;
  }
}
```

これらの指標は、[User Timing API](https://caniuse.com/#feat=user-timing) をサポートしているすべてのブラウザで機能します。

## 結果を analytics へ送信する

リレー機能を用いて任意の結果をアナリティクスのエンドポイントに送信すると、サイトのユーザーパフォーマンスを測定および追跡できます:

```js
export function reportWebVitals(metric) {
  const body = JSON.stringify(metric);
  const url = 'https://example.com/analytics';

  // 可能であれば `navigator.sendBeacon()` を使用し、そうでなければ`fetch()`にフォールバックします。
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}
```

> **備考**: [Google Analytics](https://analytics.google.com/analytics/web/) を使用している場合、
> `id` を使用して、手動でメトリックス分布を構築できます(割合の計算など)。
>
> ```js
> export function reportWebVitals({ id, name, label, value }) {
>   // Use `window.gtag` if you initialized Google Analytics as this example:
>   // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
>   window.gtag('event', name, {
>     event_category:
>       label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
>     value: Math.round(name === 'CLS' ? value * 1000 : value), // valueは整数のみ
>     eventLabel: id, // 現在のページで固有のIDを
>     nonInteraction: true // 直帰率のデータへの影響を回避する。
>   })
> }
> ```
>
> [Google Anaytics に結果を送信](https://github.com/GoogleChrome/web-vitals#send-the-results-to-google-analytics)についてはこちらをご覧ください。
## TypeScript

If you are using TypeScript, you can use the built-in type `NextWebVitalsMetric`:

```ts
// pages/_app.tsx

import type { AppProps, NextWebVitalsMetric } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export default MyApp
```