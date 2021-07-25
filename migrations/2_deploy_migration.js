const VaxiChain = artifacts.require("VaxiChain");

module.exports = function(deployer) {
  deployer.deploy(VaxiChain);
};
