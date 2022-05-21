// const { CeloProvider, CeloWallet } = require("@celo-tools/celo-ethers-wrapper");
const { ethers, Wallet } = require("ethers");
const myGovernorArtifact = require("../artifacts/contracts/MyGovernor.sol/MyGovernor.json");
const ERC20Artifact = require("../artifacts/contracts/GovernanceTokenERC20.sol/MyToken.json");
const contracts = require('../contracts.json');

require('dotenv').config({path: '../.env'});

(async () =>{
    const provider = new ethers.providers.InfuraProvider("rinkeby", "100339d2a5ce47dd854e9c4e483cf2a3");
    await provider.ready;
    const proposer = new Wallet(String(process.env.PRIVATE_KEY_PROPOSER), provider);
    const governor = new ethers.Contract("0x53b8A1B99b69A4D6E4634aB961a67e7FCa9D3D48", myGovernorArtifact.abi, proposer);
    const descriptionHash = ethers.utils.id("Proposal #1: Mint 1 token to proposer",);

    await governor.castVote(
    descriptionHash,
    0, { from: proposer.address }
    );

})().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});