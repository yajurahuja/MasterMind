import React from 'react'
import Hint from './Hint'
import "../index.css"

export default function Turn({guess, hint}) {

    var colourMap  = {};
    colourMap['0'] = 'red';
    colourMap['1'] = 'blue';
    colourMap['2'] = 'yellow';
    colourMap['3'] = 'green';
    colourMap['4'] = 'cyan';
    colourMap['5'] = 'purple';

    if (guess) {
    
        return (
          <div className="row">
            {[...guess].map((l, i) => (
              <div key={i} className={colourMap[l]}>{l}</div>
            ))}
            {[...Array(4 - guess.length)].map((_,i) => (
              <div key={i}></div>
            ))}
          <div className='gap'></div>
          <Hint key={4} hint={hint} /> 
          </div>
        )
    }

    return(
      <div>
        <div className="row">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className='gap'></div>
        <Hint key={4} hint={hint} /> 
        </div>
      </div>)
    
  
}