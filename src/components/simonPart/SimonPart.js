import React from 'react';
import SimonLight from '../simonLight/SimonLight'
import './style.css';

function SimonPart(props) {

  return (
    <div className={`simonPart ${props.position} ${props.open ? 'openArm':'closeArm'}`}>
      
      <SimonLight color={props.color} lightOn={props.lightOn}/>
    </div>
  )
}

export default SimonPart;
