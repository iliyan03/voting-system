// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

error VotingSystem__AlreadyVoted();
error VotingSystem__NoSuchCandidate();
error VotingSystem__NumberOfCandidatesExceeds255();
error VotingSystem__NoCandidatesProvided();

contract VotingSystem {
    struct Candidate {
        uint8 ID;
        string name;
        uint256 votes;
    }

    Candidate[] public candidates;

    mapping(address => bool) internal voters;

    constructor(string[] memory candidateNames) {
        if(candidateNames.length == 0){
            revert VotingSystem__NoCandidatesProvided();
        }

        if(candidateNames.length > type(uint8).max){
            revert VotingSystem__NumberOfCandidatesExceeds255();
        }

        for (uint8 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(i, candidateNames[i], 0));
        }
    }

    event VoteCast(address indexed voter, uint8 indexed candidateID, string candidateName);

    // 26307
    function vote(uint8 candidateID) public {
        if(candidateID < 0 || candidateID >= candidates.length){
            revert VotingSystem__NoSuchCandidate();
        }

        if(voters[msg.sender]){
            revert VotingSystem__AlreadyVoted();
        }
        
        Candidate storage candidate = candidates[candidateID];
        if(bytes(candidate.name).length == 0){
            revert VotingSystem__NoSuchCandidate();
        }

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