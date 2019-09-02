import React from 'react';
import SimonPart from '../simonPart/SimonPart'
import SimonCenter from '../simonCenter/SimonCenter'
import './style.css';

class Simon extends React.Component {
  constructor(){
    super()
    this.state = {
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

    this.handleButtonPress = this.handleButtonPress.bind(this)
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
      sound: 4
    },
  ],
    arms: ['topLeft', 'topRight', 'btmRight', 'btmLeft'],
    sequence: [0, 1, 2, 3, 4],
    audio: []
  }
  
  componentDidMount(){
    this.loadSounds();
    this.openAll()
  
  }

  handleButtonPress(color) {
    console.log(color)
    let light = this.game.lights.findIndex((ele)=>{ return ele.light === color+'Light'})

    console.log(light)

    this.turnLightOn(light)
  
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
      sound = new Audio();
      sound.src = './sounds/oneUp.wav'
      this.game.audio.push(sound);
    }
    
  }

  playSound(index){
    console.log(index)
    if(index >=0 && index < this.game.audio.length){
      this.game.audio[index].currentTime = 0;
      this.game.audio[index].play()
    }
  }

  playSequence(index, cb = ()=>console.log('Done')){
    const {sequence} = this.game;
    console.log(index)
    if(index < sequence.length){
      this.turnLightOn(sequence[index]);
      setTimeout(()=>{
        this.turnLightOff(sequence[index]);
        index++;
        console.log(index)
        
        this.playSequence(index);
      }, 1000);
     
    }else{
      cb();
      this.turnLightOn(4);
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


turnLightOn(index){
  let light = this.game.lights[index]
  this.playSound(light.sound);
  this.setState({[light.light]: true});

  setTimeout(()=>{
    this.turnLightOff(index);
  }, 1000);
}

turnLightOff(index){
  let light = this.game.lights[index]
  this.setState({[light.light]: false});
}

turnLightsOff(){
  for (let i = 0; i < this.game.lights.length; i++) {
    this.turnLightOff(i)
  }
}

turnLightsOn(){
  for (let i = 0; i < this.game.lights.length; i++) {
    this.turnLightOn(i)
  }
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
          <SimonCenter position='center' color='white' lightOn={this.state.whiteLight} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='topLeft' color='green' lightOn={this.state.greenLight} open={this.state.topLeft} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='topRight' color='red' lightOn={this.state.redLight} open={this.state.topRight} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='btmLeft' color='yellow' lightOn={this.state.yellowLight} open={this.state.btmLeft} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='btmRight' color='blue' lightOn={this.state.blueLight} open={this.state.btmRight} clickHandle = {this.handleButtonPress}/>
          
      </div>
    )
  }
}

export default Simon;
