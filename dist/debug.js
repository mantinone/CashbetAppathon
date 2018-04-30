var globalObj = {}

document.addEventListener('DOMContentLoaded', () => {
  fetch('/web3debug')
    .then(text => text.json())
    .then((result) => {
      globalObj.res = result
    })
})