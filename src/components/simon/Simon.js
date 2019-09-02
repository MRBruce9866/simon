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
      inputSequence: [],
      audio: [], 
      inputReady: true
      
    }

    this.handleButtonPress = this.handleButtonPress.bind(this)
  }


  
  componentDidMount(){
    this.loadSounds(()=>{
      setTimeout(()=>{
        this.addToSequence(()=>{
          this.playSequence()
        },2000);
      })
      
    });  
    
    
  }

  handleButtonPress(color) {
    if(this.state.inputReady){
      const newSequence = Array.from(this.state.inputSequence);
      const light = this.state.lights.findIndex((ele)=>{ return ele.light === color+'Light'})
      newSequence.push(light);
      this.turnLightOn(light)
      this.setState({
        inputSequence: newSequence
      }, ()=>{
        if(this.doesInputMatch()){
          console.log(this.state.inputSequence.length === this.state.sequence.length);
          if(this.state.inputSequence.length === this.state.sequence.length){
            console.log("You are done guessing")
            this.setState({inputSequence: []});
            this.closeAll();
            this.addToSequence(()=>{
            setTimeout(()=>{
              this.playSequence()
              },1500);
            })
          }
        }else{
          //gameOver
          console.log('Game Over')
          this.setState({
            inputReady: false
          }, ()=>{
            this.closeAll();
          })
        }
      })
      
    }
    
  
  }
  doesInputMatch(){
    const {inputSequence, sequence} = this.state;
    const length = inputSequence.length;
    if(inputSequence.join() === sequence.slice(0,length).join()){
      return true;
    }else{
      return false;
    }
  }

  addToSequence(cb = ()=>{}){
      const newSequence = Array.from(this.state.sequence);
      newSequence.push(Math.floor(Math.random()*this.state.lights.length));
    
      this.setState({
        sequence: newSequence
      }, cb)
    
    
  }

  loadSounds(cb){
    const audio = []
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
      }, cb)
    
  }

  playSound(index){
    const audio = Array.from(this.state.audio);
    if(index >=0 && index < audio.length){
      audio[index].currentTime = 0;
      this.setState({
        audio,
      })
      this.state.audio[index].play();
      }
  }

  playSequence(index = 0, cb = ()=>console.log('Done')){
    const {sequence} = this.state;
    if(this.state.inputReady){
      this.setState({inputReady: false}, ()=>{
        
        setTimeout(()=>{
          if(index < sequence.length){
            this.turnLightOn(sequence[index]);
            setTimeout(()=>{
              this.turnLightOff(sequence[index]);
              index++;
      
              
              this.playSequence(index);
            }, 1000);
           
          }else{
            this.openAll();
            setTimeout(()=>{
            this.setState({inputReady: true}, cb)
            },1000);
            
          }
        },1000);
      })
    }else{
      if(index < sequence.length){
        this.turnLightOn(sequence[index]);
        setTimeout(()=>{
          this.turnLightOff(sequence[index]);
          index++;
          this.playSequence(index);
        }, 1000);
       
      }else{
        this.openAll();
        setTimeout(()=>{
        this.setState({inputReady: true}, cb)
        },1000);
        
        
      }
    }
    
    
    
  }

  closeArm(index){
    const arms = Array.from(this.state.arms);
    arms[index].status = false;
    this.setState({
      arms,
    })
  }

  openArm(index){
    const arms = Array.from(this.state.arms);
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
  const lights = Array.from(this.state.lights);
  this.playSound(lights[index].sound);
  lights[index].status = true;
  this.setState({
    lights,
  });

  setTimeout(()=>{
    this.turnLightOff(index);
  }, 500);
}

turnLightOff(index){
  const lights = Array.from(this.state.lights);
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
