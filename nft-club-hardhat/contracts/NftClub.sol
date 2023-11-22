// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Generator.sol";

contract NftClub {
    struct Collection {
        address collectionAddress;
        uint256 price;
        string name;
        string URI;
    }

    address public s_owner;
    uint256 public s_nextCollectionId;
    mapping(uint256 => Collection) public s_collections;
    mapping(uint256 => mapping(address => bool)) public s_nftOwners;
    Collection[] private s_currentCollections;

    error NftClub__NotOwner();
    error NftClub__IncorrectPrice();
    error NftClub__CollectionDoesNotExist();

    event CollectionCreated(
        uint256 indexed collectionId,
        address indexed collectionAddress,
        string URI
    );
    event NftBought(uint256 indexed collectionId, address indexed buyer);

    constructor() {
        s_owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != s_owner) revert NftClub__NotOwner();
        _;
    }

    function createCollection(
        string memory _name,
        string memory _symbol,
        uint256 _price,
        string memory _baseTokenURI
    ) external onlyOwner {
        uint256 id = s_nextCollectionId;
        ERC721Generator newCollection = new ERC721Generator(
            _name,
            _symbol,
            _baseTokenURI
        );
        Collection memory collection = Collection({
            collectionAddress: address(newCollection),
            price: _price,
            name: _name,
            URI: _baseTokenURI
        });
        s_collections[id] = collection;
        s_currentCollections.push(collection);
        emit CollectionCreated(id, address(newCollection), _baseTokenURI);
        s_nextCollectionId++;
    }

    function buyNft(uint256 _collectionId) external payable {
        if (_collectionId >= s_nextCollectionId)
            revert NftClub__CollectionDoesNotExist();
        if (msg.value < s_collections[_collectionId].price)
            revert NftClub__IncorrectPrice();
        ERC721Generator collection = ERC721Generator(
            s_collections[_collectionId].collectionAddress
        );
        collection.mint(msg.sender);
        s_nftOwners[_collectionId][msg.sender] = true;
        emit NftBought(_collectionId, msg.sender);
    }

    function verifyOwnership(
        uint256 _collectionId,
        address _user
    ) external view returns (bool) {
        if (_collectionId >= s_nextCollectionId)
            revert NftClub__CollectionDoesNotExist();
        return s_nftOwners[_collectionId][_user];
    }

    function getCollections() public view returns (Collection[] memory) {
        return s_currentCollections;
    }
}
