javascript:(() => {
    // 今日の日付を取得
    const today = new Date();

    // 今週の月曜日を取得
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);

    // 今週の日曜日を取得
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay() + 7);

    // 年、月、日を取得して指定の形式に変換
    const year = monday.getFullYear();
    const month = String(monday.getMonth() + 1).padStart(2, '0');
    const mondayDate = String(monday.getDate()).padStart(2, '0');
    const sundayDate = String(sunday.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}@${mondayDate}-${sundayDate}`;

    // 結果を出力
    // console.log(formattedDate);

    window.open(`https://scrapbox.io/${"wogikaze-study"}/${formattedDate}`, "_blank"), history.replaceState && history.replaceState({}, null, location.href)
})()