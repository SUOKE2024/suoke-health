import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light',
    loading: false,
    networkStatus: true
  }),
  
  actions: {
    setTheme(theme) {
      this.theme = theme
    },
    setLoading(status) {
      this.loading = status
    },
    setNetworkStatus(status) {
      this.networkStatus = status
    }
  }
})
