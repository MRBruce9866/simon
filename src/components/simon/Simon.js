import React from 'react';
import SimonPart from '../simonPart/SimonPart'
import SimonCenter from '../simonCenter/SimonCenter'
import './style.css';

class Simon extends React.Component {
  constructor(){
    super()
    this.state = {
      lights: [{
        light: 'greenLight',
        status: false,
        sound: 0
      },
      {
        light: 'redLight',
        status: false,
        sound: 1
      },
      {
        light: 'blueLight',
        status: false,
        sound: 2
      },
      {
        light: 'yellowLight',
        status: false,
        sound: 3
      }
    ],
      arms: [{
        arm: 'topLeft',
        status: false,
      },{
        arm: 'topRight',
        status: false,
      },{
        arm: 'btmRight',
        status: false,
      },{
        arm: 'btmLeft',
        status: false,
      },
    ],
      sequence: [],
      audio: []
      
    }

    this.handleButtonPress = this.handleButtonPress.bind(this)
  }


  
  componentDidMount(){
    this.loadSounds();  

    setInterval(()=>{
      this.openAll()
      setTimeout(()=>{
      this.closeAll()
      }, 1000)
    }, 2000)
  }

  handleButtonPress(color) {
    console.log(color)
    let light = this.state.lights.findIndex((ele)=>{ return ele.light === color+'Light'})

    console.log(light)
    this.turnLightOn(light)
  
  }

  loadSounds(){
    let audio = []

    if(this.state.audio.length === 0){
      let sound = new Audio();
      sound.src = './sounds/coin.wav'
      audio.push(sound);
      sound = new Audio();
      sound.src = './sounds/kick.wav'
      audio.push(sound);
      sound = new Audio();
      sound.src = './sounds/wrong.wav'
      audio.push(sound);
      sound = new Audio();
      sound.src = './sounds/yoshi-spit.wav'
      audio.push(sound);
      sound = new Audio();
      sound.src = './sounds/oneUp.wav'
      audio.push(sound);

      this.setState({
        audio,
      })
    }
    
  }

  playSound(index){
    let audio = Array.from(this.state.audio);
    console.log(index)
    if(index >=0 && index < audio.length){
      audio[index].currentTime = 0;
      this.setState({
        audio,
      })
      this.state.audio[index].play();
      }
  }

  playSequence(index, cb = ()=>console.log('Done')){
    const {sequence} = this.state;
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

  closeArm(index){
    let arms = Array.from(this.state.arms);
    arms[index].status = false;
    this.setState({
      arms,
    })
  }

  openArm(index){
    let arms = Array.from(this.state.arms);
    arms[index].status = true;
    this.setState({
      arms,
    })
  }

  closeAll(){
    for (let index = 0; index < this.state.arms.length; index++) {
      this.closeArm(index);
    }
  }
  

  openAll(){
    for (let index = 0; index < this.state.arms.length; index++) {
      this.openArm(index);
    }
  }


turnLightOn(index){
  let lights = Array.from(this.state.lights);

  this.playSound(lights[index].sound);
  lights[index].status = true;
  this.setState({
    lights,
  });

  setTimeout(()=>{
    this.turnLightOff(index);
  }, 1000);
}

turnLightOff(index){
  let lights = Array.from(this.state.lights);
  lights[index].status = false;
  this.setState({
    lights,
  });
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
  this.turnLightOn(index);
}
  render(){
    return (
      <div className="simon" id='simon'>
          <SimonCenter position='center'/>
          <SimonPart position='topLeft' color='green' lightOn={this.state.lights[0].status} open={this.state.arms[0].status} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='topRight' color='red' lightOn={this.state.lights[1].status} open={this.state.arms[1].status} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='btmRight' color='blue' lightOn={this.state.lights[2].status} open={this.state.arms[2].status} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='btmLeft' color='yellow' lightOn={this.state.lights[3].status} open={this.state.arms[3].status} clickHandle = {this.handleButtonPress}/>
          
          
      </div>
    )
  }
}

export default Simon;
