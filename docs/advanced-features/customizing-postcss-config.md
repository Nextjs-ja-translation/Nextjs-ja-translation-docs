---
description: Next.jsで追加したPostCSSの設定とプラグインを独自に拡張します。
---

# PostCSS設定のカスタマイズ

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss">Tailwind CSS の例</a></li>
  </ul>
</details>

## デフォルトの挙動

Next.js では、PostCSS を使って[組み込み用のCSS](/docs/basic-features/built-in-css-support)をコンパイルしています。

何も設定していなくても、Next.js は以下のような変換によって CSS をコンパイルします:

1. [Autoprefixer](https://github.com/postcss/autoprefixer) は、CSS ルールセットにベンダープレフィックスを自動的に追加します（IE11 に戻す）。
1. [クロスブラウザのFlexboxのバグ](https://github.com/philipwalton/flexbugs)が[仕様](https://www.w3.org/TR/css-flexbox-1/)通りに動作するように修正されます。
1. 新しい CSS の機能は、Internet Explorer 11 との互換性のために自動的にコンパイルされます:
   - [`all` プロパティ](https://developer.mozilla.org/ja/docs/Web/CSS/all)
   - [Break プロパティ](https://developer.mozilla.org/ja/docs/Web/CSS/break-after)
   - [`font-variant` プロパティ](https://developer.mozilla.org/ja/docs/Web/CSS/font-variant)
   - [Gap プロパティ](https://developer.mozilla.org/ja/docs/Web/CSS/gap)
   - [Media Query Ranges](https://developer.mozilla.org/ja/docs/Web/CSS/Media_Queries/Using_media_queries#Syntax_improvements_in_Level_4)

デフォルトでは、IE11 対応のために[カスタムプロパティ](https://developer.mozilla.org/ja/docs/Web/CSS/var)（CSS 変数）は**コンパイルされません**。

CSS 変数は、[安全に実行できない](https://github.com/MadLittleMods/postcss-css-variables#caveats)ため、コンパイルされません。
変数を使用する必要がある場合は、[Sass](https://sass-lang.com/)によってコンパイルされる[Sass変数](https://sass-lang.com/documentation/variables)などを使用することを検討してください。

> **備考**: [グリッドレイアウト](https://developer.mozilla.org/ja/docs/Web/CSS/grid)をサポートするには、Autoprefixerで `grid: "autoplace"` を有効にする必要があります。後述の[プラグインのカスタマイズ](#プラグインのカスタマイズ)を参照してください。

## ターゲットブラウザのカスタマイズ

Next.js では、[Browserslist](https://github.com/browserslist/browserslist)を介してターゲットブラウザ（[Autoprefixer](https://github.com/postcss/autoprefixer) やコンパイルされた CSS 機能のため）を設定できます。

browserslist をカスタマイズするには、以下のように `package.json` に `browserslist` key を作成します:

```json
{
  "browserslist": [">0.3%", "not ie 11", "not dead", "not op_mini all"]
}
```

[browserl.ist](https://browserl.ist/?q=%3E0.3%25%2C+not+ie+11%2C+not+dead%2C+not+op_mini+all) ツールを使って、どのブラウザをターゲットにしているか可視化できます。

## CSS モジュール

CSS モジュールをサポートするための設定は必要ありません。ファイルで CSS モジュールを有効にするには、ファイルの名前を拡張子 `.module.css` に変更します。

[Next.jsのCSSモジュールのサポートについてはこちら](/docs/basic-features/built-in-css-support)をご覧ください。

## プラグインのカスタマイズ

> **警告**: カスタムPostCSSの設定ファイルを定義すると、Next.jsは[デフォルトの挙動](#デフォルトの挙動)を**完全に無効にします**。
> [Autoprefixer](https://github.com/postcss/autoprefixer)を含め、コンパイルに必要な機能はすべて手動で設定するようにしてください。
> また、カスタムした設定に含まれるプラグインを手動でインストールする必要があります（例：`npm install postcss-flexbugs-fixes`）。

PostCSS の設定をカスタマイズするには、プロジェクトのルートに `postcss.config.json` ファイルを作成します。

これは Next.js が使用するデフォルトの設定です:

```json
{
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ]
  ]
}
```

> **備考**: Next.jsでは、ファイル名を `.postcssrc.json` とするか、`package.json` の `postcss` keyから読み込むこともできます。

また、`postcss.config.js` ファイルで PostCSS を設定も可能で、環境に応じて条件付きでプラグインを入れたい場合に便利です:

```js
module.exports = {
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3,
              features: {
                'custom-properties': false
              }
            }
          ]
        ]
      : [
          // No transformations in development
        ]
};
```

> **備考**: Next.jsでは、ファイル名を `.postcssrc.js` とすることもできます。

PostCSS プラグインをインポートするために **`require()` を使用しない**でください。プラグインは文字列として提供される必要があります。

> **備考**: あなたの `postcss.config.js` が同じプロジェクト内でNext.js以外のツールをサポートする必要がある場合、代わりに相互運用可能なオブジェクトベースのフォーマットを使用しなければなりません:
>
> ```js
> module.exports = {
>   plugins: {
>     'postcss-flexbugs-fixes': {},
>     'postcss-preset-env': {
>       autoprefixer: {
>         flexbox: 'no-2009'
>       },
>       stage: 3,
>       features: {
>         'custom-properties': false
>       }
>     }
>   }
> };
> ```
