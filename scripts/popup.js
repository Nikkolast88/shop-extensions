var data = [];
$("#start").click(function() {
    var data = {
        name: $("#name").val(),
        link: $("#link").val(),
        title: $("#title").val(),
        price: $("#price").val()
    }
    window.parent.postMessage(data, '*'); 
})
$("#generate").click(function() {
    generateExcel(data)
})

function listenEvent() {
    window.addEventListener('message', function(e) {
        data = e.data
    })
}
listenEvent();

var temp = [
    {
        tab: '京东',
        name: '.curr-shop',
        link: '.p-name a',
        title: '.p-name em',
        price: '.p-price i'
    },
    {
        tab: '淘宝',
        name: '.curr-shop',
        link: '.p-name a',
        title: '.p-name em',
        price: '.p-price i'
    },
    {
        tab: '拼多多',
        name: '.curr-shop',
        link: '.p-name a',
        title: '.p-name em',
        price: '.p-price i'
    }
]

function generateExcel(data) {
  // 获取表头（字段名）
  const headers = Object.keys(data[0]);

   // 将数据对象转换为二维数组（去除对象的键名，保留值）
    const rows = data.map(item => headers.map(header => item[header]));

    // 在二维数组的开头添加表头
    const finalData = [headers, ...rows];
  // 创建一个工作簿
  const ws = XLSX.utils.aoa_to_sheet(finalData); // 将数组转换为工作表
  const wb = XLSX.utils.book_new(); // 创建一个新的工作簿
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // 将工作表添加到工作簿
  
  // 导出 Excel 文件
  const filename = "京东_万丽显卡.xlsx";
  XLSX.writeFile(wb, filename); 
}