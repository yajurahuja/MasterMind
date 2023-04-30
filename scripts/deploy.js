// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter"); //The name of the smart contract which we want to deploy
  const greet = await Greeter.deploy("Hello, hardhat!");

  await greet.deployed();

  console.log("Greeter deployed to:", greet.address);

  const MMind = await hre.ethers.getContractFactory("MasterMind");
  const MasterMind = await MMind.deploy("1234");

  await MasterMind.deployed();
  
  console.log("MasterMind deployed to:", MasterMind.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });