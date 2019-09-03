import React from 'react';
import SimonPart from '../simonPart/SimonPart'
import SimonCenter from '../simonCenter/SimonCenter'
import DisplayBoard from '../displayBoard/DisplayBoard';
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
      },
      {
        light: 'whiteLight',
        status: false,
        sound: 4
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
      score: 0,
      highScore: 10,
      spin: false,
      inputReady: false,
      gameRunning: false
      
    }

    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  intervalID;
  
  componentDidMount(){
    this.loadSounds(()=>{
      this.resetGame();
    });  
    
    
  }

  handleButtonPress(color) {
    const {inputReady, gameRunning, inputSequence, lights} = this.state;

    if(gameRunning && inputReady){
      const newSequence = Array.from(inputSequence);
      const lightIndex = lights.findIndex((ele)=>{ return ele.light === color+'Light'})
      newSequence.push(lightIndex);
      this.turnLightOn(lightIndex)
      console.log(newSequence)
      this.setState({
        inputSequence: newSequence
      }, ()=>{
        if(this.doesInputMatch()){
          if(this.state.inputSequence.length === this.state.sequence.length){
            this.setState({
              inputSequence: [], 
              score: this.state.score + 1,
               highScore: Math.max(this.state.highScore, this.state.score + 1)
              });
            this.closeAll();
            this.addToSequence(()=>{
            setTimeout(()=>{
              this.playSequence()
              },500);
            })
          }
        }else{
          console.log('Game Over')
          this.setState({
            inputReady: false,
            gameRunning: false
          }, ()=>{
            this.closeAll();
            setTimeout(()=>{
              this.resetGame();
            }, 1500);
            
          })
        }
      })
    }else if(inputReady && !gameRunning && color === 'white'){
      this.setState({inputReady: false}, ()=>{
        this.turnLightOff(4);
        this.startUpAnimation(5, 50);
      })
      
    }
  }

  startGame(){
    clearInterval(this.intervalID);
    this.turnLightsOff();
    this.setState({
      inputReady: false,
      gameRunning: true
    }, ()=>{
      this.addToSequence(()=>{
        setTimeout(()=>{
          this.playSequence()
          },1500);
        })
    })
  }

  resetGame(){
    this.setState({
      inputReady: true,
      inputSequence: [],
      sequence: [],
      score: 0,
      spin: false
    }, ()=>{
      this.blinkLight([4]);
    })
  }

  startUpAnimation(loops, speed=200, frame = 0){
    clearInterval(this.intervalID)
    if(loops > 0){
      this.turnLightOn(frame, speed, false);
      setTimeout(()=>{
        frame++;
        if(frame > 3){
          frame = 0;
          loops--;
        }
        this.startUpAnimation(loops, speed, frame);
      }, speed)
    }else{
      this.blinkLight([0,1,2,3,4], 500);
      setTimeout(()=>{
        clearInterval(this.intervalID);
        setTimeout(()=>{
          this.startGame();
        }, 1000)
      }, 2000)
    }
    
  }

  blinkLight(lightArray, speed = 1000){
    if(this.intervalID) clearInterval(this.intervalID);

    this.intervalID = setInterval(()=>{
      lightArray.forEach(light => {
        this.turnLightOn(light, speed/2, false);
      });  
    }, speed);

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
            }, 500);
           
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
        }, 500);
       
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


turnLightOn(index, duration = 200, playsound = true){
  const lights = Array.from(this.state.lights);
  if(playsound)
    this.playSound(lights[index].sound);
  lights[index].status = true;
  this.setState({
    lights,
  });

  if(duration > 0){
    setTimeout(()=>{
      this.turnLightOff(index);
    }, duration);
  }
  
}

turnLightOff(index){
  const lights = Array.from(this.state.lights);
  lights[index].status = false;
  this.setState({
    lights,
  });
}

turnLightsOff(){
  for (let i = 0; i < this.state.lights.length; i++) {
    this.turnLightOff(i)
  }
}

turnLightsOn(){
  for (let i = 0; i < this.state.lights.length; i++) {
    this.turnLightOn(i)
  }
}

turnRandomLightOn(){
  const index = Math.floor(Math.random() * this.state.lights.length);
  this.turnLightOn(index);
}
  render(){
    const {lights, arms, score, highScore} = this.state;
    return (
      <>
      <div className="col-12 col-lg-2">
            <DisplayBoard title="Score"score={score}/>
          </div>
          <div className="col-12 col-lg-6">
          <div className={`simon ${this.state.spin ? 'spin': ''}`} id='simon'>
          <SimonCenter position='center'color='white' lightOn={lights[4].status} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='topLeft' color='green' lightOn={lights[0].status} open={arms[0].status} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='topRight' color='red' lightOn={lights[1].status} open={arms[1].status} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='btmRight' color='blue' lightOn={lights[2].status} open={arms[2].status} clickHandle = {this.handleButtonPress}/>
          <SimonPart position='btmLeft' color='yellow' lightOn={lights[3].status} open={arms[3].status} clickHandle = {this.handleButtonPress}/>
      </div>
          </div>
          <div className="col-12 col-lg-2">
            <DisplayBoard title="High Score" score={highScore}/>
          </div>
          </>
      
    )
  }
}

export default Simon;
