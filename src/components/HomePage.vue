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
    <button @click="initAllUrl">Refresh</button>
  </div>
</template>

<script>
import MRow from './MRow.vue'
import axios from 'axios'
export default {
  name: 'HomePage',
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
      foundUrls: [],
      chromeTabInfo: {}
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
        this.chromeTabInfo = tabs[0]
        chrome.tabs.sendMessage(
          this.chromeTabInfo.id,
          { type: 'getAllUrl' },
          (response) => {
            this.foundUrls = Array.from(new Set(response)).map(url => ({ url }))
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
        this.render()
      }
    },

    render () {
      const blockedUrlInfos = this.foundUrls.filter(i => i.isBlocked)

      chrome.tabs.sendMessage(
        this.chromeTabInfo.id,
        { type: 'render', blockedUrlInfos }
      )
    },

    async syncUrlInfoList () {
      const urlInfoList = [this.tabInfo].concat(this.foundUrls)
      const response = await axios.post('http://localhost:8080/url/bulk_validate', { urlInfoList })
      const data = response?.data?.data || []
      // mutate
      this.tabInfo.isBlocked = data.shift()
      this.foundUrls = this.foundUrls.map(({ url }, index) => ({ url, isBlocked: data[index] || false }))

      this.render()
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
