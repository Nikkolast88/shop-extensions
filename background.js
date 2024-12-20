// background.js
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked!");
  // 在点击扩展图标时执行的操作
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"),
    type: "popup",
    width: 400,
    height: 500
  });
});