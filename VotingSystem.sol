// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract VotingSystem {
    struct Candidate {
        uint8 ID;
        string name;
        uint256 votes;
    }

    Candidate[] public candidates;

    mapping(address voter => bool voted) internal voters;

    constructor(string[] memory candidateNames) {
        require(candidateNames.length > 0, "At least one candidate must be provided.");
        require(candidateNames.length < type(uint8).max, "The maximum number of candidates is 255.");

        for (uint8 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(i, candidateNames[i], 0));
        }
    }

    event VoteCast(address indexed voter, uint8 indexed candidateID, string candidateName);

    function vote(uint8 candidateID) public {
        require(candidateID < candidates.length, "There's no such candidate");
        require(!voters[msg.sender], "You have already voted");
        
        Candidate storage candidate = candidates[candidateID];
        require(bytes(candidate.name).length > 0, "There's no such candidate");

        candidate.votes++;
        voters[msg.sender] = true;

        emit VoteCast(msg.sender, candidateID, candidate.name);
    }

    function getCandidates() public view returns (Candidate[] memory){
        Candidate[] memory arrCandidates = new Candidate[](candidates.length);
        for(uint8 i = 0; i < candidates.length; i++){
            arrCandidates[i] = candidates[i];
        }

        return arrCandidates;
    }
}

