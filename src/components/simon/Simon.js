import React from 'react';
import SimonPart from '../simonPart/SimonPart'
import SimonCenter from '../simonCenter/SimonCenter'
import './style.css';

class Simon extends React.Component {

  state = {
    closePosition: 0,
    openPostion: 6,
    opened: false,
    greenLight: false,
    redLight: false,
    yellowLight: false,
    blueLight: false,
    whiteLight: false,
    allowInput: false,
    lights: ['greenLight', 'redLight', 'blueLight', 'yellowLight', 'whiteLight']
    

  }
  
  componentDidMount(){
    // this.flashy();
    this.flashy2();
  }

  flashy(){
    let index = 0;
    setInterval(()=>{
      index++;
      if(index >= this.state.lights.length-1) index = 0;
      this.turnLightOn(this.state.lights[index]);
      if(index % 2 === 0)
        this.turnLightOn('whiteLight');
      setTimeout(()=>{
        this.turnLightOff(this.state.lights[index]);
        this.turnLightOff('whiteLight');
      }, 180)
    },200)
  }

  flashy2(){
    setInterval(()=>{
      this.open();
      setTimeout(()=>{
        this.close();
      }, 1000)
    },2000)
  }

  open(){
    if(!this.state.opened){
      const topLeft = document.getElementById('topLeft');
      const topRight = document.getElementById('topRight');
      const btmLeft = document.getElementById('btmLeft');
      const btmRight = document.getElementById('btmRight');

      topLeft.style.top = `-${this.state.openPostion}%`;
      topLeft.style.left = `-${this.state.openPostion}%`;

      topRight.style.top = `-${this.state.openPostion}%`;
      topRight.style.right = `-${this.state.openPostion}%`;

      btmLeft.style.bottom = `-${this.state.openPostion}%`;
      btmLeft.style.left = `-${this.state.openPostion}%`;

      btmRight.style.bottom = `-${this.state.openPostion}%`;
      btmRight.style.right = `-${this.state.openPostion}%`;
      this.setState({opened: true});
    }
      

  }

  close(){
    if(this.state.opened){
      const topLeft = document.getElementById('topLeft');
      const topRight = document.getElementById('topRight');
      const btmLeft = document.getElementById('btmLeft');
      const btmRight = document.getElementById('btmRight');
  
      topLeft.style.top = `-${this.state.closePosition}%`;
      topLeft.style.left = `-${this.state.closePosition}%`;
  
      topRight.style.top = `-${this.state.closePosition}%`;
      topRight.style.right = `-${this.state.closePosition}%`;
  
      btmLeft.style.bottom = `-${this.state.closePosition}%`;
      btmLeft.style.left = `-${this.state.closePosition}%`;
  
      btmRight.style.bottom = `-${this.state.closePosition}%`;
      btmRight.style.right = `-${this.state.closePosition}%`;
      this.setState({opened: false});
    }
}

toggle(){
  this.state.opened ? this.close() : this.open();
}

turnLightOn(name){
  this.setState({[name]: true});
}

turnLightOff(name){
  this.setState({[name]: false});
}

turnLightsOff(){
  this.setState({
    greenLight: false,
    redLight: false,
    yellowLight: false,
    blueLight: false,
  });
}

turnLightsOn(){
  this.setState({
    greenLight: true,
    redLight: true,
    yellowLight: true,
    blueLight: true,
  });
}


turnRandomLightOn(){
  const index = Math.floor(Math.random() * this.state.lights.length);
  this.turnLightOn(this.state.lights[index]);

  setTimeout(()=>{
    this.turnLightOff(this.state.lights[index]);
  },500);

}



  render(){
    return (
      <div className="simon">
        
          <SimonCenter position='center' color='white' lightOn={this.state.whiteLight}/>
          <SimonPart position='topLeft' color='green' lightOn={this.state.greenLight}/>
          <SimonPart position='topRight' color='red' lightOn={this.state.redLight}/>
          <SimonPart position='btmLeft' color='yellow' lightOn={this.state.yellowLight}/>
          <SimonPart position='btmRight' color='blue' lightOn={this.state.blueLight}/>
        
      </div>
    )
  }
}

export default Simon;
