const pinata = require("pinata");
const pinataClient = pinata.createClient({
    apiToken: process.env.PINATA_API_TOKEN,
    apiSecret: process.env.PINATA_API_SECRET,
    defaultOptions: {
        headers: {
            "pinata-contract-version": "0.0.1",
            "pinata-contract-author": "celo-contracts"
        }
    }
});

