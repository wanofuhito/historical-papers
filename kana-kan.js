const brackets = {
    '(': ')', // furigana
    '{': '}', // okurigana (these brackets can be omitted)
    '‹': '›', // furigana of saidokumoji
    '«': '»', // okurigana of saidokumoji
    '[': ']', // kaeriten
    //'<': '>', // HTML tag
};
const leftBrackets = Object.keys(brackets);
const rightBrackets = Object.values(brackets);
const leftBracketsStr = '\\' + leftBrackets.join('\\');
const rightBracketsStr = '\\' + rightBrackets.join('\\');
const otherBrackets = {
    '⦉': '⦊', // punctuation
    '⌊': '⌋', // kanji / ruby base
    '‘': '’', // multiple kanji as a single ruby base
    '“': '”', // unit (usually contains only one kanji)
};
const punctuationStr = '〻―・、，。…「」『』';

function isKana(str) {
    let code = str.charCodeAt();
    if (str === '・') return false; // ・ is in the katakana block but treated as punctuation here
    if (parseInt('3040', 16) <= code && code <= parseInt('30FF', 16)) return true; // Hiragana & Katakana
    if (parseInt('31F0', 16) <= code && code <= parseInt('31FF', 16)) return true; // Katakana Phonetic Extensions
    if (parseInt('FF66', 16) <= code && code <= parseInt('FF9F', 16)) return true; // Halfwidth Katakana
    return false;
}

function replaceBetween(str, left, right, from, to, condition = function () { return true; }) {
    return str.split(left).map(function (s) {
        if (!s.includes(right)) return s;
        s = s.split(right);
        s[0] = left + s[0] + right;
        if (condition(s[0])) s[0] = s[0].replace(from, to);
        return s.join('');
    }).join('');
}

function toHTML(str) {
    return str;
}

function convertKanbunDiv(div) {
    div.childNodes.forEach(function (p) { p.innerHTML = toHTML(p.textContent); });
}
