import React, { useEffect, useState } from 'react'
import useMastermind from '../hooks/gamelogic'
import Banner from './banner';
import Board from './Board';
import Show from './Show';

export default function MmasterMind({solContract, solCombination}) {
    //it calls the game logic from functionality 
    const {currTurn, currGuess, isCorrect, guesses, hints, handleInput} = useMastermind({solContract, solCombination});
    const [win, setWin] = useState(false); 
    const [loss, setLoss] = useState(false); 
    const [rules, setRules] = useState(false);
    //console.log("Masterind: ", solCombination);
    const onClickNewGame = () => {
        window.location.reload();
    }
    const onClick_win = () => {
        setWin(false);
    }

    const onClick_loss = () => {
        setLoss(false);
    }

    const onClick_show = () => {
        setRules(false);
    }

    const onClickShow = () => {
        setRules(true);
    }

    useEffect(() => {
        //run the handleInput function whenever a key is pressed
            window.addEventListener('keyup', handleInput)

        if (isCorrect) {
            console.log("You Win!") //TODO
            setWin(true);
            window.removeEventListener('keyup', handleInput)
          }
          if (currTurn >= 9) {
            console.log("You Lose!") //TODO
            setLoss(true);
            window.removeEventListener('keyup', handleInput)
          }
        //remove the event listener attached to the keyup 
        return () => window.removeEventListener('keyup', handleInput);
        
    }, [handleInput, isCorrect, currTurn])
    

    return (
        <div>
            {rules && <Show onClick_={onClick_show} />}
            {win && <Banner onClick_={onClick_win} solution= {solCombination} verdict ={"You Win!"} />}
            {loss && <Banner onClick_={onClick_loss} solution= {solCombination} verdict ={"You Lose!"} />}
            {<Board guesses={guesses} hints={hints} currGuess={currGuess} currTurn={currTurn} onClickNewGame={onClickNewGame} solCombination={solCombination} onClickShowRules={onClickShow}/>}
        </div>
    )
}