import React from 'react'

export default function Keypad() {

    

    const onClick = (key) => {
        const event = new KeyboardEvent('keyup', {
            key: key,
          });
          window.dispatchEvent(event);
    }

    let colors = ['0', '1', '2', '3', '4', '5'];
    var colourMap  = {};
    colourMap['0'] = 'red';
    colourMap['1'] = 'blue';
    colourMap['2'] = 'yellow';
    colourMap['3'] = 'green';
    colourMap['4'] = 'cyan';
    colourMap['5'] = 'purple';
  return (
    <div className="keypad">
        <br />
        <br />
        {colors.map((l, i) => (
              <div key={i} className={colourMap[l]} onClick={() => onClick(l)}>{l}</div>
        ))}
        <br />
        <br />
    <div key={6} className='other' onClick={() => onClick('Enter')}>Enter</div>
    <div key={7} className='other' onClick={() => onClick('Backspace')}>Backspace</div>
    </div>
  )
}