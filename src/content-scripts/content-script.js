console.log('Hello from the content-script')

function getAllUrl () {
  console.log('initAllUrl', document)
  const links = document.getElementsByTagName('a')
  const urls = []

  for (let i = 0; i < links.length; i++) {
    urls.push(links[i].getAttribute('href'))
  }
  return urls
}

chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    switch (message.type) {
      case 'getAllUrl':
        sendResponse(getAllUrl())
        break
    }
  }
)
