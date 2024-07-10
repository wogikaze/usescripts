javascript: (() => {
    const PROJECT = 'wogikaze-study';  // Webページを保存するproject

    const title = document.title.split(" - ")[0];
    const lines = [];
    const quote = window.getSelection().toString().trim();  // 選択範囲の文字列を取得
    let formattedtitle = ""
    if (decodeURIComponent(window.location.href).match("scrapbox.io/")) {
        let re = /scrapbox.io\/(.+)/;
        formattedtitle = `[/${decodeURIComponent(window.location.href).match(re)[1]}]`
    }
    else {
        formattedtitle = `[. ${decodeURIComponent(window.location.href)}]${title}`;
    }
    lines.push(
        formattedtitle
    );
    if (quote) {
        lines.push(...quote
            .split(/[\f\n\r]/g)  // 改行区切りで配列化
            .filter(line => line !== '')  // 空行は削除
            .map(line => `>${line}`),  // 引用記号
            '', // 空行
        );
    }
    const body = encodeURIComponent(lines.join('\n'));
    window.open(`https://scrapbox.io/${PROJECT}/${title}?body=${body}`, '_blank'), history.replaceState && history.replaceState({}, null, location.href);
})();