const { StaticCeloProvider } = require("@celo-tools/celo-ethers-wrapper");
const { ethers } = require("ethers");
require('dotenv').config({path: '../.env'});

var range = function(start, end, step) {
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;

    if (step === 0) {
        throw TypeError("Step cannot be zero.");
    }

    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step == "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart == "number") {

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

    } else if (typeofStart == "string") {

        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }

    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;

}

async function getContractAddress (address, amount){
    const nonceArray = [];
    const provider = new StaticCeloProvider(process.env.ALFAJORES_API);
    await provider.ready;
    const sender = String(address);
    const lowestNonce = await provider.getTransactionCount(sender);
    const highestNonce = await provider.getTransactionCount(sender) + amount -1;
    const nonces = range(lowestNonce, highestNonce, 1);
    for (let nonce of nonces){
        let contractAddress = ethers.utils.getContractAddress({from: address, nonce: ethers.BigNumber.from(nonce.toString()).toHexString()});
        nonceArray.push(contractAddress);
    }
    return nonceArray;
}

module.exports = {getContractAddress};