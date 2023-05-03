import React, { useEffect, useState } from 'react'
import useMastermind from '../hooks/gamelogic'
import Board from './Board';
import Show from './Show';

export default function MmasterMind({solContract, solCombination}) {
    //it calls the game logic from functionality 
    const {currTurn, currGuess, isCorrect, guesses, hints, handleInput} = useMastermind({solContract, solCombination});
    const [banner, showBanner] = useState(false); 

    const onClick = () => {
        // showBanner(true);
        window.location.reload();
    }
    // const onClickBanner = () => {
    //     showBanner(false);
    // }

    useEffect(() => {
        //run the handleInput function whenever a key is pressed
            window.addEventListener('keyup', handleInput)

        if (isCorrect) {
            console.log("You Win!") //TODO
            setTimeout(() => showBanner(true), 2000)
            window.removeEventListener('keyup', handleInput)
          }
          if (currTurn >= 9) {
            console.log("You Lose!") //TODO
            setTimeout(() => showBanner(true), 2000)
            window.removeEventListener('keyup', handleInput)
          }
        //remove the event listener attached to the keyup 
        return () => window.removeEventListener('keyup', handleInput);
        
    }, [handleInput, isCorrect, currTurn])
    

    return (
        <div>
            {/* {banner && <Show onClick={onClickBanner}/>} */}
            {<Board guesses={guesses} hints={hints} currGuess={currGuess} currTurn={currTurn} onClick={onClick}/>}
        </div>
    )
}