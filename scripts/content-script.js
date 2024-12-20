var iframe = null;
function initFrame() {
    iframe = document.createElement('iframe');
    // 获取指定html的url
    iframe.src = chrome.runtime.getURL('popup.html');
    iframe.height = 250;
    iframe.width = 150;
    iframe.style.position = 'fixed';
    iframe.style.zIndex = 9999;
    iframe.style.background = '#fff';
    iframe.style.top = '100px';
    iframe.style.right = '0px';
    document.body.appendChild(iframe);
}


function listenEvent() {
    window.addEventListener('message', function(e) {
        console.log(e.data)
        loadData(e.data)
    })
}

function sendMessageToFrame(data) {
    iframe.contentWindow.postMessage(data, '*');
}

initFrame();
listenEvent();

function loadData(item) {
    var arr = $('.gl-item')
    var data = [];
    $.each(arr, function(index, ele) {
        var obj = {};
        var $name = $("#name")
        var $link = $("#link")
        var $title = $("#title")
        var $price = $("#price")
        obj['店铺'] = $(ele).find(item.name).text()
        obj['价格'] = $(ele).find(item.price).text()
        obj['链接'] = `https:${$(ele).find(item.link).attr('href')}`
        obj['标题'] = $(ele).find(item.title).text()
        data.push(obj)
    })
    sendMessageToFrame(data)
}
