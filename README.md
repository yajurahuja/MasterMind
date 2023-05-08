# MasterMind
This is an implementation of the Mastermind game using smart contracts. The game is developed in the hardhat development environment. The front-end and server is Reactjs and node-express. The Mastermind game also support zkSNARK proofs for verification.

## Dependecies and Environment

To run the game, we need the following:
1) node package manager
2) Hardhat 
3) Reactjs
4) node-express
5) Circom
6) snarkjs
7) Axios
8) MetaMask

## Setup
Once we have all the requirement we first run the zero knowledge script to generate verification key, prover key, and Wasm file for the circuit. This will remain the same and used in the game. 

### `cd src/zkp_circuits/scripts`
### `./compile.sh`

Enter the required entropy input which would be any random string.
This will generate the required files which are then stored in /src/zkproof 

## Setup the hardhat local blockchain

In a separate terminal, run the following command
### `npx hardhat node`

This will start the local blockchain. It also provides 20 test accounts with ether for running on local node. Use the private key of any account and import an account to MetaMask to get ETH(dummy) to play the game.

## Setup the node-express server

In a separeate terminal, run the following command
### `npm run dev`

This will start the backend server at http://localhost:8000

## Setup the smart contract and run the React App
In the original terminal, run the following command

### `npx hardhat compile`
### `npx hardhat run --network localhost scripts/deploy.js`

The smart contract will be deployed on the local hardhat blockchain. The execution will return the address of the smart contract. Copy that address and set contractAddress variable at line 7 in /src/App.js to that address. This will store the address of the smart contract and the smart contract can be called using ether.js using the address.

Now everything has been set up. One last thing you need to do is Login to MetaMask and clear the nonce in the Advanced Settings. 

Now run the following command in the terminal

### `npm start`

The Game should start up in the browser and a pending transaction must appear in MetaMask. Pay using the Eth gotten from the dummy accounts and play the game. 

## Suggestion

Please clear everytime the nonce in the advanced settings before everytime you want to play the game. If the game is not proceeding, it is most likely due to the nonce issue. After clearing the nonce, Start the New Game or just refresh. 

## References

https://courses.csail.mit.edu/6.857/2020/projects/13-Gupta-Kaashoek-Wang-Zhao.pdf
https://alexkuzmin.io/posts/zk-wordle-1/
https://blog.openreplay.com/build-a-wordle-like-game-using-react/
https://github.com/iden3/snarkjs
