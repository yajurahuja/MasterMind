import React from 'react'
import Turn from './Turn'
import Keypad from './keypad';

export default function Board({ guesses, hints, currGuess, currTurn }) {

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
            <div className='column1'>Rules!</div>
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
            <div className='column3'> <Keypad /> </div>
        </div>
        )


}