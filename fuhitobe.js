  let raw_data;
  let tagged_data;
  function get_download_url(file) {
    console.log(file)
    const url = window.location.href;
    let filename = url.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1] + '.txt';
    if (file != null) filename = file;
    const pathname = location.pathname.split("/");
    const foldername = pathname[pathname.length - 2];
    const download_url = window.location.protocol + '//' + window.location.hostname + '/' + foldername + '/' + filename;
    console.log(download_url);
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
  async function convert(id, file) {
    console.log(file);
    let data = await get_data(file);
    console.log(data);
    raw_data = data;
    document.getElementById(id).innerHTML = "<p>" + data.replace(/\n/g, "</p><p>") + "</p>";
    convertKanbunDiv(document.getElementById(id));
    tagged_data = document.getElementById(id).innerHTML;
  }

  function toHTMLNone(str) {
    return str;
  }

  function convertKanaDiv(id) {
    div = document.getElementById(id)
    div.childNodes.forEach(function (p) {
      p.innerHTML = toHTMLNone(p.textContent);
    });
  }

  function copy_to_clipboard(copy_data) {
    navigator.clipboard.writeText(copy_data).then(
      () => {
        /* clipboard successfully set */
        alert('コピーしました')
      }, () => {
        /* clipboard write failed */
      });
  }
  function copy_raw_data(){
    copy_to_clipboard(raw_data);
  }
  function copy_tagged_data(){
    copy_to_clipboard(tagged_data);
  }
  function display_search_screen(){
    let KEvent = new KeyboardEvent( "keydown", { keyCode: 229, ctrlKey: true});
    document.dispatchEvent( KEvent );
  }
