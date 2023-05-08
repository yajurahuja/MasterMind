import React from 'react'
import Turn from './Turn'
import Keypad from './keypad';
import GuessVerifier from './verifier';

export default function Board({ guesses, hints, currGuess, currTurn, onClickNewGame, solCombination, onClickShowRules}) {

    console.log(hints);
    console.log(solCombination);
    console.log("Board", guesses)
    return (
        <div>
            <div className='column1'>
                <div className='clbox'>
                    <div className='newGame' onClick={onClickNewGame}>New Game</div>
                    <br /><br />
                    <br /><br /><br /><br /><br />
                    <div className='showRules' onClick={onClickShowRules}>Show Rules</div>
                </div>
            </div>
            <div className='column2'>
                <div className='rowborder'></div>
                {guesses.map((g, i) => {
                if(currTurn === i)
                { 
                    return  <Turn key={i} guess={currGuess} hint={null}/>
                }
                return <Turn key={i} guess={g} hint={hints[i]} />
                })}
                <div className='rowborder'></div>
            </div>
            <div className='column3'> <br /><br /><br />
            <GuessVerifier solCombination={solCombination} hints={hints} guesses={guesses} />
            <Keypad /> </div>
        </div>
        )


}