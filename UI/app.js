// app.js
let web3;
let votingSystem;
let accounts;

const contractAddress = '0xd34ED04199a2fa44790d081676510Df0a784b95b';
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint8",
				"name": "candidateID",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "candidateName",
				"type": "string"
			}
		],
		"name": "VoteCast",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "candidateID",
				"type": "uint8"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "candidateNames",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "ID",
				"type": "uint8"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "ID",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "votes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "ID",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "votes",
						"type": "uint256"
					}
				],
				"internalType": "struct VotingSystem.Candidate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numOfCandidates",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const sepoliaHttps = "https://eth-sepolia.g.alchemy.com/v2/5THMljg43cZS2hwJOceIROfGDURWM2mv"

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = await web3.eth.getAccounts();
            votingSystem = new web3.eth.Contract(contractABI, contractAddress);
            loadCandidates();
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider(sepoliaHttps));
        accounts = await web3.eth.getAccounts();
        votingSystem = new web3.eth.Contract(contractABI, contractAddress);
        loadCandidates();
    }
});

async function loadCandidates() {
    const candidates = await votingSystem.methods.getCandidates().call();
    const candidatesList = document.getElementById('candidatesList');
    const candidatesSelect = document.getElementById('candidatesSelect');

    candidates.forEach(candidate => {
        const listItem = document.createElement('li');
        listItem.textContent = `${candidate.name} - ${candidate.votes} votes`;
        candidatesList.appendChild(listItem);

        const optionItem = document.createElement('option');
        optionItem.value = candidate.ID;
        optionItem.textContent = candidate.name;
        candidatesSelect.appendChild(optionItem);
    });
}

async function vote() {
    const candidateID = document.getElementById('candidatesSelect').value;
    if (candidateID !== '') {
        try{
            await votingSystem.methods.vote(candidateID).send({ from: accounts[0] });
        } catch( error ){
            alert("An error occurred:", error);
            return;
        }

        document.getElementById('candidatesList').innerHTML = '';
        document.getElementById('candidatesSelect').innerHTML = '<option value="">Select a candidate</option>';
        loadCandidates();
    } else {
        alert('Please select a candidate');
    }
}
