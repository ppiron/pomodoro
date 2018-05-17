import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionLength: "25:00",
      breakLength: "5:00",
      timerLabel: "Session",
      timeLeft: "25:00",
      startStop: true,
    };

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(event) {
    
  }

  render() {
    
    return (
      <div>
        <p>
          Start editing to see some magic happen :)
        </p>
        <div id="pomodoro">
          <div id="break-label">Break Length</div>
          <div id="session-label">Session Length</div>
          <div id="break-length">{this.state.breakLength}</div>
          <div id="session-length">{this.state.sessionLength}</div>
          <div id="break-decrement">-</div>
          <div id="session-decrement">-</div>
          <div id="break-increment">+</div>
          <div id="session-increment">+</div>
          <div id="timer-label">{this.state.timerLabel}</div>
          <div id="time-left">{this.state.timeLeft}</div>
          <div id="start-stop">{this.state.startStop ? "Start" : "Stop"}</div>
          <div id="reset">Reset</div>
        </div>
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));