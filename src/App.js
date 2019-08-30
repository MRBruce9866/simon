import React from 'react';
import Simon from './components/simon/Simon';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="row text-center justify-content-center mt-5">
        <div className="col-12">
          <Simon/>
        </div>
      </div>
    </div>
    
  )
}

export default App;
