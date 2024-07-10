export function copy_month_page() {
	const yearString = (past = 0, date = new Date()) => {
		const month = new Date(date.getFullYear(), date.getMonth() + past, 1);
		return `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
	}
	const aprilMondays = getMondays();

	const page_format = `${yearString()}

table:週目標
\t\t現文\t古典\t英語\t数学\t化学\t物理\t地理
\t[${aprilMondays.join("]\n\t[")}]

[${yearString(-1)}]←　[武田塾${yearString()}]　→[${yearString(1)}]
`

	navigator.clipboard.writeText(page_format).then(function () {
		console.log('Copying to clipboard was successful!');
	}, function (err) {
		console.error('Could not copy text: ', err);
	});
}

export function copy_month_page_for_test() {
	const yearString = (past = 0, date = new Date()) => {
		const month = new Date(date.getFullYear(), date.getMonth() + past, 1);
		return `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
	}
	const aprilMondays = getMondays();

	const page_format = `${yearString()}

[武田塾${yearString(-1)}]←　[${yearString()}]　→[武田塾${yearString(1)}]
`

	navigator.clipboard.writeText(page_format).then(function () {
		console.log('Copying to clipboard was successful!');
	}, function (err) {
		console.error('Could not copy text: ', err);
	});
}

function getMondays() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const mondays = [];

	// 最初の月曜日を取得
	let firstMondayInMonth = new Date(currentYear, currentMonth, 1); // 現在の月の1日
	while (firstMondayInMonth.getDay() !== 1) {
		firstMondayInMonth.setDate(firstMondayInMonth.getDate() + 1);
	}

	// 最後の月曜日を取得
	let lastMondayInMonth = new Date(currentYear, currentMonth + 1, 0); // 次の月の0日 = 現在の月の最終日
	while (lastMondayInMonth.getDay() !== 1) {
		lastMondayInMonth.setDate(lastMondayInMonth.getDate() - 1);
	}

	// 月曜日を列挙
	let currentMonday = firstMondayInMonth;
	while (currentMonday <= lastMondayInMonth) {
		const daysAgo = Math.ceil((currentDate - currentMonday) / (1000 * 60 * 60 * 24));
		const dateRange = getDateRange(daysAgo);
		mondays.push(dateRange);
		currentMonday.setDate(currentMonday.getDate() + 7);
	}

	return mondays;
}

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