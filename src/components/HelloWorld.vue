<template>
  <div>
    <h3>Current Url:</h3>
    <p>{{ tabUrl }}</p>
    <h3>Test Value:</h3>
    <p>{{ defaultText }}</p>
    <h3>Found Urls:</h3>
    <p :key="f" v-for="f in foundUrls">{{ f }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted () {
    console.log('mount')
    browser.runtime.sendMessage({})

    this.initTabUrl()
    this.initAllUrl()
  },
  data () {
    return {
      tabUrl: 'x',
      foundUrls: [1, 2]
    }
  },
  methods: {
    initTabUrl () {
      chrome.tabs.getSelected(null, (tab) => {
        console.log('tab.id', tab.id)
        console.log('tab.url', tab.url)
        console.log('tab', tab)
        this.tabUrl = tab.url
      })
    },
    initAllUrl () {
      console.log('document', document)
      const links = document.getElementsByTagName('a')
      console.log('links', links)
      const urls = []

      for (let i = 0; i < links.length; i++) {
        urls.push(links[i].getAttribute('href'))
      }
      console.log('urls', urls)
      this.foundUrls = urls
    }
  },

  computed: {
    defaultText () {
      return browser.i18n.getMessage('extName')
    }
  }
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
