/* eslint-disable no-console */
import $ from 'jquery'
import { createApp } from 'vue'
import { onMessage, sendMessage } from 'webext-bridge/content-script'
import browser from 'webextension-polyfill'
import { setupApp } from '~/logic/common-setup'
import App from './views/App.vue'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  console.info('[shop-extension] Hello world from content script')

  // communication example: send previous tab title from background page
  // onMessage('tab-prev', ({ data }) => {
  //   console.log(`[shop-extension] Navigate from page "${data.title}"`)
  // })
  let sourceData: any[] = []

  // 来自侧边栏消息
  onMessage('fromSidePanel', ({ data }) => {
    sourceData = []
    if (data.data.label === '京东') {
      findJDItem(data.data.form, data.data.total)
    }
  })

  // JD 商品
  function findJDItem(columns: { label: string, value: string, key: string }[], total: string) {
    const length = $('.gl-warp .gl-item').length
    const currNum = $('.p-wrap .curr').text()

    // 判断当前是否大于60条
    if (length < 60) {
      scroll()
      return
    }

    findItems()
    // const totalNum = $('.f-pager i').text()
    const totalNum = total
    if (Number(currNum) < Number(totalNum)) {
      // 获取当前页面的 URL，修改为下一页
      if (Number(currNum) < Number(totalNum)) {
        document.getElementsByClassName('pn-next')[0].click()
      }
      setTimeout(() => {
        findJDItem(columns, total)
      }, 1000)
    }
    else {
      sendMessage('contentSendToSidePanel', { data: sourceData })
    }

    function findItems() {
      const items = $('.gl-warp .gl-item')
      items.each((index, item) => {
        const obj = {} as any
        columns.forEach((column) => {
          if (column.key === 'link') {
            obj[column.label] = $(item).find(column.value).attr('href')
          }
          else {
            obj[column.label] = $(item).find(column.value).text().replace(/[\n\t]/g, '')
          }
        })
        sourceData.push(obj)
      })
    }

    // 滚动到底部
    function scroll() {
      const scrollHeight = $(document).height() as number
      const scrollStep = 100
      const scrollInterval = setInterval(() => {
        const scrollTop = $(window).scrollTop() as number
        const windowHeight = $(window).height() as number
        if (scrollTop + windowHeight < scrollHeight) {
          const randomDelay = Math.random() * 200 + 100 // 随机延迟100到300毫秒
          setTimeout(() => {
            $(window).scrollTop(scrollTop + scrollStep)
          }, randomDelay)
        }
        else {
          clearInterval(scrollInterval)
          // Call function to scrape data after scrolling
          if (Number(currNum) < Number(total)) {
            findJDItem(columns, total)
          }
          else {
            findItems()
            sendMessage('contentSendToSidePanel', { data: sourceData })
          }
        }
      }, 300) // 每300毫秒检查一次
    }
  }

  // mount component to context window
  const container = document.createElement('div')
  container.id = __NAME__
  const root = document.createElement('div')
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)
  const app = createApp(App)
  setupApp(app)
  app.mount(root)
})()
