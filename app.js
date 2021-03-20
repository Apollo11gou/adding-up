"use strict";
// fs: FileSystem（ファイルシステム）の略で、ファイルを扱うためのモジュール
const fs = require("fs");
// readline :ファイルを一行ずつ読み込むためのモジュール
const readline = require("readline");
const rs = fs.createReadStream("./popu-pref.csv");
const rl = readline.createInterface({ input: rs, output: {} });
const prefectureDataMap = new Map(); //key:都道府県 value:集計データのオブジェクト
// lineString には、読み込んだ 1 行の文字列が入っている
rl.on("line", (lineString) => {
  // lineString で与えられた文字列をカンマ , で分割
  const columns = lineString.split(",");
  // parseInt() 関数で文字列を整数値に変換
  const year = parseInt(columns[0]);
  const prefecture = columns[1];
  const popu = parseInt(columns[3]);
  if (year === 2010 || year === 2015) {
    let value = prefectureDataMap.get(prefecture);
    //popu10 が 2010 年の人口、 popu15 が 2015 年の人口、 change が人口の変化率を表すプロパティ
    //value の値が Falsy の場合に、value に初期値となるオブジェクトを代入
    if (!value) {
      value = {
        popu10: 0,
        popu15: 0,
        change: null,
      };
    }
    if (year === 2010) {
      value.popu10 = popu;
    }
    if (year === 2015) {
      value.popu15 = popu;
    }
    prefectureDataMap.set(prefecture, value);
  }
});
// 'close' イベントは、全ての行を読み込み終わった際に呼び出される。
// その際の処理として、各県各年男女のデータが集計された Map のオブジェクトを出力
rl.on("close", () => {
  for (let [key, value] of prefectureDataMap) {
    // 集計データのオブジェクト value の change プロパティに、変化率を代入するコード
    value.change = value.popu15 / value.popu10;
  }
  // 連想配列を普通の配列に変換する処理
  const rankingArray = Array.from(prefectureDataMap).sort((pair1, pair2) => {
    return pair2[1].change - pair1[1].change;
  });
  const rankingStrings = rankingArray.map(([key, value]) =>{
    return(
    key +
    ':' +
    value.popu10 +
    '=>' +
    value.popu15 +
    '変化率:' +
    value.change
  );
  });
  console.log(rankingStrings);
});
