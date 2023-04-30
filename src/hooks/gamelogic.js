import { useState } from 'react'

export default function useMastermind({solContract, solCombination}){
    const [currTurn, setTurn] = useState(0); //keeps track of the current turn
    const [currGuess, setCurrentGuess] = useState(''); //Keeps the current Guess
    const [guesses, setGuesses] = useState([...Array(9)]); //Keeps all the previous Guesses
    const [hints, setHints] = useState([]); //Keeps all the previous Hints
    const [isCorrect, setIsCorrect] = useState(false); //Checks if the current guess is correct or not

    //This first calls the contract function to verify the contract. 
    //If the guess is correct, returns the user has won the game. TODO: Make a contract function to verify
    //Else the contract returns a hint which it forwards to the user. TODO: Make a contract functiont to generate hint
    //Do something whenever you get keyboard input 

    const handleInput = async (input) => {
        //console.log(input.key)
        //Cases
        //Enter case
        if (input.key === 'Enter') {
            //add guess if still turns remaining
            if(currTurn >= 9) {
                console.log("Game Over");
                //TODO: DO SOMETHING
                return;
            }
            if(currGuess.length !== 4){
                console.log("Can't check yet. Not correct format");
                return;
            }
            else
            {
                console.log("currGuess to be submitted: ", currGuess)
                console.log("Turn: ", currTurn)
                
                
                //update the guesses list
                setGuesses(Array => {
                    let Guesses = [...Array]
                    Guesses[currTurn] =  currGuess
                    return Guesses
                  });

                //verify the solution : Call the verifyCombination from the smart contract
                const success = await solContract.verifyCombination(currGuess);
                setIsCorrect(success)
                //await success.wait();
                console.log("Verification Complete: ");
                //1) TODO: If correct: Game over and the player wins
                //2) If false: 
                //2.1) Call the getProgress function from the smart contract
                const transaction = await solContract.getProgress(currGuess);
                await transaction.wait();
                let currHint = await solContract.returnProgress();
                setHints(Array => [...Array, currHint]);
                console.log("Hints Complete");
                //2.2) Update the hint list
                //setHints(hints.concat([hint]));
                setCurrentGuess('');
                console.log("Success:", success);
                console.log(guesses);
                console.log(hints);
                //update the turn
                setTurn(turn => turn + 1)

            }
        }
        if (input.key === 'Backspace') {
            console.log("Backspace");
            setCurrentGuess(guess => guess.slice(0, -1));
            return;
        }
        //get input from either 0-6
        if (/^[0-5]$/.test(input.key) && currGuess.length !== 4) {

            console.log("Input");
            setCurrentGuess(guess => guess + input.key)
            return;
        } 
    }
    console.log("CurrGuess:", currGuess);
    console.log("CurrTurn:", currTurn);
    return {currTurn, currGuess, isCorrect, guesses, hints, handleInput}
}
