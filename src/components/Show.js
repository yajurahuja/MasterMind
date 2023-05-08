import React from 'react'

export default function Show({onClick_}) {
  return (
    <div className="show" onClick={onClick_}>
      <h1>How to play?</h1>
      <ol>
        <li>The computer picks a sequence of 4 colored pegs from the 6 colors that you see on the keypad. The sequence is hidden from you till the end of the game.</li>
        <li> Your objective is to guess the exact sequence of colors that is the correct color at the correct position. You will get 9 tries to guess the sequence.</li>
        <li> After each guess that you submit, the computer will check if you guessed correctly. If you did not guess correctly, a hint will be returned.</li>
        <li>The hint will be displayed on the right of the guess and will have either black or red pegs in no particular order. 
            <ol type="a">
                <li>A Black peg indicates that one of the pegs of your guess is of the correct color and at the right position.</li>
                <li>A Red peg indicates that one of the pegs of your guess is of the correct color but at the wrong position.</li>
            </ol>
        </li>
        <li>If you guess the correct sequence, you win the game :)</li>
        <li>If you exhaust all the turns before you can guess the correct sequence, you lose the game. The correct sequence chosen by the computer will be displayed.</li>
      </ol>
      <br />
      <br />
      <br />
        <ol type="A">
            <li>Guess: To make a guess, select the colors from the keypad on the screen. Alternatively, you can use your keyboard (press from [0-5]) to choose the color.</li>
            <li>Submit: After you have made a guess sequence, click Submit on the keypad or press Enter on the keyboard.</li>
            <li>Undo: Click undo on the screen keypad or press backspace on your keyboard. You cannot undo a guess once it has been submitted.</li>
        </ol>
    </div>
  )
}