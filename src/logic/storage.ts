// import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

import type { Ref } from 'vue'
import { ref } from 'vue'

export const storageDemo = 'webext-demo'
export const currentTabId: Ref<number | undefined> = ref(0)
