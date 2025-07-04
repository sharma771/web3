// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SocialNetwork is Ownable, ReentrancyGuard {
    uint public postCount = 0;

    struct Post {
        uint id;
        string content;
        address author;
        bool verified;
    }

    mapping(uint => Post) public posts;
    mapping(address => bool) public verifiedCreators;

    event PostCreated(uint id, string content, address author, bool verified);
    event CreatorVerified(address creator);

    function createPost(string memory _content) public nonReentrant {
        require(bytes(_content).length > 0, "Post cannot be empty");
        postCount++;
        bool isVerified = verifiedCreators[msg.sender];
        posts[postCount] = Post(postCount, _content, msg.sender, isVerified);
        emit PostCreated(postCount, _content, msg.sender, isVerified);
    }

    function verifyCreator(address _creator) public onlyOwner {
        verifiedCreators[_creator] = true;
        emit CreatorVerified(_creator);
    }

    function getPostCount() public view returns (uint) {
        return postCount;
    }
}
