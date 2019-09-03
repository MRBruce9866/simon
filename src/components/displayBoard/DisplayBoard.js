import React from 'react';
import './style.css';

function DisplayBoard(props) {

  return (
    <div class="displayBoard py-4">
        <h3 className="boardTitle ">{props.title}</h3>
        <h1>{props.score}</h1>
    </div>
  )
}

export default DisplayBoard;
