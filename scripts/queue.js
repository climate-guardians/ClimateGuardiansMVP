// const { CeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const { ethers, Wallet } = require("ethers");
const myGovernorArtifact = require("../artifacts/contracts/MyGovernor.sol/MyGovernor.json");
const ERC20Artifact = require("../artifacts/contracts/GovernanceTokenERC20.sol/MyToken.json");
const contracts = require('../contracts.json');

require('dotenv').config({path: '../.env'});

(async () =>{
    const provider = new ethers.providers.InfuraProvider("rinkeby", "100339d2a5ce47dd854e9c4e483cf2a3");
    await provider.ready;

    const deployer = new Wallet(String(process.env.PRIVATE_KEY_DEPLOYER), provider);
    const proposer = new Wallet(String(process.env.PRIVATE_KEY_PROPOSER), provider);
    const mintAmount = ethers.utils.parseEther("1"); 
    const tokenAddress = contracts.governanceTokenERC20;
  
    const erc20GovToken = new ethers.Contract("0xD3204A2bf566294a8E583BC95F3cdA997dc114BF", ERC20Artifact.abi, deployer);
    const transferCalldata = erc20GovToken.interface.encodeFunctionData("mint", [proposer.address, mintAmount]);


    const governor = new ethers.Contract("0x53b8A1B99b69A4D6E4634aB961a67e7FCa9D3D48", myGovernorArtifact.abi, proposer);
    const descriptionHash = ethers.utils.id("Proposal #1: Mint 1 token to proposer",);

    await governor.queue(
    [tokenAddress],
    [0],
    [transferCalldata],
    descriptionHash, { from: proposer.address }
    );

})().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});