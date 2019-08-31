import React from 'react';
import SimonPart from '../simonPart/SimonPart'
import SimonCenter from '../simonCenter/SimonCenter'
import './style.css';

class Simon extends React.Component {

  state = {
    
    greenLight: false,
    redLight: false,
    yellowLight: false,
    blueLight: false,
    whiteLight: false,
    topLeft: false,
    topRight: false,
    btmLeft: false,
    btmRight: false,
    allowInput: false,
    
  }


  game = {
    lights: ['greenLight', 'redLight', 'blueLight', 'yellowLight', 'whiteLight'],
    arms: ['topLeft', 'topRight', 'btmRight', 'btmLeft'],
  }
  
  componentDidMount(){
  }


  closeArm(name){
    this.setState({
      [name]: false
    })
  }

  openArm(name){
    this.setState({
      [name]: true
    })
  }

  closeAll(){
    this.setState({
      topLeft: false,
      topRight: false,
      btmRight: false,
      btmLeft: false,
    })
  }

  openAll(){
    this.setState({
      topLeft: true,
      topRight: true,
      btmRight: true,
      btmLeft: true,
    })
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
          <SimonPart position='topLeft' color='green' lightOn={this.state.greenLight} open={this.state.topLeft}/>
          <SimonPart position='topRight' color='red' lightOn={this.state.redLight} open={this.state.topRight}/>
          <SimonPart position='btmLeft' color='yellow' lightOn={this.state.yellowLight} open={this.state.btmLeft}/>
          <SimonPart position='btmRight' color='blue' lightOn={this.state.blueLight} open={this.state.btmRight}/>
        
      </div>
    )
  }
}

export default Simon;
