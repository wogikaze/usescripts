function getDateRange(daysAgo = 0) {
    const today = new Date();
    today.setDate(today.getDate() - daysAgo + 1);
    today.setDate(today.getDate() - today.getDay() + 1)
    const year = today.getFullYear();
    const month = `00${today.getMonth() + 1}`.slice(-2)
    const startDay = `00${today.getDate() - today.getDay() + 1}`.slice(-2)
    today.setDate(today.getDate() + 6)
    const endDay = `00${today.getDate() - today.getDay()}`.slice(-2)

    return `${year}-${month}@${startDay}-${endDay}`;
}
function getNextSevenDaysArray(daysAgo = 0) {
    const mondayDate = new Date();
    mondayDate.setDate(mondayDate.getDate() - daysAgo + 1);
    mondayDate.setDate(mondayDate.getDate() - mondayDate.getDay() + 1)

    const datesArray = [];
    for (let i = 0; i < 7; i++) {
        const futureDate = new Date(mondayDate.getTime());
        futureDate.setDate(mondayDate.getDate() + i);
        const formattedDate = futureDate.getDate().toString().padStart(2, '0'); // DD形式
        datesArray.push(formattedDate);
    }
    return datesArray;
}

async function fetchAndFormatCsv(daysAgo = 0) {
    const formattedDate = getDateRange(daysAgo + 7);
    //https://scrapbox.io/api/table/wogikaze-study/2024-06@17-23/勉強時間.csv
    //https://scrapbox.io/api/table/wogikaze-study/2024-06@24-30/勉強時間.csv
    return fetch(`https://scrapbox.io/api/table/wogikaze-study/${formattedDate}/勉強時間.csv`)
        .then(response => response.text())
        .then(data => {
            const lines = data.split("\n");
            const formattedLines = lines.map(line => line.split(",").join("\t"));
            const headerLength = formattedLines[0].split("\t").length;
            formattedLines.push(`${getDateRange(daysAgo)}\t`);
            return formattedLines;
        })
        .catch(error => {
            console.error('エラー:', error);
            return [];
        });
}
export async function copy_week_page() {
    var result = prompt(
        `-1:${getDateRange(7)}
0:${getDateRange(0)}
1:${getDateRange(-7)}
2:${getDateRange(-14)}`, '1');
    var daysAgo;
    if (result) {
        daysAgo = parseInt(result) * -7;
    } else {
        return;
    }
    let content = [];
    let formattedTable = await fetchAndFormatCsv(daysAgo)
    content = [
        "",
        "",
        "目標",
        "",
        getNextSevenDaysArray(daysAgo).join("\n"),
        "",
        "振り返り",
        "",
        "table:勉強時間",
        `\t${formattedTable.join("\n\t")}`,
        ""
    ].join("\n");
    console.log(content);

    navigator.clipboard.writeText(content).then(function () {
        console.log('Copying to clipboard was successful!');
    }, function (err) {
        console.error('Could not copy text: ', err);
    });

}
