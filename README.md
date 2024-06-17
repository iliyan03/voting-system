# Simple Voting System Smart Contract

This project is a beginner-friendly smart contract that implements a simple voting system. The contract allows users to vote for candidates in an election, ensuring that each user can vote only once and keeping track of the number of votes each candidate receives.

## Objective

Create a decentralized application (DApp) that facilitates a transparent and secure voting process using blockchain technology.

## Key Components

1. **Candidates**
   - Store information about each candidate, such as their name and the number of votes they have received.

2. **Voters**
   - Maintain a record of who has voted to ensure that each user can vote only once.

3. **Vote Counting**
   - Implement a function to handle the voting process, which increments the vote count for the selected candidate.
   - Ensure the integrity of the voting process by checking if a voter has already voted.

4. **Event Emission**
   - Emit events to log significant actions, such as when a vote is cast.

## Functional Requirements

1. **Add Candidates**
   - Allow adding candidates during the contract's initialization phase.
   - Each candidate should have a unique ID for easy reference.

2. **Vote for Candidates**
   - Implement a function to allow users to vote for a candidate by specifying the candidate's ID.
   - Verify if the user has already voted and update the vote count appropriately.

3. **Track Votes**
   - Keep a record of each voter's status (whether they have voted or not).
   - Update the vote count for the selected candidate.

4. **Display Results**
   - Provide a way to query the current vote count for each candidate.