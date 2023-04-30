require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "./src/artifacts", //This makes sure that the artifacts are created in the source folder when we compile
  },
  networks: {
    hardhat: { //This is the local test network
      chainId: 1337
    }
  },
  solidity: "0.8.18",
};
