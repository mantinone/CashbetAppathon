var globalObj = {}

document.addEventListener('DOMContentLoaded', () => {
  fetch('/web3debug')
    .then(text => text.json())
    .then((result) => {
      globalObj.res = result
      globalObj.contract = web3.eth.contract(result.abi).at(result.address)
    })
})