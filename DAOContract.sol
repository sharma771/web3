// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAOContract {
    struct Proposal {
        string description;
        uint voteCount;
    }

    Proposal[] public proposals;
    mapping(address => bool) public voted;

    constructor() {
        proposals.push(Proposal("Enable creator payments", 0));
    }

    function voteOnProposal(uint proposalId, bool support) public {
        require(!voted[msg.sender], "Already voted");
        if (support) {
            proposals[proposalId].voteCount++;
        }
        voted[msg.sender] = true;
    }

    function getProposal(uint id) public view returns (string memory, uint) {
        Proposal storage p = proposals[id];
        return (p.description, p.voteCount);
    }
}
