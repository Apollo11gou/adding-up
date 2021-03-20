"use strict";
// fs: FileSystem（ファイルシステム）の略で、ファイルを扱うためのモジュール
const fs = require("fs");
// readline :ファイルを一行ずつ読み込むためのモジュール
const readline = require("readline");
const rs = fs.createReadStream("./popu-pref.csv");
const rl = readline.createInterface({ input: rs, output: {} });
// lineString には、読み込んだ 1 行の文字列が入っている
rl.on("line", (lineString) => {
  // lineString で与えられた文字列をカンマ , で分割
  const columns = lineString.split(",");
  // parseInt() 関数で文字列を整数値に変換
  const year = parseInt(columns[0]);
  const prefecture = columns[1];
  const popu = parseInt(columns[3]);
  if (year === 2010 || year === 2015) {
    console.log(year);
    console.log(prefecture);
    console.log(popu);
  }
});
