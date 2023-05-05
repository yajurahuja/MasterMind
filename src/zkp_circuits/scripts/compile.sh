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
snarkjs zkey contribute circuit_0000.zkey circuit_final.zkey --name="user" -v -e="usreinput"
snarkjs zkey verify CombinationVerify.r1cs pot08_final.ptau circuit_final.zkey
# #TODO:
# #second contribution
# #third contribution

#5) Export verification key
snarkjs zkey export verificationkey circuit_final.zkey verification_key.json


#6) Generate verification.sol
snarkjs zkey export solidityverifier circuit_final.zkey ../../../contracts/verifier.sol
cd ..