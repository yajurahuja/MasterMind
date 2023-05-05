//Reference: https://github.com/iden3/snarkjs

const snarkjs = require("snarkjs");
const fs = require("fs");


export default function GuessVerify({solCombination, guessCombination})
{

    async function verify(){
        //This generates the proof and the public output signals.
        const { proof, publicSignals } = await snarkjs.groth16.fullProve({solCombination: solCombination, guessCombination: guessCombination}, "CombinationVerify.wasm", "circuit_final.zkey");
        //Import the verification key
        const verificationKey = JSON.parse(fs.readFileSync("verification_key.json"));
        //Verify the proof using verification Key, public output signals and the proof.
        const result = await snarkjs.groth16.verify(verificationKey, publicSignals, proof);
        console.log("Verification Status: ", result);
    }
     
    return(
        <div></div>
    )

}