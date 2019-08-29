import React from 'react';
import Simon from './components/simon/Simon';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div className="col-6">
          <Simon/>
        </div>
      </div>
    </div>
    
  )
}

export default App;
