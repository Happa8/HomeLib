# 小規模図書管理システム HomeLib（仮）
自宅や文芸系の部室、研究室などで使える小規模な図書管理システム

## 要件
- 基本的な図書管理（検索等）
- 図書登録にはISBNを使用。図書情報はISBNを使って国会図書館などのデータベースから取得する
- ISBNが付与されていない書籍（ISBN普及前の書籍や、海外の書籍、同人誌など）については、独自のIDを発行し、バーコードとして出力する
- 簡単なユーザー管理と貸与管理。ユーザーの登録には、任意のIDを使用することができる。（例：学生証など）。ユーザーに新しいIDを認識させる必要がないようにする。

## 技術的仕様
基本的にPC上で実行するソフトウェアとして開発する。   
![pic1](./readme_pics/pic1.jpg)  
- Electron：クロスプラットフォームなデスクトップアプリケーションエンジン。HTML/CSS/JSを始めとしたWEB技術を用いてデスクトップアプリケーションを制作することができる。  
  https://www.electronjs.org  

- Webpack：モジュールバンドラ。基本的には、Javascriptなどのファイルを一つにまとめるてTTPリクエストを減らすことで、Webサイトの高速化を図るもの。その段階で、JSのminifyや最適化等を行ってくれるため、HTTPリクエスト等が関係ない今回も導入する。  
  https://webpack.js.org

- React：View管理のためのJavascriptライブラリ。Viewを効率的に管理することができる。  
  https://ja.reactjs.org  

- TypeScript：AltJSの一つ。Javascriptは基本的に動的型付けな言語なのだが、Typescriptは静的型付けを導入することができる。また、interfaceやclassなどの機能を使うこともできる。また、型が厳密に定義されているため、エディタによる入力補完が強力である。これによって、ヒューマンエラーの少ない開発を行うことができる。https://www.typescriptlang.org

- TypeORM：Typescriptを標準としたO/Rマッパー。  
  https://typeorm.io/#/
  
- SQLite3：データベースの一種。今回は比較的簡単なデータ構造のため、SQLite3を導入する。  

## Run on your computer
1. Clone this repository.
2. ```$ yarn```
3. ```$ yarn develop```
