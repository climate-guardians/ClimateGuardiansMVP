const { CeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const { ethers } = require("ethers");
const myGovernorArtifact = require("../artifacts/contracts/MyGovernor.sol/MyGovernor.json");
const ERC20Artifact = require("../artifacts/contracts/GovernanceTokenERC20.sol/MyToken.json");
const contracts = require('../contracts.json');

require('dotenv').config({path: '../.env'});

(async () =>{
    const provider = new CeloProvider("https://alfajores-forno.celo-testnet.org");
    await provider.ready;

  const proposer = new CeloWallet(String(process.env.PRIVATE_KEY_PROPOSER), provider);
  const mintAmount = ethers.utils.parseEther("1"); 

  
  const erc20GovToken = new ethers.Contract(contracts.governanceTokenERC20, ERC20Artifact.abi, proposer);
  const transferCalldata = erc20GovToken.interface.encodeFunctionData(´_mint´, [proposer.address, mintAmount]);


  const governor = new ethers.Contract(contracts.myGovernor, myGovernorArtifact.abi, proposer);
  await governor.propose(
      [],
      [0],
      [transferCalldata],
      "Proposal #1: Mint 1 token to deployer",
  );

})().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});