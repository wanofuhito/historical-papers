  function get_download_url(){
    const url = window.location.href;
    const filename = url.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1] + '.txt';
    const pathname = location.pathname.split("/");
    const foldername = pathname[pathname.length-2];
    const download_url = window.location.protocol + '//' + window.location.hostname + '/'+ foldername + '/' + filename;
    console.log(download_url);
    return download_url;
  }
  function get_data() {
    return new Promise((resolve, reject) => {
        //axios.get('https://wanofuhito.github.io/nihon-shoki/14rolls.txt')
        axios.get(get_download_url())
            .then(function (response) {
                // 成功時に実行
                // response.dataに実際のデータが入っている
                let result = response.data;
                resolve(result);
            })
            .catch(function (error) {
                // エラー時に実行
                reject(error);
            })
            .then(function () {
                // 常に実行
            });
    });
  }
  async function convert(id) {
    let data = await get_data();
    console.log(data);
    document.getElementById(id).innerHTML =  "<p>" + data.replace(/\n/g, "</p><p>") + "</p>";
    convertKanbunDiv(document.getElementById(id));
  }
