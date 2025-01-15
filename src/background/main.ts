import type { Tabs } from 'webextension-polyfill'
import { onMessage, sendMessage } from 'webext-bridge/background'
import browser from 'webextension-polyfill'
import { currentTabId } from '~/logic/storage'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

// remove or turn this off if you don't use side panel
const USE_SIDE_PANEL = false

// to toggle the sidepanel with the action button in chromium:
if (USE_SIDE_PANEL) {
  // @ts-expect-error missing types
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: unknown) => console.error(error))
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

// let currentTabId: number | undefined = 0

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  currentTabId.value = tabId
})

browser.tabs.onCreated.addListener(async ({ id }) => {
  currentTabId.value = id
})

onMessage('open-side-panel', async () => {
  // @ts-expect-error missing types
  browser.sidePanel.open({ tabId: currentTabId.value })
})
