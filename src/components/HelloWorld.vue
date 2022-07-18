<template>
  <div>
    <h3>Version</h3>
    <span> {{version}} </span>
    <h3>Description</h3>
    <span>Only support using same preference, please help us commiting blockingList </span>
    <h3>Current Url:</h3>
    <MRow :list="[tabUrl]"/>
    <h3>Found Urls:</h3>
    <MRow :list="foundUrls"/>
  </div>
</template>

<script>
import MRow from './MRow.vue'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  mounted () {
    browser.runtime.sendMessage({})
    this.initTabUrl()
    this.initAllUrl()
  },
  data () {
    return {
      tabUrl: '',
      foundUrls: []
    }
  },
  methods: {
    initTabUrl () {
      chrome.tabs.getSelected(null, (tab) => {
        console.log('tab', tab)
        this.tabUrl = tab.url
      })
    },
    initAllUrl () {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: 'getAllUrl' },
          (response) => {
            this.foundUrls = Array.from(new Set(response)).filter(this.filterUrl)
            console.log(2)
            this.syncUrlInfoList()
            console.log(3)
          }
        )
      })
    },
    filterUrl (url) {
      if (!url) {
        return false
      }
      if (!url.trim()) {
        return false
      }
      if (url.includes('#')) {
        return false
      }
      if (url.indexOf('javascript:void(0)') > -1) {
        return false
      }
      if (url.indexOf('javascript:;') > -1) {
        return false
      }
      if (url.indexOf('javascript:;') > -1) {
        return false
      }
      if (url.trim() === '/') {
        return false
      }
      return true
    },
    async syncUrlInfoList () {
      const urlInfoList = this.foundUrls.map(url => ({ url }))
      const response = await axios.post('http://localhost:8080/url/bulk_validate', { urlInfoList })
      const data = response?.data?.data || []
      console.log('data', data)
      this.foundUrls = this.foundUrls.map((url, index) => ({ url, isBlocked: data[index] || false }))
    }

  },
  computed: {
    defaultText () {
      return browser.i18n.getMessage('extName')
    },
    version () {
      return chrome.runtime.getManifest().version
    }
  },
  components: { MRow }
}
</script>

<style scoped>
/* p {
  font-size: 20px;
} */
.urls-container {
}
</style>
