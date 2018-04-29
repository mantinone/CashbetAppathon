const web3 = require('./web3')
const Dedium = require('../build/contracts/Dedium.json')

module.exports = (address) => {
  return new web3.eth.Contract(
    JSON.parse(Dedium.interface),
    address
  );
};