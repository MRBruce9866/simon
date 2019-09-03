import React from 'react';
import Simon from './components/simon/Simon';
import Jumbo from './components/jumbo/Jumbo';
import Footer from './components/footer/Footer';
import './App.css';


function App() {
  return (
    <div className='wrapper'>
      <Jumbo/>
      <div className="container-full">
        <div className="row text-center justify-content-center py-5">
          <Simon/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default App;
