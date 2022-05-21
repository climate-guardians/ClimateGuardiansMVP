// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

//abstract contract Combinator is ERC721, ERC721Burnable, Ownable, ERC721URIStorage {

    // function combinator (address insectContrAddress, address fungiContrAddress, address plantsContrAddress, address elementalContrAddress) public view returns(uint result){
        // Insect insect = Insect(insectContrAddress);
        // Fungi fungi = Fungi(fungiContrAddress);
        // Plants plants = Plants(plantsContrAddress);
        // Elemental elemental = Elemental(elementalContrAddress);

        // uint256 insectBalance = insect.balanceOf(msg.sender);
        // uint256 fungiBalance = fungi.balanceOf(msg.sender);
        // uint256 plantsBalance = plants.balanceOf(msg.sender);
        // uint256 elementalBalance = elemental.balanceOf(msg.sender);



        // if ( insectBalance == 0 && fungiBalance == 0 && plantsBalance == 0 && elementalBalance == 0 ){
        //     return 0;
        // } else if ( insectBalance == 0 && fungiBalance == 0 && plantsBalance == 0 && elementalBalance > 0) {
        //     return 1;
        // } else if ( insectBalance == 0 && fungiBalance == 0 && plantsBalance > 0 && elementalBalance == 0) {
        //     return 2;
        // } else if ( insectBalance == 0 && fungiBalance == 0 && plantsBalance > 0 && elementalBalance > 0) {
        //     return 3;
        // } else if ( insectBalance == 0 && fungiBalance > 0 && plantsBalance == 0 && elementalBalance == 0) {
        //     return 4;
        // } else if ( insectBalance == 0 && fungiBalance > 0 && plantsBalance == 0 && elementalBalance > 0) {
        //     return 5;
        // } else if ( insectBalance == 0 && fungiBalance > 0 && plantsBalance > 0 && elementalBalance == 0) {
        //     return 6;
        // } else if ( insectBalance == 0 && fungiBalance > 0 && plantsBalance > 0 && elementalBalance > 0) {
        //     return 7;
        // } else if ( insectBalance > 0 && fungiBalance == 0 && plantsBalance == 0 && elementalBalance == 0) {
        //     return 8;
        // } else if ( insectBalance > 0 && fungiBalance == 0 && plantsBalance == 0 && elementalBalance > 0) {
        //     return 9;
        // } else if ( insectBalance > 0 && fungiBalance == 0 && plantsBalance > 0 && elementalBalance == 0) {
        //     return 10;
        // } else if ( insectBalance > 0 && fungiBalance == 0 && plantsBalance > 0 && elementalBalance > 0) {
        //     return 11;
        // } else if ( insectBalance > 0 && fungiBalance > 0 && plantsBalance == 0 && elementalBalance == 0) {
        //     return 12;
        // } else if ( insectBalance > 0 && fungiBalance > 0 && plantsBalance == 0 && elementalBalance > 0) {
        //     return 13;
        // } else if ( insectBalance > 0 && fungiBalance > 0 && plantsBalance > 0 && elementalBalance == 0) {
        //     return 14;
        // } else if ( insectBalance > 0 && fungiBalance > 0 && plantsBalance > 0 && elementalBalance > 0) {
        //     return 15;
        // } 
    // }


    // The following functions are overrides required by Solidity.

    // function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    //     super._burn(tokenId);
    // }

    // function tokenURI(uint256 tokenId)
    //     public
    //     view virtual
    //     override(ERC721, ERC721URIStorage)
    //     returns (string memory)
    // {
    //     return super.tokenURI(tokenId);
    // }
//}


contract Insect is ERC721, ERC721Burnable, Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string private _baseTokenURIV;
    constructor(string memory baseTokenURIC, address packContract)ERC721("Insect", "INS") {
        _baseTokenURIV = baseTokenURIC;
        _transferOwnership(packContract);
    }

    function mint(address to) onlyOwner public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);
    }

    function baseTokenURI() public view returns (string memory) {
        return _baseTokenURIV;
    }

    /**
    * @dev Returns an URI for a given token ID
    */
    function tokenURI(uint256 _tokenId) public view virtual override(ERC721, ERC721URIStorage)returns (string memory) {
    return string(abi.encodePacked(
        baseTokenURI(),
        Strings.toString(_tokenId)));
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}

