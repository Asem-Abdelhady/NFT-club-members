// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721Generator is ERC721 {
    uint256 public nextTokenId;
    address public admin;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        admin = msg.sender;
    }

    function mint(address to) external {
        require(msg.sender == admin, "only admin");
        _safeMint(to, nextTokenId++);
    }
}
