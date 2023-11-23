// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NftClubStorage {
    struct Collection {
        address collectionAddress;
        uint256 price;
        string name;
        string URI;
    }

    address internal s_owner;
    uint256 internal s_nextCollectionId;
    mapping(uint256 => Collection) internal s_collections;
    mapping(uint256 => mapping(address => bool)) internal s_nftOwners;
    Collection[] internal s_currentCollections;
}
