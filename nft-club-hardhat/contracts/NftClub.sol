// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Generator.sol";

contract NftClub {
    address public owner;
    uint256 public nextCollectionId;
    mapping(uint256 => address) public collections;
    mapping(uint256 => mapping(address => bool)) public collectionOwners;
    mapping(uint256 => uint256) public collectionPrices;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function createCollection(
        string memory name,
        string memory symbol,
        uint256 price
    ) external onlyOwner {
        ERC721Generator collection = new ERC721Generator(name, symbol);
        collections[nextCollectionId] = address(collection);
        collectionPrices[nextCollectionId] = price;
        nextCollectionId++;
    }

    function buyNft(uint256 collectionId) external payable {
        require(msg.value == collectionPrices[collectionId], "Incorrect price");
        ERC721Generator collection = ERC721Generator(collections[collectionId]);
        collection.mint(msg.sender);
        collectionOwners[collectionId][msg.sender] = true;
    }

    function verifyOwnership(
        uint256 collectionId,
        address user
    ) external view returns (bool) {
        return collectionOwners[collectionId][user];
    }
}
