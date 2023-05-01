import React from 'react'
import Turn from './Turn'
import Keypad from './keypad';

export default function Board({ guesses, hints, currGuess, currTurn, onClick}) {

//   return (
//     <div>
//       {guesses.map((g, i) => {
//         if (turn === i) {
//           return <Turn currentGuess={currGuess} />
//         }
//         return <Turn guess={g} /> 
//       })}
//     </div>
//   )
    // turn = 4
    // currGuess = "123"
    // guesses = [...Array(9)];
    // guesses[0] ='1234'
    // guesses[1] = '3410'
    // guesses[2] = '0021';
    // guesses[3] = '4512';
    //console.log(guesses)
    // console.log("turn:", currTurn);
    // console.log("Guess:", currGuess);
    console.log(hints);
    return (
        <div>
            <div className='column1'><h2>How to Play?</h2>
            <ol>
            <li>The computer picks a sequence of colored pegs of length from the colours you can see on the keypad. The sequence is hidden to you.</li>
            <li>Your objective is to guess the exact sequence of colors. You will get 9 tries to guess the sequence.</li>
            <li> After each guess you submit, the computer will check if you guessed correctly. If you did not guess currectly, a hint will be returned.</li>
            <li>The hint will be displayed on the right of the guess and will have either black or red pegs in no particular order
                <ol type="a">
                    <li>A black peg <div className='hintblack'></div> indicates that one of the pegs of your guess is of the right colour position</li>
                    <li>A red peg <div className='hintred'></div> indicates that one of the pegs of your guess is of the right colour but at the wrong position</li>
                </ol>
            </li>
            <li>If you are able to guess the correct sequecnce, you win the game :)</li>
            <li>If you exhaust all the turns, you lose the game. The correct sequence chosen by the comupter will be displayed</li>
            </ol>
            <ul>
                <li>Guess: To make a guess, select the colors from keypad on the screen. Alternatively you can use your keyboard (press from [0-5]) to select the color.</li>
                <li>Submit: After you have made a guess sequence, press Submit on the virtual keypad or press Enter on the keyboard</li>
                <li>Undo: Undo on the screen keypad or Backspace on your keyboard. You cannot undo a guess once it is submitted. </li>
            </ul>
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
            <div className='newGame' onClick={onClick}>New Game</div>
            <Keypad /> </div>
        </div>
        )


}