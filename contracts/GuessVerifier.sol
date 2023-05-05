//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


//This is an interface so that it can call the functions from the verify.sol generated from snarjs using circom circuits
interface GuessVerifier {
        function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[8] memory input //Our input 
    ) external view returns (bool r);
}

contract MasterMindVerifier{

    GuessVerifier GV;

    constructor(address _verifier)
    {
        GV =  GuessVerifier(_verifier);
    }
    
    function verifyHint(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[8] memory input //Our input 
    ) external view returns (bool r){
        return GV.verifyProof(a, b, c, input);
    }
}