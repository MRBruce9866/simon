import React from 'react';
import SimonLight from '../simonLight/SimonLight'
import './style.css';

function Simon() {
  return (
    <div className="simon">
        <SimonLight light="Green"/>
            <SimonLight  light="Red"/>
            <SimonLight  light="Blue"/>
            <SimonLight  light="Yellow"/>
    </div>
  )
}

export default Simon;
