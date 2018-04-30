const web3 = require('./web3')
const Dedium = require('../build/contracts/Dedium.json')
const address = require('../ethconfig.json')

module.exports = {
  'abi': Dedium.abi,
  'address': address.address
}
  // return new web3.eth.Contract(Dedium.abi, address || '0x41019a3cc6A0EFB08d9FF80Ca1B925D7C4151d7c')