import React from 'react';
import './style.css';

function SimonLight(props) {
  return (
    <div className={`simonLight ${props.color} ${props.lightOn ? 'on': 'off'}`}>
      
    </div>
  )
}

export default SimonLight;
