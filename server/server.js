const express = require('express');
const cors = require('cors');
const snarkjs = require("snarkjs");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./../zkproof'));

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post('/api', verifyGuess);


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

async function verifyGuess(req, res){
    var s = req.body.solCombination;
    var g = req.body.guessCombination;
    input = { solCombination: s, guessCombination: g};
    //proof generation part
    const {proof, publicSignals} = await snarkjs.groth16.fullProve(input, './../zkproof/CombinationVerify.wasm', './../zkproof/circuit_final.zkey');
    //verification part
    const vKey = JSON.parse(fs.readFileSync("./../zkproof/verification_key.json"));
    const result = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (result === true) {
        console.log("Verification OK");
    } else {
        console.log("Invalid proof");
    }
    res.send(result);
}