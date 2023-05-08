import React from 'react'
export default function Banner({onClick_, solution, verdict}) {

    var colourMap  = {};
    colourMap['0'] = 'red';
    colourMap['1'] = 'blue';
    colourMap['2'] = 'yellow';
    colourMap['3'] = 'green';
    colourMap['4'] = 'cyan';
    colourMap['5'] = 'purple';

  return (
            <div className="win" onClick={onClick_}>
                <h1>SOLUTION</h1>
                <div className="row">
                {[...solution].map((l, i) => (
                <div key={i} className={colourMap[l]}>{l}</div>
                ))}
                </div>
                <br />
                <br />
                <div className='banner'>{verdict}</div>
            </div>

    )
}