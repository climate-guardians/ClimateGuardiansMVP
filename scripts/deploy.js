const { CeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const { ethers } = require("ethers");
const timelockArtifact = require("../artifacts/@openzeppelin/contracts/governance/TimeLockController.sol/TimeLockController.json");
const governanceTokenArtifact = require("../artifacts/contracts/GovernanceTokenERC20.sol/MyToken.json");
const myGovernorArtifact = require("../artifacts/contracts/MyGovernor.sol/MyGovernor.json");
require('dotenv').config({path: '../.env'});
const minDelay =  45992;

async function main() {
  
  const provider = new CeloProvider("https://alfajores-forno.celo-testnet.org");
  await provider.ready;

  const deployer = new CeloWallet(String(process.env.PRIVATE_KEY_DEPLOYER), provider);
  const proposer = new CeloWallet(String(process.env.PRIVATE_KEY_PROPOSER), provider);
  const executer = new CeloWallet(String(process.env.PRIVATE_KEY_EXECUTER), provider);

  console.log("deployer: ", deployer.address);
  console.log("proposer: ", proposer.address);
  console.log("executer: ", executer.address);
  
  const proposers = [proposer.address];
  const executers = [executer.address];
  console.log(proposers);
  const TimelockController = new ethers.ContractFactory(timelockArtifact.abi, timelockArtifact.bytecode, deployer);
  console.log(executers);
  const timelockController = await TimelockController.deploy(minDelay, proposers, executers );
  await timelockController.deployed();
  console.log("TimelockController deployed to:", timelockController.address);

  const GovernanceTokenERC20 = new ethers.ContractFactory(governanceTokenArtifact.abi, governanceTokenArtifact.bytecode, deployer);
  const governanceTokenERC20 = await GovernanceTokenERC20.deploy();
  await governanceTokenERC20.deployed();

  console.log("governanceTokenERC20 deployed to:", governanceTokenERC20.address);

  const MyGovernor = new ethers.ContractFactory(myGovernorArtifact.abi, myGovernorArtifact.bytecode, deployer);
  const myGovernor = await MyGovernor.deploy(governanceTokenERC20.address, timelockController.address);
  await myGovernor.deployed();

  console.log("myGovernor deployed to:", myGovernor.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
