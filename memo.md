# コードレビュー

- フロント用の public key は公開して良い
- 管理用の key が流出すると危ない
- husky 等の開発用パッケージは、

# SPA を開発する際の注意点

### 遅延バンドル + 初期バンドル

- routes の loadModule を使用することで遅延ロードを実装することができている
- url を変えて
  全てと読み込みが入るので、

初期ローディングが早くなるが、画面遷移時に読み込みが走るので UX が悪くなる
-- or --
初期ローディングが遅くなるが、画面遷移が早くなる

遅延と初期ロードのバランスを上手くやる

**モジュール単位での振り分けを意識する**

## subscribe

サブスクした場合、subscribe.unsubscribe()しないといけない

async パイプするときは

## 全部のメソッドに型をつけるべき

## button="true"は明示的に書いたほうがいい

## service injectable について調べる

root にしてる場合、一番最初に DI されているとこを読み込まれた時に、読み込まれる

service の中で、書いたほうが良い

テストの間 k りょう

## img タグにクリックイベントを書かない

アンドロイドの場合だ丈夫だが、ios だと tappable="true"しないとタップに遅延が発生する

## クラス構文の public private について

public private にした理由が説明できないといけない

外からアクセスしないといけないものは public でそれ以外は private にしないといけない

## CSS の設計

https://sinap.jp/blog/2015/11/sinap-oocss.html

一括りができる css のプロパティは BEM の考え方で書くほうが設計としては使いやすい

## ファイル毎のロジック分けを明確にする

## 型を削るよりかは、増やす

増やす

```typescript
interface IUser {
  id: string;
  name: string;
}

interface IIUser extends {
  createdAt: string;
}
```

減らす

```typescript
type IUser {
  id: string;
  name: string;
  createdAt: string;
}

type IIUser = Omit<IUser, "createdAt">
```

なぜ増やすのか？

> utility 型を使うと型を追うのが大変になる

**そのチームの学習度合いによって使い分けるべき**
