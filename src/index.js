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
      <div id="break-container"> <svg id="break-decrement" onClick={() => this.handleClick("break-decrement")} width="1.2em" height="1.2em"viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg> 
       <h4 id="break-length">{this.state.breaks}</h4>  
       <svg id="break-increment" onClick={() => this.handleClick("break-increment")} width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
        </svg> </div>
    </div>
    
    <div id="session-label">
      <h3>Session Length</h3>
      <div id="break-container">
       <svg id="session-decrement" onClick={() => this.handleClick("session-decrement")} width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>
      <h4 id="session-length">{this.state.session}</h4>
      <svg id="session-increment" onClick={() => this.handleClick("session-increment")} width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
</svg> </div>
    </div>
    <div id="timer-container">
    <div id="timer">
      <h2 id="timer-label">{this.state.status}</h2>
      <div id="time-left">{this.state.minutes < 10 ? `0${ this.state.minutes }` : this.state.minutes}:{ this.state.seconds < 10 ? `0${ this.state.seconds }` : this.state.seconds }</div>
      
    </div>
    
    <div id="control-container">
      <div id="start_stop" class="myButton" onClick= {() => this.handleClick("start_stop")}><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pause" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/></svg><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-slash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/>
</svg><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
</svg></div>
      <div id="reset" class="myButton" onClick= {() => this.handleClick("reset")}><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
<path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
</svg></div>
    </div>
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