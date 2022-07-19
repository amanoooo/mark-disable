// console.debug('Hello from the content-script')

const urlDomMap = new Map()
function getAllUrl () {
  console.log('initAllUrl', document)
  const links = document.getElementsByTagName('a')
  const urls = []

  for (let i = 0; i < links.length; i++) {
    const url = links[i].getAttribute('href')
    if (checkUrl(url)) {
      urls.push(url)
      urlDomMap.set(url, links[i])
    }
  }
  return urls
}
function checkUrl (url) {
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
}

chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    console.log('receive: %s', message && message.type)
    switch (message.type) {
      case 'getAllUrl':
        sendResponse(getAllUrl())
        break
      case 'render':
        render(message.blockedUrlInfos)
        break
    }
  }
)

function render (blockedUrlInfos) {
  blockedUrlInfos.forEach(u => {
    const dom = urlDomMap.get(u.url)
    console.log('dom ', dom)
    dom.style['text-decoration'] = 'line-through'
  })
}
