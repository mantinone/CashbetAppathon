var Dedium = artifacts.require("../contracts/Dedium.sol");

module.exports = function(deployer) {
  deployer.deploy(Dedium);
};
