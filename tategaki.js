  function get_download_url(filename) {
    const url = window.location.href;
    const pathname = location.pathname.split("/");
    const foldername = pathname[pathname.length - 2];
    const download_url = window.location.protocol + '//' + window.location.hostname + '/' + foldername + '/' + filename;
    return download_url;
  }

  function get_data(file) {
    return new Promise((resolve, reject) => {
      axios.get(get_download_url(file)).then(function (response) {
        // 成功時に実行
        // response.dataに実際のデータが入っている
        let result = response.data;
        resolve(result);
      }).catch(function (error) {
        // エラー時に実行
        reject(error);
      }).then(function () {
        // 常に実行
      });
    });
  }

  function toRubyTag(str) {
    const keys = [/(＜)/g, /(＞)/g, /(《)/g, /(》)/g];
    const reps = ["<ruby>", "</ruby>", "<rt>", "</rt>"];
    for (let i = 0; i < keys.length; i++) {
      str = str.replace(keys[i], reps[i]);
    }
    console.log(str);
    return str;
  }

  async function convertRubyTag(id,file) {
    let data = await get_data(file);
    let div = document.getElementById(id);
    div.innerHTML = "<p>" + data.replace(/\n/g, "</p><p>") + "</p>";
    div.childNodes.forEach(function (p) {
      p.innerHTML = toRubyTag(p.textContent);
    });
  }
