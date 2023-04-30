import React from 'react'
import "../index.css"

export default function Hint({hint}){

    
    let hintMap = {}
    hintMap['0'] = 'white'
    hintMap['1'] = 'red'
    hintMap['2'] = 'black'

    if(hint){
        return(
        <div className='hint'>
            {hint.split("").map((l, i) => (
              <div key={i} className={hintMap[l]}></div>
            ))}
        </div>
        )
    }
    
    return(
        <div className='hint'>
            <div key={1} className='white'></div>
            <div key={2} className='white'></div>
            <div key={3} className='white'></div>
            <div key={4} className='white'></div>
        </div>
    )
}