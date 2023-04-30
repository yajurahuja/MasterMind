const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

// const provider = waffle.provider;

// describe("Mastermind", function () {
//     it("generate random combination", async function () {
//       const MasterMind = await ethers.getContractFactory("MasterMind");
//       const mmind = await MasterMind.deploy();
//       await mmind.deployed();
//       await mmind.generate_combination();
//       //await mmind.set_combination("1234");
//       await mmind.verifyCombination("1234");
//       await mmind.getProgress("5110");
//     });
  
//   });

describe("Mastermind", function () {
it("Hing Generation", async function () {
    const MasterMind = await ethers.getContractFactory("MasterMind");
    const mmind = await MasterMind.deploy("5001");
    await mmind.deployed();
    await mmind.verifyCombination("1234");
    await mmind.getProgress("1152");
});

});