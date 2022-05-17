// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "./common/UsingRegistryV2.sol";

abstract contract Combinator is ERC721, ERC721Burnable, Ownable {

    function combinator (address insectContrAddress, address fungiContrAddress, address plantsContrAddress, address elementalContrAddress) public view returns(uint result){
        Insect insect = Insect(insectContrAddress);
        Fungi fungi = Fungi(fungiContrAddress);
        Plants plants = Plants(plantsContrAddress);
        Elemental elemental = Elemental(elementalContrAddress);

        uint256 insectBalance = insect.balanceOf(msg.sender);
        uint256 fungiBalance = fungi.balanceOf(msg.sender);
        uint256 plantsBalance = plants.balanceOf(msg.sender);
        uint256 elementalBalance = elemental.balanceOf(msg.sender);

        if ( insectBalance == 0 && fungiBalance == 0 && plantsBalance == 0 && elementalBalance == 0 ){
            return 0;
        } else if ( insectBalance == 0 && fungiBalance == 0 && plantsBalance == 0 && elementalBalance > 0) {
            return 1;
        } else if ( insectBalance == 0 && fungiBalance == 0 && plantsBalance > 0 && elementalBalance == 0) {
            return 2;
        } else if ( insectBalance == 0 && fungiBalance == 0 && plantsBalance > 0 && elementalBalance > 0) {
            return 3;
        } else if ( insectBalance == 0 && fungiBalance > 0 && plantsBalance == 0 && elementalBalance == 0) {
            return 4;
        } else if ( insectBalance == 0 && fungiBalance > 0 && plantsBalance == 0 && elementalBalance > 0) {
            return 5;
        } else if ( insectBalance == 0 && fungiBalance > 0 && plantsBalance > 0 && elementalBalance == 0) {
            return 6;
        } else if ( insectBalance == 0 && fungiBalance > 0 && plantsBalance > 0 && elementalBalance > 0) {
            return 7;
        } else if ( insectBalance > 0 && fungiBalance == 0 && plantsBalance == 0 && elementalBalance == 0) {
            return 8;
        } else if ( insectBalance > 0 && fungiBalance == 0 && plantsBalance == 0 && elementalBalance > 0) {
            return 9;
        } else if ( insectBalance > 0 && fungiBalance == 0 && plantsBalance > 0 && elementalBalance == 0) {
            return 10;
        } else if ( insectBalance > 0 && fungiBalance == 0 && plantsBalance > 0 && elementalBalance > 0) {
            return 11;
        } else if ( insectBalance > 0 && fungiBalance > 0 && plantsBalance == 0 && elementalBalance == 0) {
            return 12;
        } else if ( insectBalance > 0 && fungiBalance > 0 && plantsBalance == 0 && elementalBalance > 0) {
            return 13;
        } else if ( insectBalance > 0 && fungiBalance > 0 && plantsBalance > 0 && elementalBalance == 0) {
            return 14;
        } else if ( insectBalance > 0 && fungiBalance > 0 && plantsBalance > 0 && elementalBalance > 0) {
            return 15;
        } 
    }

}


contract Insect is Combinator {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Insect", "INS") {}

    function mint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);
    }
}

contract Fungi is Combinator {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Fungi", "FNG") {}

    function mint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);
    }
}


contract Elemental is Combinator {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Elemental", "ELM") {}

    function mint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);
    }
}

contract Plants is Combinator {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("PLANTS", "PLT") {}

    function mint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);
    }
}

contract Pack is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply, UsingRegistryV2 {
    uint256 PRICE = 10000000000000000;
    constructor() ERC1155("Pack") {}

    function setURI(string memory newuri) public {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        payable
    {
        require(msg.value == PRICE, "The amount of ether you want to send is incorrect!");
        require(amount == 1, "Only one NFT is allowed to be minted at a time!");
        require( totalSupply(id) < 555, "Supply exceeded!");
        _mint(account, id, amount, data);
    }

    function rngMint (address account, uint256 id, uint256 amount, uint256 randomNumber, address insectContrAddress, address fungiContrAddress, address plantsContrAddress, address elementalContrAddress) internal {
        if (randomNumber == 0) {
            _burn(account,id,amount);
            Insect insect = Insect(insectContrAddress);
            insect.mint(account);
            insect.mint(account);
            insect.mint(account);
            insect.mint(account);
        } else if ( randomNumber == 1) {
            _burn(account,id,amount);
            Fungi fungi = Fungi(fungiContrAddress);
            fungi.mint(account);
            fungi.mint(account);
            fungi.mint(account);
            fungi.mint(account);
        } else if ( randomNumber == 2) {
            _burn(account,id,amount);
            Plants plants = Plants(plantsContrAddress);
            plants.mint(account);
            plants.mint(account);
            plants.mint(account);
            plants.mint(account);
        } else if ( randomNumber == 3) {
            _burn(account,id,amount);
            Elemental elemental = Elemental(elementalContrAddress);
            elemental.mint(account);
            elemental.mint(account);
            elemental.mint(account);
            elemental.mint(account);
        } else if ( randomNumber == 4) {
            _burn(account,id,amount);
            Insect insect = Insect(insectContrAddress);
            Fungi fungi = Fungi(fungiContrAddress);
            Plants plants = Plants(plantsContrAddress);
            Elemental elemental = Elemental(elementalContrAddress);
            insect.mint(account);
            fungi.mint(account);
            plants.mint(account);
            elemental.mint(account);
        }
    }


    function openPack(address account, uint256 id, uint256 amount, address insectContrAddress, address fungiContrAddress, address plantsContrAddress, address elementalContrAddress) 
    public
    {
        
        bytes32 randomNumber = getRandom().random();
        rngMint(account, id, amount, uint256(randomNumber)%5, insectContrAddress, fungiContrAddress, plantsContrAddress, elementalContrAddress);
    }
    
        // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
    
}
