console.log('from background')
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Hello from the background')
})

// async function getCurrentTab () {
//   const queryOptions = { active: true, lastFocusedWindow: true }
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   const [tab] = await chrome.tabs.query(queryOptions)
//   console.log('XXXX', tab)
//   return tab
// }

// getCurrentTab()

// console.log('xxxxx')
// chrome.extension.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     // LOG THE CONTENTS HERE
//     console.log('xxxxx2')

//     console.log(request.content)
//   }
// )
