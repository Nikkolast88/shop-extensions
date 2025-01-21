<script setup lang="ts">
import { reactive, ref } from 'vue'
import browser from 'webextension-polyfill'
import * as XLSX from 'xlsx'

const activetab = ref(0)
const option = reactive([
  {
    label: '京东',
    total: '2',
    form: [
      {
        label: '店铺名',
        key: 'name',
        value: '.curr-shop',
      },
      {
        label: '价格',
        key: 'price',
        value: '.p-price i',
      },
      {
        label: '标题',
        key: 'title',
        value: '.p-name em',
      },
      {
        label: '链接',
        key: 'link',
        value: '.p-name a',
      },
    ],
  },
  {
    label: '淘宝',
    total: '2',
    form: [
      {
        label: '店铺名',
        key: 'name',
        value: '.shopNameText--DmtlsDKm',
      },
      {
        label: '价格',
        key: 'price',
        value: '.priceWrapper--dBtPZ2K1',
      },
      {
        label: '标题',
        key: 'title',
        value: '.title--qJ7Xg_90 ',
      },
      {
        label: '链接',
        key: 'link',
        value: '.doubleCardWrapperAdapt--mEcC7olq',
      },
    ],
  },
  {
    label: '拼多多',
    total: '2',
    form: [
      {
        label: '店铺名',
        key: 'name',
        value: '.curr-shop',
      },
      {
        label: '价格',
        key: 'price',
        value: '.p-price i',
      },
      {
        label: '标题',
        key: 'title',
        value: '.p-name',
      },
      {
        label: '链接',
        key: 'link',
        value: '.p-name a',
      },
    ],
  },
])

function openOptionsPage() {
  browser.runtime.sendMessage({ action: 'sidePanelSendToContent', data: option[activetab.value] })
}

let sourceData: any = []
function onExport() {
  exportToExcel(sourceData)
}

// @ts-expect-error missing types
browser.runtime.onMessage.addListener((message: any) => {
  console.log('message', message)
  if (message.action === 'toSidePanel') {
    sourceData = message.data.data
  }
})

// 导出为 Excel 文档
function exportToExcel(data: any[]) {
// 获取表头（字段名）
  const headers = Object.keys(data[0])
  // 将数据对象转换为二维数组（去除对象的键名，保留值）
  const rows = data.map(item => headers.map(header => item[header]))
  // 在二维数组的开头添加表头
  const finalData = [headers, ...rows]
  // 创建一个工作簿
  const ws = XLSX.utils.aoa_to_sheet(finalData) // 将数组转换为工作表
  const wb = XLSX.utils.book_new() // 创建一个新的工作簿
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1') // 将工作表添加到工作簿

  // 导出 Excel 文件
  const filename = `${option[activetab.value].label}_万丽显卡.xlsx`
  XLSX.writeFile(wb, filename)
}
</script>

<template>
  <main class="w-full px-4 py-5 text-center text-gray-700">
    <h1 class="text-2xl font-bold">
      选择网站
    </h1>
    <div class="flex justify-center mt-5">
      <button
        v-for="(item, index) in option"
        :key="index"
        :class="activetab === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
        class="px-4 py-2 mx-2 rounded-md cursor-pointer"
        @click="activetab = index"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="flex flex-col justify-center mt-5">
      <template v-for="item in option[activetab].form" :key="item.key">
        <div class="flex flex-items-center p-1">
          <div class="w-12">
            {{ item.label }}:
          </div>
          <div class="w-10">
            <input v-model="item.value" type="text" class="w-60 px-4 py-2 mx-2 rounded-md">
          </div>
        </div>
      </template>
    </div>
    <div class="flex mt-5">
      <div class="w-12">
        需要抓取的页数
      </div>
      <div class="w-10">
        <input v-model="option[activetab].total" type="number" min="1" class="w-60 px-4 py-2 mx-2 rounded-md">
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <button class="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md cursor-pointer" @click="openOptionsPage">
        开始抓取
      </button>
      <button class="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md cursor-pointer" @click="onExport">
        导出数据
      </button>
    </div>
  </main>
</template>
