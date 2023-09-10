import { useJSONStorage } from '@/util/useJSONStorage';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const appName = ref<string>(process.env.VUE_APP_APPNAME);
  return {
    appName
  }
})

