import React from 'react'

export default function Show({onClick}) {
  return (
    <div className="show" onClick={onClick}>
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
  )
}