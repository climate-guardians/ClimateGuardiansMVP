const { StaticCeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const { ethers } = require("ethers");
const { getContractAddresses } = require('./getContractAddress');
const elemental = require("../artifacts/contracts/RandomPack.sol/Elemental.json");
const fungi = require("../artifacts/contracts/RandomPack.sol/Fungi.json");
const insect = require("../artifacts/contracts/RandomPack.sol/Insect.json");
const plant = require("../artifacts/contracts/RandomPack.sol/Plants.json");
const pack = require("../artifacts/contracts/RandomPack.sol/Pack.json");
require('dotenv').config({path: '../.env'});

async function main() {
  
  const provider = new StaticCeloProvider("https://alfajores-forno.celo-testnet.org");
  await provider.ready;

  const deployer = new CeloWallet(String(process.env.PRIVATE_KEY_DEPLOYER), provider);
  const proposer = new CeloWallet(String(process.env.PRIVATE_KEY_PROPOSER), provider);
  const executer = new CeloWallet(String(process.env.PRIVATE_KEY_EXECUTER), provider);

  console.log("deployer: ", deployer.address);
  console.log("proposer: ", proposer.address);
  console.log("executer: ", executer.address);


  // Elemental

  var deployerContractAddress = await getContractAddresses(deployer.address);
  console.log("predicted ElementalFactory address: ", deployerContractAddress);
  const ElementalFactory = new ethers.ContractFactory(elemental.abi, elemental.bytecode, deployer);
  const elementalFactory = await ElementalFactory.deploy();
  await elementalFactory.deployed();
  console.log("ElementalFactory deployed to:", elementalFactory.address);

  // Fungi

  deployerContractAddress = await getContractAddresses(deployer.address);
  console.log("predicted FungiFactory address: ", deployerContractAddress);
  const FungiFactory = new ethers.ContractFactory(fungi.abi, fungi.bytecode, deployer);
  const fungiFactory = await FungiFactory.deploy();
  await fungiFactory.deployed();
  console.log("FungiFactory deployed to:", fungiFactory.address);

  // Insect

  deployerContractAddress = await getContractAddresses(deployer.address);
  console.log("predicted InsectFactory address: ", deployerContractAddress);
  const InsectFactory = new ethers.ContractFactory(insect.abi, insect.bytecode, deployer);
  const insectFactory = await InsectFactory.deploy();
  await insectFactory.deployed();

  console.log("InsectFactory deployed to:", insectFactory.address);

  // Plants

  deployerContractAddress = await getContractAddresses(deployer.address);
  console.log("predicted InsectFactory address: ", deployerContractAddress);
  const PlantFactory = new ethers.ContractFactory(plant.abi, plant.bytecode, deployer);
  const plantFactory = await PlantFactory.deploy();
  await plantFactory.deployed();

  console.log("PlantFactory deployed to:", plantFactory.address);

  // Pack

  deployerContractAddress = await getContractAddresses(deployer.address);
  console.log("predicted PackFactory address: ", deployerContractAddress);
  const PackFactory = new ethers.ContractFactory(pack.abi, pack.bytecode, deployer);
  const packFactory = await PackFactory.deploy();
  await packFactory.deployed();

  console.log("PackFactory deployed to:", packFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
