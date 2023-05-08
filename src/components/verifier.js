
//Reference: https://github.com/iden3/snarkjs
import React, { useState } from 'react'
import axios from "axios";
const path = 'http://localhost:8000/';

//TODO: also pass the solution hash for the circuit to verify the solution provided is correct
export default function GuessVerifier({solCombination, hints, guesses})
{
    const [status, setStatus] = useState("");
    console.log("Guess Verifier", guesses);
     
    async function onClickVerify(){
        setStatus("")
        console.log("Solution received");
        console.log("Hints:", hints)
        if(hints.length > 0){
            console.log(hints.length);
            let guessCombination = [...guesses.at(hints.length - 1)].map(x => parseInt(x))
            let hint = [...hints.at(-1)].map(x => parseInt(x))
            console.log(solCombination)
            let solutionCombination = [...solCombination].map(x => parseInt(x))
            console.log(hint)
            console.log(solutionCombination, guessCombination)
            const input = {
                solCombination: solutionCombination,
                guessCombination: guessCombination
            }

            //send the input to the server for verificaition
            axios.post(path + 'api', input).then(function (response) {
                if(response)
                    setStatus("Verification OK ")
                else
                    setStatus("Invalid Proof")
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

        }
        else
        {
            console.log("No hints")
        }

    }
    return(
        <div>
        <div className='verify' onClick={onClickVerify}>Verify</div>
        <h1>{status}</h1>
        </div>
    )

}