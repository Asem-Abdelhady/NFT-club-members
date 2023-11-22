// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721Generator is ERC721 {
    uint256 public s_nextTokenId;
    address public s_admin;
    string private s_baseTokenURI;

    error ERC721Generator__NotAdmin();

    event TokenMinted(address indexed to, uint256 tokenId);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI
    ) ERC721(_name, _symbol) {
        s_admin = msg.sender;
        s_baseTokenURI = _baseTokenURI;
    }

    function mint(address _to) external {
        if (msg.sender != s_admin) revert ERC721Generator__NotAdmin();
        _safeMint(_to, s_nextTokenId);
        emit TokenMinted(_to, s_nextTokenId);
        s_nextTokenId++;
    }

    function _baseURI() internal view override returns (string memory) {
        return s_baseTokenURI;
    }
}
