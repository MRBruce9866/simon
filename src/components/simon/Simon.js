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
    allowInput: false    
  }


  game = {
    lights: [{
      light: 'greenLight',
      sound: 0
    },
    {
      light: 'redLight',
      sound: 1
    },
    {
      light: 'blueLight',
      sound: 2
    },
    {
      light: 'yellowLight',
      sound: 3
    },
    {
      light: 'whiteLight',
      sound: 1
    },
  ],
    arms: ['topLeft', 'topRight', 'btmRight', 'btmLeft'],
    sequence: [0, 1, 2, 3, 4],
    audio: []
  }
  
  componentDidMount(){
    this.loadSounds();
    setTimeout(()=>{
      this.playSequence(0);
    }, 1000);
  }

  loadSounds(){
    if(this.game.audio.length === 0){
      let sound = new Audio();
      sound.src = './sounds/coin.wav'
      this.game.audio.push(sound);
      sound = new Audio();
      sound.src = './sounds/kick.wav'
      this.game.audio.push(sound);
      sound = new Audio();
      sound.src = './sounds/wrong.wav'
      this.game.audio.push(sound);
      sound = new Audio();
      sound.src = './sounds/yoshi-spit.wav'
      this.game.audio.push(sound);
    }
    
  }

  playSound(index){
    if(index >=0 && index < this.game.audio.length){
      this.game.audio[index].currentTime = 0;
      this.game.audio[index].play()
    }
  }

  playSequence(index, cb = ()=>console.log('Done')){
    const {lights, sequence} = this.game;
    console.log(index)
    if(index < sequence.length){
      this.turnLightOn(lights[sequence[index]]);
      setTimeout(()=>{
        this.turnLightOff(lights[sequence[index]]);
        index++;
        console.log(index)
        
        this.playSequence(index);
      }, 300);
     
    }else{
      cb();
      this.turnLightOn('whiteLight');
      this.openAll();
    }
    
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


turnLightOn(light){
  
  this.playSound(light.sound);
  this.setState({[light.light]: true});
}

turnLightOff(light){
  this.setState({[light.light]: false});
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
      <div className="simon" id='simon'>
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
