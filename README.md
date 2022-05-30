# Climate Guardians DAO

<p align="center">
  <a href="https://climateguardians.io/">
    <img src="https://climateguardians.io/wp-content/uploads/2022/05/logoname-1.png" alt="climate guardians logo" title="Go to climateguardians.io" width="300" style="border:none;"/>
  </a>
</p>

## What is the Climate Guardians DAO?
The Climate Guardians DAO is a decentralized organization that is working to protect the environment and the people who live in it. It wants to achieve this by gamifying climate protection and by providing a platform for people to contribute to the cause. 

Climate Guardians is currently developing the First “Play To Preserve” Mobile Strategy Game Where Players Team Up To Fight Deforestation - While Making A Real-World Impact! 

## The big idea
Climate Guardians - bringing crypto back to earth. Unless you just landed here from the Moon you already know of the massive change of consumer preferences for climate and environmentally friendly products. But there's one holdout area where it's just like it used to be, in past times, right? Game-developing still focuses on ego-shooters, football & racing games. Today, consumers have little possibility to play games that align with their purpose, apart from a few financed by educational organizations that look like they are straight out of the 80s, just without the fun factor. Meanwhile, ever since Metal Gear Solid broke the fourth wall back in 1998, games with a link to the real world have been getting more popular every year. But few genuine real world links have been created, because it is such a hard thing to do it.. Impact gaming has been a niche, where fractions of revenue was spent on ESG (environmental social governance)  purposes. That’s great for the environment, but does not hook the player to change the world.

## Game basics
Climate Guardians is a new type of strategy game that gives the player the possibility to change the world by actually stopping deforestation in the real world. Players grow and improve their own base acquiring resources given to them by nature in order to fight a major threat – the extinction of the forest and consequently the loss of all life on earth. Players gather in-game resources such as water, wood and amber and earn the in-game token. The token-holders govern the Rainforest DAO treasury backed by real world preserved land and CO2. Having a set amount of NFTs, players build up their base, fight evil, and train with other players via PvP. 

## Celo Camp & Climate Guardians
Climate Guardians is proud to be part of Celo Camp's batch Five. Celo Camp is an eight-week virtual accelerator, designed by Upright in collaboration with cLabs, for startups building dApps on the Celo blockchain. Celo Camp brings together teams from around the world who are committed to build an open financial system that brings the conditions for prosperity to everyone. The camp is an independent initiative run by entrepreneurs passionate about the potential for global financial inclusion, mass adoption of digital money, and acceleration of startups that will build this vision. Visit [www.celocamp.com](http://www.celocamp.com/) for more information.

## Why Celo?
Celo is an open platform that makes financial tools accessible to anyone with a mobile phone. Celo embraces a full-stack approach, reimagining technology at every layer. Celo’s innovations are designed along with communities around the world. These are the three main reasons Upright chose Celo:

1. Celo is truly decentralized and open-source.
2. We believe strongly in Celo’s mission of building an open financial system that brings borderless applications to anyone with a mobile phone. Read more about [Celo’s mission](https://celo.org/about).
3. cLabs has an incredibly talented team that is engaged with Celo Camp and values the open-source developer community. The global Celo community have created a full stack platform that is mobile first, fully EVM compatible, has fractional gas fees and capable of Visa scale throughput.

For Celo Camp the Climate Guardians team has worked hard to deliver a MVP with Celo integration. We are proud to announce that our MVP is now live on Celo's Alfajores Testnet.

## MVP Demo video

https://user-images.githubusercontent.com/33607180/170816547-6d26e95e-e48d-4702-89ca-c9258b5cacf7.mp4

## MVP Tech-stack
We have been working hard on delivering our first MVP build in Unity. For Celo Camp we defined the following MVP scope:

- Base Building with proper resource economy.
- Crafting, training, and upgrading units.
- Land Reclamation Mode (PvE Content)
- integration showcase with the Chainsafe SDK deployed on CELO Testnet (https://docs.gaming.chainsafe.io/importing-nfts)

Player's are now able to mint and open a Climate Guardians pack directly in the Unity MVP. We used the Chainsafe SDK to connect the minting and open pack functions. The NFT metadata is uploaded to IPFS using Pinata pinning service. The Guardian NFT's point to both .img files (2D) and .glb files (3D) living on IPFS. The contracts are live on Alfajores Testnet and the addresses can be found in the contractAddresses.json file. We also started working on the Climate Guardians DAO contracts, which will be used in the future to govern the in-game treasury.

## Let's get technical: Compile & deploy smart contracts

First run

```
npx hardhat compile
```

to compile the smart contracts.

Then run

```
node scripts/deploy.js
```

to deploy the smart contracts.

## mint and open Pack

Run

```
node scripts/mintPack.js
```

to mint a pack. Then run 

```
node scripts/openPack.js
```
to open a pack and get three cards.
