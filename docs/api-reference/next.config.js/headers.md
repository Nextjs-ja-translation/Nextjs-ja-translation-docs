---
description: Next.js アプリに独自の HTTP ヘッダーを追加します。
---

# ヘッダー

<details open>
  <summary><b>例</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/headers">Headers</a></li>
  </ul>
</details>

<details>
  <summary><b>バージョン履歴</b></summary>

| Version   | Changes        |
| --------- | -------------- |
| `v10.2.0` | `has` が追加される。  |
| `v9.5.0`  | ヘッダーが追加される。 |

</details>

ヘッダーでは、受け取るリクエストパスに対して独自の HTTP ヘッダーを設定できます。

独自の HTTP ヘッダーを設定するためには、 `next.config.js` の `headers` キーを使用します:

```js
module.exports = {
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'x-another-custom-header',
            value: 'my other custom header value',
          },
        ],
      },
    ]
  },
}
```

`headers` は非同期関数であり、 `source` と `headers` プロパティを持つオブジェクトが格納された配列を返します:

- `source` は受け取るリクエストパスのパターンです。
- `headers` は `key` と `value` プロパティを持つヘッダーオブジェクトの配列です。
- `basePath`: `false` or `undefined` - if false the basePath won't be included when matching, can be used for external rewrites only.
- `locale`: `false` or `undefined` - whether the locale should not be included when matching.
- `has` is an array of [has objects](#header-cookie-and-query-matching) with the `type`, `key` and `value` properties.

Headers are checked before the filesystem which includes pages and `/public` files.

## ヘッダー上書き時の振る舞い

2 つのヘッダーが同じパスにマッチし、同じヘッダーキーが設定されていた場合、最後のヘッダーキーが最初のヘッダーキーを上書きします。以下のヘッダーを使うと、パス `/hello` は最後のヘッダーの値が `world` であるため、ヘッダー `x-hello` の値は `world` となります。


```js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-hello',
            value: 'there',
          },
        ],
      },
      {
        source: '/hello',
        headers: [
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
      },
    ],
  },
}
```

## パスのマッチング

パスのマッチングができます。例えば、`/blog/:slug` は `/blog/hello-world` とマッチします (ネストされているパスはありません):

```js
module.exports = {
  async headers() {
    return [
      {
        source: '/blog/:slug',
        headers: [
          {
            key: 'x-slug',
            value: ':slug', // マッチしたパラメータを値として使用できます
          },
          {
            key: 'x-slug-:slug', // マッチしたパラメータをキーとして使用できます
            value: 'my other custom header value',
          },
        ],
      },
    ],
  },
}
```

### ワイルドカードを用いたパスのマッチング


ワイルドカードを使ってパスとマッチさせるには、パラメータの後に `*` を使います。例えば、 `/blog/:slug*` は `/blog/a/b/c/d/hello-world` とマッチします:

```js
module.exports = {
  async headers() {
    return [
      {
        source: '/blog/:slug*',
        headers: [
          {
            key: 'x-slug',
            value: ':slug*', // マッチしたパラメータを値として使用できます
          },
          {
            key: 'x-slug-:slug*', // マッチしたパラメータをキーとして使用できます
            value: 'my other custom header value',
          },
        ],
      },
    ],
  },
}
```

### 正規表現を用いたパスのマッチング

パラメータの後に括弧で正規表現を囲むことで、正規表現を用いてパスとマッチさせられます。例えば `/blog/:slug(\d{1,})` は `/blog/123` とマッチしますが、`/blog/abc` とはマッチしません:

```js
module.exports = {
  async headers() {
    return [
      {
        source: '/blog/:post(\\d{1,})',
        headers: [
          {
            key: 'x-post',
            value: ':post',
          },
        ],
      },
    ],
  },
}
```

<!-- textlint-disable -->
The following characters `(`, `)`, `{`, `}`, `:`, `*`, `+`, `?` are used for regex path matching, so when used in the `source` as non-special values they must be escaped by adding `\\` before them:

```js
module.exports = {
  async headers() {
    return [
      {
        // this will match `/english(default)/something` being requested
        source: '/english\\(default\\)/:slug',
        headers: [
          {
            key: 'x-header',
            value: 'value',
          },
        ],
      },
    ]
  },
}
```

## Header, Cookie, and Query Matching

To only apply a header when either header, cookie, or query values also match the `has` field can be used. Both the `source` and all `has` items must match for the header to be applied.

`has` items have the following fields:

- `type`: `String` - must be either `header`, `cookie`, `host`, or `query`.
- `key`: `String` - the key from the selected type to match against.
- `value`: `String` or `undefined` - the value to check for, if undefined any value will match. A regex like string can be used to capture a specific part of the value, e.g. if the value `first-(?<paramName>.*)` is used for `first-second` then `second` will be usable in the destination with `:paramName`.

```js
module.exports = {
  async headers() {
    return [
      // if the header `x-add-header` is present,
      // the `x-another-header` header will be applied
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-add-header',
          },
        ],
        headers: [
          {
            key: 'x-another-header',
            value: 'hello',
          },
        ],
      },
      // if the source, query, and cookie are matched,
      // the `x-authorized` header will be applied
      {
        source: '/specific/:path*',
        has: [
          {
            type: 'query',
            key: 'page',
            // the page value will not be available in the
            // header key/values since value is provided and
            // doesn't use a named capture group e.g. (?<page>home)
            value: 'home',
          },
          {
            type: 'cookie',
            key: 'authorized',
            value: 'true',
          },
        ],
        headers: [
          {
            key: 'x-authorized',
            value: ':authorized',
          },
        ],
      },
      // if the header `x-authorized` is present and
      // contains a matching value, the `x-another-header` will be applied
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-authorized',
            value: '(?<authorized>yes|true)',
          },
        ],
        headers: [
          {
            key: 'x-another-header',
            value: ':authorized',
          },
        ],
      },
      // if the host is `example.com`,
      // this header will be applied
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'example.com',
          },
        ],
        headers: [
          {
            key: 'x-another-header',
            value: ':authorized',
          },
        ],
      },
    ]
  },
}
```

### basePath をサポートしたヘッダー

ヘッダーで [`basePath` サポート](/docs/api-reference/next.config.js/basepath.md)を利用する際は、ヘッダーに `basePath: false` を追加しない限り、各 `source` に対して自動的に `basePath` がプレフィックスとして付与されます:

```js
module.exports = {
  basePath: '/docs',
  async headers() {
    return [
      {
        source: '/with-basePath', // これは /docs/with-basePath になります
        headers: [
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
      },
      {
        source: '/without-basePath', // basePath: false が設定されているため、変更されません
        headers: [
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
        basePath: false,
      },
    ]
  },
}
```

### Headers with i18n support

When leveraging [`i18n` support](/docs/advanced-features/i18n-routing.md) with headers each `source` is automatically prefixed to handle the configured `locales` unless you add `locale: false` to the header. If `locale: false` is used you must prefix the `source` with a locale for it to be matched correctly.

```js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },

  async headers() {
    return [
      {
        source: '/with-locale', // automatically handles all locales
        headers: [
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
      },
      {
        // does not handle locales automatically since locale: false is set
        source: '/nl/with-locale-manual',
        locale: false,
        headers: [
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
      },
      {
        // this matches '/' since `en` is the defaultLocale
        source: '/en',
        locale: false,
        headers: [
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
      },
      {
        // this gets converted to /(en|fr|de)/(.*) so will not match the top-level
        // `/` or `/fr` routes like /:path* would
        source: '/(.*)',
        headers: [
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
      },
    ]
  },
}
```

### Cache-Control

Cache-Control headers set in next.config.js will be overwritten in production to ensure that static assets can be cached effectively. If you need to revalidate the cache of a page that has been [statically generated](https://nextjs.org/docs/basic-features/pages#static-generation-recommended), you can do so by setting `revalidate` in the page's [`getStaticProps`](/docs/basic-features/data-fetching/get-static-props.md) function.

## Related

For more information, we recommend the following sections:

<div class="card">
  <a href="/docs/advanced-features/security-headers.md">
    <b>Security Headers:</b>
    <small>Improve the security of your Next.js application by add HTTP response headers.</small>
  </a>
</div>
