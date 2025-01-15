<script setup lang="ts">
import { sendMessage } from 'webext-bridge/content-script'
import 'uno.css'

async function onToggle() {
  sendMessage('open-side-panel', {})
}
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <button
      class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none"
      bg="teal-600 hover:teal-700"
      @click="onToggle"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </button>
  </div>
</template>
