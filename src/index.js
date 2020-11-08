import React from 'react';
import reactDOM from 'react-dom';
import './styles/style.css'



class Clock extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    breaks: 5,
    session: 25,
    seconds: 0,
    isToggleOn: false,
    minutes: 25
  };
  this.handleClick = this.handleClick.bind(this);
};

  componentDidMount() {this.myInterval = setInterval(() => {
    const { breaks, seconds, minutes, isToggleOn } = this.state
  if (this.state.isToggleOn == true) {
    
    if (seconds == 0 && minutes == 0) {
       this.audioBeep.play()
  
      this.setState(({ isToggleOn, minutes, breaks}) => ({
      minutes: breaks
    }))}
    else if (seconds == 0){this.setState(({ seconds, minutes }) => ({
    seconds: 59,
    minutes: minutes - 1
  }))} else {this.setState (({seconds}) => ({
      seconds: seconds - 1
    }))}
  
  }
}, 1000)}


handleClick(id) {
  switch(id) {
    case "reset":
      this.setState({
        breaks: 0,
        session: 0,
        minutes: 0,
        seconds: 0,
         isToggleOn: false
      });
      this.setState({
        breaks: 5,
        session: 25,
        minutes: 25,
        seconds: 0,
         isToggleOn: false
      });
      break;
    case "break-decrement":
       if (this.state.isToggleOn == true) {} else if (this.state.breaks == 1) {} else {this.setState({
        breaks: this.state.breaks - 1
      })};
      break;
      case "break-increment":
       if (this.state.isToggleOn == true) {} else if (this.state.breaks == 60) {} else {this.setState({
        breaks: this.state.breaks + 1
      })};
      break;
      case "session-decrement":
       if (this.state.isToggleOn == true) {} else if (this.state.session == 1) {} else {this.setState({
        session: this.state.session - 1,
         minutes: this.state.minutes - 1
      })};
      break;
      case "session-increment":
       if (this.state.isToggleOn == true) {} else if (this.state.session == 60) {} else {this.setState({
        session: this.state.session + 1,
         minutes: this.state.minutes + 1
      })};
      break;
    case "start_stop":
     this.setState(state => ({
    isToggleOn: !state.isToggleOn
  }));
      break;
  }
}
render() {
  return (
  <div id="clock">
      <h2>Clocky</h2>
      <div id="break-label">
        <h3>Break Length</h3>
        <button id="break-decrement" onClick={() => this.handleClick("break-decrement")}>down</button>
        <h4 id="break-length">{this.state.breaks}</h4>
        <button id="break-increment" onClick={() => this.handleClick("break-increment")}>up</button>
      </div>
      
      <div id="session-label">
        <h3>Session Length</h3>
        <button id="session-decrement" onClick={() => this.handleClick("session-decrement")}>down</button>
        <h4 id="session-length">{this.state.session}</h4>
        <button id="session-increment" onClick={() => this.handleClick("session-increment")}>up</button>
      </div>
      
      <div>
        <h2 id="timer-label">Session</h2>
        <div id="time-left">{this.state.minutes}:{ this.state.seconds < 10 ? `0${ this.state.seconds }` : this.state.seconds }</div>
        
      </div>
      
      <div id="control-container">
        <button id="start_stop"onClick= {() => this.handleClick("start_stop")}>s</ button>
        <button id="reset" onClick= {() => this.handleClick("reset")}>r</button>
      </div>
      <audio
        id="beep"
        preload="auto"
        ref={(audio) => {
          this.audioBeep = audio;
        }}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
  </div>
)}
}
ReactDOM.render(<Clock />, document.getElementById('root'))