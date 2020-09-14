---
description: ページ内のAMPを有効にし、 Next.js がページに AMP を追加する方法を AMP の設定によって制御します。
---

# next/amp

<details>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/amp">AMP</a></li>
  </ul>
</details>

> AMP サポートは Next.js の高度な機能の 1 つです。詳細については、[こちら](/docs/advanced-features/amp-support/introduction.md)をご覧ください。

AMP を有効にするには、次の設定をページに追加します:

```jsx
export const config = { amp: true };
```

`amp` の設定は次の値を受け付けます:

- `true` - ページは AMP-only になります
- `'hybrid'` - ページは AMP を使用したものと HTML を使用したものの 2 つのバージョンを持ちます

`amp` の詳細設定については、以下のセクションをご覧ください。

## AMP の最初のページ

次の例をご覧ください:

```jsx
export const config = { amp: true };

function About(props) {
  return <h3>My AMP About Page!</h3>;
}

export default About;
```

上のページは AMP-only のページです。つまり:

- ページには Next.js または React によるクライアント側のランタイムがありません
- ページは [AMP Optimizer](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer) によって自動的に最適化されます。AMP Optimizer は AMP キャッシュと同様の変換をするオプティマイザであり、パフォーマンスを最大 42% 向上させます
- ページにはユーザーがアクセスできる（最適化された）バージョンのページと、検索エンジンのインデックス付け可能な（最適化されていない）バージョンのページがあります

## ハイブリッド AMP ページ

次の例をご覧ください:

```jsx
import { useAmp } from 'next/amp';

export const config = { amp: 'hybrid' };

function About(props) {
  const isAmp = useAmp();

  return (
    <div>
      <h3>My AMP About Page!</h3>
      {isAmp ? (
        <amp-img
          width="300"
          height="300"
          src="/my-img.jpg"
          alt="a cool image"
          layout="responsive"
        />
      ) : (
        <img width="300" height="300" src="/my-img.jpg" alt="a cool image" />
      )}
    </div>
  );
}

export default About;
```

上のページはハイブリッド AMP ページです。つまり:

- ページは従来の HTML（デフォルト）および、 AMP HTML（URL に `?amp=1` を追加することにより）としてレンダリングされます
- ページの AMP バージョンは、検索エンジンにインデックスされるよう、AMP Optimizer による有効な最適化のみが適用されています

ページは `useAmp` を使用してモードを区別しています。 `useAmp` はページが AMP を使用している場合は `true` を返し、そうでない場合は `false` を返す [React Hook](https://reactjs.org/docs/hooks-intro.html) です。
