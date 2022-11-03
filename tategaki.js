function toRubyHTML(str) {
  const keys = [/(＜)/g, /(＞)/g, /(《)/g, /(》)/g];
  const reps = ["<ruby>", "</ruby>", "<rt>", "</rt>"];
  for (let i = 0; i < keys.length; i++) {
    str = str.replace(keys[i], reps[i]);
  }
    return str;
}

function convertKana(id) {
  let div = document.getElementById(id);
  div.innerHTML = "<p>" + div.replace(/\n/g, "</p><p>") + "</p>";
  div.childNodes.forEach(function (p) { p.innerHTML = toRubyHTML(p.textContent); });
}