contract Fungi is ERC721, ERC721Burnable, Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string private _baseTokenURIV;
    constructor(string memory baseTokenURIC, address packContract) ERC721("Fungi", "FNG") {
        _baseTokenURIV = baseTokenURIC;
        _transferOwnership(packContract);
    }

    function mint(address to)  onlyOwner public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);
    }

    function baseTokenURI() public view returns (string memory) {
        return _baseTokenURIV;
    }

    /**
    * @dev Returns an URI for a given token ID
    */
    function tokenURI(uint256 _tokenId) public view virtual override(ERC721, ERC721URIStorage)returns (string memory) {
    return string(abi.encodePacked(
        baseTokenURI(),
        Strings.toString(_tokenId)));
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
}


// contract Elemental is Combinator {
//     using Counters for Counters.Counter;

//     Counters.Counter private _tokenIdCounter;

//     string private _baseTokenURI;
//     constructor(string memory baseTokenURI) ERC721("Elemental", "ELM") {
//         _baseTokenURI = baseTokenURI;
//     }

//     function mint(address to) public {
//         uint256 tokenId = _tokenIdCounter.current();
//         _tokenIdCounter.increment();
//         _mint(to, tokenId);
//     }
// }

contract Plants is ERC721, ERC721Burnable, Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string private _baseTokenURIV;
    constructor(string memory baseTokenURIC, address packContract) ERC721("PLANTS", "PLT") {
        _baseTokenURIV = baseTokenURIC;
        _transferOwnership(packContract);
    }

    function mint(address to)  onlyOwner public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);
    }

    function baseTokenURI() public view returns (string memory) {
        return _baseTokenURIV;
    }

    /**
    * @dev Returns an URI for a given token ID
    */
    function tokenURI(uint256 _tokenId) public view virtual override(ERC721, ERC721URIStorage)returns (string memory) {
    return string(abi.encodePacked(
        baseTokenURI(),
        Strings.toString(_tokenId)));
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}

contract Pack is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    uint256 public price = 100000000000000;
    address public fungiContrAddress;
    address public insectContrAddress;
    address public plantsContrAddress;

    string private _baseTokenURIV;
    constructor(string memory baseTokenURIC, address _fungiContrAddress,address _insectContrAddress, address _plantsContrAddress ) ERC1155("Pack") {
        _baseTokenURIV = baseTokenURIC;
        _transferOwnership(_msgSender());
        fungiContrAddress = _fungiContrAddress;
        insectContrAddress = _insectContrAddress;
        plantsContrAddress = _plantsContrAddress;
    }

    function mint( uint256 id, uint256 amount, bytes memory data)
        public
        payable
    {
        require(msg.value == price, "The amount of ether you want to send is incorrect!");
        require(amount == 1, "Only one NFT is allowed to be minted at a time!");
        require( totalSupply(id) < 555, "Supply exceeded!");
        _mint(_msgSender(), id, amount, data);
    }


    function openPack(uint256 id, uint256 amount) 
    public
    {
        _burn(_msgSender(),id,amount);
        Fungi fungi = Fungi(fungiContrAddress);
        Insect insect = Insect(insectContrAddress);
        Plants plants = Plants(plantsContrAddress);
        fungi.mint(_msgSender());
        insect.mint(_msgSender());
        plants.mint(_msgSender());
        
    }
    
        // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }


    function baseTokenURI() public view returns (string memory) {
        return _baseTokenURIV;
    }

    /**
    * @dev Returns an URI for a given token ID
    */
    function uri(uint256 _tokenId) public view override returns (string memory) {
    return string(abi.encodePacked(
        baseTokenURI(),
        Strings.toString(_tokenId)));
    }
    
}
