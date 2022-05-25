const { StaticCeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const { ethers, Wallet } = require("ethers");
const fs = require('fs');
const { getContractAddress } = require('./getContractAddress');
// const elemental = require("../artifacts/contracts/RandomPack.sol/Elemental.json");
const fungi = require("../artifacts/contracts/RandomPack.sol/Fungi.json");
const insect = require("../artifacts/contracts/RandomPack.sol/Insect.json");
const plant = require("../artifacts/contracts/RandomPack.sol/Plants.json");
const pack = require("../artifacts/contracts/RandomPack.sol/Pack.json");

require('dotenv').config({path: '../.env'});

async function main() {
  
  const provider = new StaticCeloProvider(process.env.ALFAJORES_API);
  // const provider = new ethers.providers.InfuraProvider("rinkeby", process.env.INFURA_API_KEY);
  await provider.ready;

  const deployer = new CeloWallet(String(process.env.PRIVATE_KEY_DEPLOYER), provider);
  const proposer = new CeloWallet(String(process.env.PRIVATE_KEY_PROPOSER), provider);
  const executer = new CeloWallet(String(process.env.PRIVATE_KEY_EXECUTER), provider);

  // const deployer = new Wallet(String(process.env.PRIVATE_KEY_DEPLOYER), provider);
  // const proposer = new Wallet(String(process.env.PRIVATE_KEY_PROPOSER), provider);
  // const executer = new Wallet(String(process.env.PRIVATE_KEY_EXECUTER), provider);

  console.log("deployer: ", deployer.address);
  console.log("proposer: ", proposer.address);
  console.log("executer: ", executer.address);

  const metadataURIFungi = "https://gateway.pinata.cloud/ipfs/QmaFgTzAhMiLcEPZns8DhowJwRk7j3373iZYc9ACqw1aDn/";
  const metadataURIInsect = "https://gateway.pinata.cloud/ipfs/QmWE8QhatRGysxzf7gsAnmAEpY88GrFwsvZzbVHfpuki8j/";
  const metadataURIPlant = "https://gateway.pinata.cloud/ipfs/QmR4UaQRKYvYqAYGYZE9owRpYBKCE9e2jVgsMqD6GuYabg/";
  // const metadataURIElemental = "";
  const metadataURIPack = "https://gateway.pinata.cloud/ipfs/Qma2coXumWu2NfE9MpyaqLacFWqiJisAGawXxjZA5wXJyN/";

  // Elemental

  // var deployerContractAddress = await getContractAddresses(deployer.address);
  // console.log("predicted ElementalFactory address: ", deployerContractAddress);
  // const ElementalFactory = new ethers.ContractFactory(elemental.abi, elemental.bytecode, deployer);
  // const elementalFactory = await ElementalFactory.deploy();
  // await elementalFactory.deployed();
  // console.log("ElementalFactory deployed to:", elementalFactory.address);

  

  // const allAddresses = await getContractAddress(deployer.address, 4, "rinkeby");
  const allAddresses = await getContractAddress(deployer.address, 4, "alfajores");
  console.log("allAddresses: ", allAddresses);

  const packsContractAddress = allAddresses[0];
  const fungiContractAddress = allAddresses[1];
  const insectContractAddress = allAddresses[2];
  const plantContractAddress = allAddresses[3];

  // Pack

  console.log("PackFactory address: ", allAddresses[0]);
  const PackFactory = new ethers.ContractFactory(pack.abi, pack.bytecode, deployer);
  const packFactory = await PackFactory.deploy(metadataURIPack, fungiContractAddress, insectContractAddress, plantContractAddress);
  await packFactory.deployed();

  // Fungi

  console.log("FungiFactory address: ", fungiContractAddress);
  const FungiFactory = new ethers.ContractFactory(fungi.abi, fungi.bytecode, deployer);
  const fungiFactory = await FungiFactory.deploy(metadataURIFungi, packsContractAddress);
  await fungiFactory.deployed();

  // Insect

  console.log("InsectFactory address: ", insectContractAddress);
  const InsectFactory = new ethers.ContractFactory(insect.abi, insect.bytecode, deployer);
  const insectFactory = await InsectFactory.deploy(metadataURIInsect, packsContractAddress);
  await insectFactory.deployed();

  // Plants

  console.log("PlantFactory address: ", plantContractAddress);
  const PlantFactory = new ethers.ContractFactory(plant.abi, plant.bytecode, deployer);
  const plantFactory = await PlantFactory.deploy(metadataURIPlant, packsContractAddress);
  await plantFactory.deployed();

  

  const contracts = {
    "packAddress": packsContractAddress,
    "fungiAddress": fungiContractAddress,
    "insectAddress": insectContractAddress,
    "plantAddress": plantContractAddress
  };

  const data = JSON.stringify(contracts, null, 2);

  fs.writeFile('../ContractAddresses/contractAddresses.json', data, (err) => {  
    if (err) throw err;
    console.log('Contract addresses saved to ../ContractAddresses/contractAddresses.json');
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
