import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.onload = ()=>{

    document.getElementById("simon").focus();
    
}

ReactDOM.render(<App />, document.getElementById('root'));