<template>
  <div>
    <h3>Version</h3>
    <span> {{version}} </span>
    <h3>Description</h3>
    <span>Only support using same preference, please help us commiting blockingList </span>
    <h3>Current Url:</h3>
    <MRow :list="[tabInfo]" @commitOne="commitOne" isTab />
    <h3>Found Urls:</h3>
    <MRow :list="foundUrls" @commitOne="commitOne"/>
    <button @click="syncUrlInfoList">Retry</button>
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
      tabInfo: {
        url: '',
        isBlocked: false
      },
      foundUrls: []
    }
  },
  methods: {
    initTabUrl () {
      chrome.tabs.getSelected(null, (tab) => {
        // console.log('tab', tab)
        this.tabInfo = { url: tab.url }
      })
    },
    initAllUrl () {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: 'getAllUrl' },
          (response) => {
            this.foundUrls = Array.from(new Set(response)).filter(this.filterUrl).map(url => ({ url }))
            this.syncUrlInfoList()
          }
        )
      })
    },
    async commitOne (index, isTab = false) {
      const url = isTab ? this.tabInfo.url : this.foundUrls[index].url
      const response = await axios.post('http://localhost:8080/url/commit', { url })
      if (response.status === 200) {
        if (isTab) {
          this.tabInfo.isBlocked = true
          this.tabInfo = { ...this.tabInfo }
        } else {
          this.foundUrls[index].isBlocked = true
          this.foundUrls = [...this.foundUrls]
        }
      }
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
      if (url.trim().startsWith('mailto')) {
        return false
      }
      return true
    },
    async syncUrlInfoList () {
      const urlInfoList = [this.tabInfo].concat(this.foundUrls)
      console.log('urlInfoList', urlInfoList)
      const response = await axios.post('http://localhost:8080/url/bulk_validate', { urlInfoList })
      const data = response?.data?.data || []
      console.log('data', data)
      // mutate
      this.tabInfo.isBlocked = data.shift()
      this.foundUrls = this.foundUrls.map(({ url }, index) => ({ url, isBlocked: data[index] || false }))
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
