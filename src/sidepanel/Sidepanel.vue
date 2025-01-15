<script setup lang="ts">
import { sendMessage } from 'webext-bridge/content-script'
import { currentTabId } from '~/logic/storage'

const option = [
  {
    label: '京东',
    check: 1,
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
        key: 'link',
        value: '.p-name',
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
    check: 1,
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
        key: 'link',
        value: '.p-name',
      },
      {
        label: '链接',
        key: 'link',
        value: '.p-name a',
      },
    ],
  },
  {
    label: '拼多多',
    check: 1,
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
        key: 'link',
        value: '.p-name',
      },
      {
        label: '链接',
        key: 'link',
        value: '.p-name a',
      },
    ],
  },
]

function openOptionsPage() {
}
</script>

<template>
  <main class="w-full px-4 py-5 text-center text-gray-700">
    <div>Sidepanel</div>

    <button class="btn mt-2" @click="openOptionsPage">
      Open Options
    </button>
  </main>
</template>
