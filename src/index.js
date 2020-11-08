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
  minutes: 25,
  status: "Session"
};
this.handleClick = this.handleClick.bind(this);
};

componentDidMount() {this.myInterval = setInterval(() => {
  const { session, breaks, seconds, minutes, isToggleOn, status } = this.state
if (this.state.isToggleOn == true) {
  
  if (seconds == 0 && minutes == 0) {
      
      if (status == "Session") { 
        this.setState(({ isToggleOn, minutes, breaks, status}) => ({
        minutes: breaks,
        status: "Break"}))
      } 
    else if (status == "Break") {
        this.setState(({ session, isToggleOn, minutes, breaks, status}) => ({
        minutes: session,
        status: "Session"}))
      }
  }
  else if (seconds == 0) {
    this.setState(({ seconds, minutes }) => ({
    seconds: 59,
    minutes: minutes - 1}))
  } else if (seconds == 1 && minutes == 0) {this.setState (({seconds}) => ({
    seconds: seconds - 1
  }))
  this.audioBeep.play();
  } else {this.setState (({seconds}) => ({
    seconds: seconds - 1
  }))}

}
}, 1000)}


handleClick(id) {
switch(id) {
  case "reset":
    this.setState({
      breaks: 5,
      session: 25,
      minutes: 25,
      seconds: 0,
       isToggleOn: false,
      status: "Session"
    });
    this.audioBeep.pause();
this.audioBeep.currentTime = 0;
    break;
  case "break-decrement":
     if (this.state.isToggleOn == true) {} else if (this.state.breaks == 1) {} else {this.setState({
      breaks: this.state.breaks - 1,
      seconds: 0,
      session: this.state.session,
      minutes: this.state.session
    })};
    break;
    case "break-increment":
     if (this.state.isToggleOn == true) {} else if (this.state.breaks == 60) {} else {this.setState({
      breaks: this.state.breaks + 1,
      seconds: 0,
      session: this.state.session,
      minutes: this.state.session
    })};
    break;
    case "session-decrement":
     if (this.state.isToggleOn == true) {} else if (this.state.session == 1) {} else {this.setState({
      session: this.state.session - 1,
      minutes: this.state.session - 1,
      seconds: 0
    })};
    break;
    case "session-increment":
     if (this.state.isToggleOn == true) {} else if (this.state.session == 60) {} else {this.setState({
      session: this.state.session + 1,
       minutes: this.state.session + 1,
      seconds: 0
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
    <h2>Pomodoro Clock</h2>
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
      <h2 id="timer-label">{this.state.status}</h2>
      <div id="time-left">{this.state.minutes < 10 ? `0${ this.state.minutes }` : this.state.minutes}:{ this.state.seconds < 10 ? `0${ this.state.seconds }` : this.state.seconds }</div>
      
    </div>
    
    <div id="control-container">
      <button id="start_stop"onClick= {() => this.handleClick("start_stop")}>s</button>
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