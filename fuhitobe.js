  let raw_data;
  let tagged_data;
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
  async function convert(id, file) {
    let data = await get_data(file);
    raw_data = data;
    document.getElementById(id).innerHTML = "<p>" + data.replace(/\n/g, "</p><p>") + "</p>";
    convertKanbunDiv(document.getElementById(id));
    tagged_data = document.getElementById(id).innerHTML;
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
  function get_kan(){
    let url = new URL(window.location.href);
    let params = url.searchParams;
    console.log(params.get('kan'));
    return params.get('kan');
  }
