// detect if need reduce col width
// detect browsers, from: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
function isNode() {
  return typeof module !== 'undefined' && module.exports
}
function isFirefox() {
  return typeof InstallTrigger !== 'undefined'
}
// Safari 3.0+ "[object HTMLElementConstructor]" 
function isSafari() {
  return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)) // eslint-disable-line no-undef
}
// Chrome 1 - 79
function isChrome() {
  return !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
}

// detect by DOM
// const div = document.createElement('div')
// document.body.appendChild(div)
// div.style.width='calc(1000px / 7)'
// const w = hp.getBoundingClientRect(div).width
// if (w * 7 > 1000) {
//   _ifNeedReduceColWidth = true
// }
// hp.removeEl(div)

export default () => Boolean(!isNode() && !isChrome() && !isSafari() && !isFirefox())
