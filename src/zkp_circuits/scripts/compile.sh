#!/bin/bash

#1) enter CombinationVerification folder
cd ../CombinationVerificaiton/
#2) download/create ptau file
mkdir ptau
snarkjs powersoftau new bn128 8 pot08_0000.ptau -v
snarkjs powersoftau contribute pot08_0000.ptau pot08_0001.ptau --name="User" -v -e="userinput"
snarkjs powersoftau contribute pot08_0001.ptau pot08_0002.ptau --name="User" -v -e="backend"
snarkjs powersoftau prepare phase2 pot08_0002.ptau pot08_final.ptau -v
snarkjs powersoftau verify pot08_final.ptau



#3) compile the combination verification circuit
echo "Compiling CombinationVerify.circom..."
circom CombinationVerify.circom --r1cs --wasm --sym
snarkjs r1cs info CombinationVerify.r1cs
snarkjs r1cs export json CombinationVerify.r1cs CombinationVerify.r1cs.json
#r1cs: r1cs constraint system of the circuit in binary format
#wasm: the wasm code to generate the witness 
#sym: a symbols file required for debugging and printing the constraint system

#4) Get proving key
snarkjs groth16 setup CombinationVerify.r1cs pot08_final.ptau circuit_0000.zkey


#first contribution
snarkjs zkey contribute circuit_0000.zkey circuit_0001.zkey --name="1st Contributor Name" -v
 #second contribution
snarkjs zkey contribute circuit_0001.zkey circuit_0002.zkey --name="Second contribution Name" -v -e="Another random entropy"
#third contribution
snarkjs zkey export bellman circuit_0002.zkey  challenge_phase2_0003
snarkjs zkey bellman contribute bn128 challenge_phase2_0003 response_phase2_0003 -e="some random text"
snarkjs zkey import bellman circuit_0002.zkey response_phase2_0003 circuit_0003.zkey -n="Third contribution name"

snarkjs zkey verify CombinationVerify.r1cs pot08_final.ptau circuit_0003.zkey

snarkjs zkey beacon circuit_0003.zkey circuit_final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"
snarkjs zkey verify CombinationVerify.r1cs pot08_final.ptau circuit_final.zkey

#5) Export verification key
snarkjs zkey export verificationkey circuit_final.zkey verification_key.json


#6) Generate verification.sol
snarkjs zkey export solidityverifier circuit_final.zkey ../../../contracts/verifier.sol

#7) Copy the files to the zkproof folder
cp circuit_final.zkey ../../../zkproof 
cp verification_key.json ../../../zkproof
cp CombinationVerify_js/CombinationVerify.wasm ../../../zkproof/
cd ..