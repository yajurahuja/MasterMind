import React, { useEffect, useState } from 'react'
import useMastermind from '../hooks/gamelogic'
import Board from './Board';

export default function MmasterMind({solContract, solCombination}) {
    //it calls the game logic from functionality 
    const {currTurn, currGuess, isCorrect, guesses, hints, handleInput} = useMastermind({solContract, solCombination}); 

    const onClickPlay = () => {
        window.location.reload();
    }

    useEffect(() => {
        //run the handleInput function whenever a key is pressed
            window.addEventListener('keyup', handleInput)

        if (isCorrect) {
            console.log("You Win!") //TODO
            window.removeEventListener('keyup', handleInput)
          }
          if (currTurn >= 9) {
            console.log("You Lose!") //TODO
            window.removeEventListener('keyup', handleInput)
          }
        //remove the event listener attached to the keyup 
        return () => window.removeEventListener('keyup', handleInput);
        
    }, [handleInput])
    

    return (
        <div>
            {<Board guesses={guesses} hints={hints} currGuess={currGuess} currTurn={currTurn} onClick={onClickPlay}/>}
        </div>
    )
}