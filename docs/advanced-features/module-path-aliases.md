---
description: 特定のモジュール読み込みパスをコンパイル時にエイリアスとして解釈するよう設定できます。
---

# 絶対パスによるインポートとモジュールパスエイリアス

<details>
<summary><b>例</b></summary>
<ul>
<li><a href="https://github.com/vercel/next.js/tree/canary/examples/with-absolute-imports">絶対パスによるインポート</a></li>
</ul>
</details>

Next.js では [Next.js 9.4](https://nextjs.org/blog/next-9-4) 以降のオプションで、 `tsconfig.json` や `jsconfig.json` の `"paths"` と `"baseUrl"` に自動的に対応します。

> 注意：TypeScriptを使っている場合は `jsconfig.json` を利用できません

> 注意：`tsconfig.json` / `jsconfig.json` を変更した場合、開発サーバーを再起動する必要があります。

これらのオプションによって、モジュール読み込みパスのエイリアスを設定できます。よくあるパターンとしては、特定のディレクトリパスへエイリアスを設定し、そこに存在するモジュールを相対パスではなく絶対パスでインポートするような使い方です。

これらのオプションを設定すると、vscode など特定のエディタは自動的に読み取り、補完を受けられるなど使い勝手が良くなります。

`baseUrl`オプションを設定すると、プロジェクトのルートディレクトリからのパスで直接インポート可能になります。

この場合のサンプルコードは以下の通りです:

```json
// tsconfig.json または jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

```jsx
// components/button.js
export default function Button() {
  return <button>Click me</button>;
}
```

```jsx
// pages/index.js
import Button from 'components/button';

export default function HomePage() {
  return (
    <>
      <h1>Hello World</h1>
      <Button />
    </>
  );
}
```

`baseUrl`だけでも便利ですが、1 対 1 の対応ではなく複数のモジュールに一致するエイリアスを追加したいこともあるでしょう。このような場合のために、TypeScript では `"paths"` オプションがあります。

`"paths"`オプションを設定すると、複数ファイルへ対応するモジュールパスエイリアスを設定できます。たとえば、`@/components/*`を `components/*` と解釈するようマッピングできます。

この場合のサンプルコードは以下の通りです:

```json
// tsconfig.json または jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

```jsx
// components/button.js
export default function Button() {
  return <button>Click me</button>;
}
```

```jsx
// pages/index.js
import Button from '@/components/button';

export default function HomePage() {
  return (
    <>
      <h1>Hello World</h1>
      <Button />
    </>
  );
}
```
