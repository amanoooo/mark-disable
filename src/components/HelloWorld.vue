<template>
  <div>
    <h3>Account</h3>
    <span>
        Amano
    </span>
    <h3>Current Url:</h3>
    <li>
        <div>
            <span>
                {{ tabUrl }}
            </span>
            <button>Mark</button>
        </div>
    </li>
    <!-- <h3>Test Value:</h3>
    <p>{{ defaultText }}</p> -->
    <h3>Found Urls:</h3>
    <div class="urls-container">
        <li :key="f" v-for="f in foundUrls">{{ f }}</li>
    </div>
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
        console.log('tab', tab)
        this.tabUrl = tab.url
      })
    },
    initAllUrl () {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'getAllUrl' }, (response) => {
          console.log('xx from helloword', response)
          this.foundUrls = response
        })
      })
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
/* p {
  font-size: 20px;
} */
.urls-container {

}
</style>
