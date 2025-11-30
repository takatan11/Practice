const fs = require('fs/promises');

// 時間のかかる処理（awaitを使う）
async function heavyTask() {
  console.log('【A】 重いファイルの読み込みを開始します...');
  
  // ここで await する！
  // もしプログラム全体が止まるなら、下のタイマーも止まるはず...？
  const data = await fs.readFile('./large-file.txt', 'utf8').catch(() => 'ダミーデータ');
  
  // 読み込みが終わるまで数ミリ秒〜かかります
  console.log('【A】 読み込み完了！');
}

// 別の軽い処理（タイマー）
function startTimer() {
  let count = 0;
  const interval = setInterval(() => {
    count++;
    console.log(`  【B】 タイマー動作中: ${count}回目`);
    
    // 5回動いたら終了
    if (count >= 5) clearInterval(interval);
  }, 1); // 1ミリ秒ごとに実行
}

// 実験開始
// ※ファイル読み込み用のダミーファイルが無い場合はエラーになりますが、
// 　読み込み動作自体は発生するので実験できます。
startTimer(); // タイマー開始
heavyTask();  // 重い処理開始