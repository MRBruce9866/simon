import React from 'react';
import SimonLight from '../simonLight/SimonLight'
import './style.css';

function SimonCenter(props) {

  return (
    <div className={`simonCenter ${props.position}`} id={props.position}>
      <SimonLight color={props.color} lightOn={props.lightOn} clickHandle={props.clickHandle}/>
      <button className="lightButton" onClick={()=>{
        props.clickHandle(props.color);
      }}></button>
    </div>
  )
}

export default SimonCenter;
