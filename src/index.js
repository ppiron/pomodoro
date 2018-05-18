import React, { Component } from 'react';
import { render } from 'react-dom';

function secondsToMinutes (secs) {
  const mins = Math.floor(secs / 60);
  const seconds = secs % 60;
  return ((mins < 10 ? '0' : '') + parseInt(mins, 10) + ':' + 
          (seconds < 10 ? '0' : '') + parseInt(seconds, 10))
}

let timerID;

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionLength: 60 * 25,
      breakLength: 60 * 5,
      timerLabel: true,
      timeLeft: 60 * 25,
      startStop: true,
      initial: true,
      audioOn: false,
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);

  }

  handleReset(event) {
    if (timerID) {
      clearInterval(timerID);
    }
    this.setState (
      {
        sessionLength: 60 * 25,
        breakLength: 60 * 5,
        timerLabel: true,
        timeLeft: 60 * 25,
        startStop: true,
        initial: true,
        audioOn: false,
      }
    )
  }

  handleStartStop(event) {
    const that = this;
    function countdown() {
      if (this.state.timeLeft > 0) {
        this.setState(function(state, props) {
          return (
            {
              timeLeft: state.timeLeft - 60,
              audioOn: false,
            }
          )
        })
      } else {
        clearInterval(timerID);
        this.setState( 
          {
            timerLabel: !this.state.timerLabel,
            timeLeft: this.state.timerLabel ? this.state.breakLength : this.state.sessionLength,
            audioOn: true,
          }
        );
        timerID = setInterval(countdown.bind(that), 1000);
      }
    }
    if (this.state.startStop) {
      this.setState( 
        {
          startStop: false,
          timeLeft: this.state.initial ? this.state.sessionLength : this.state.timeLeft,
          initial: this.state.initial? false : this.state.initial,
        } 
      );
      if (timerID) {
        clearInterval(timerID);
        timerID = setInterval(countdown.bind(that), 1000);
      } else {
        timerID = setInterval(countdown.bind(that), 1000);
      }
    } else {
      clearInterval(timerID);
      this.setState( {startStop: true} );
    }
  }

  handleIncrementBreak(event) {
    this.setState (function(state, props) {
      return (
        {breakLength: state.breakLength + 60 > 3600 ? 3600 : state.breakLength + 60}
      )
    })
  }

  handleIncrementSession(event) {
    this.setState (function(state, props) {
      return (
        {sessionLength: state.sessionLength + 60 > 3600 ? 3600 : state.sessionLength + 60}
      )
    })
  }

  handleDecrementBreak(event) {
    this.setState (function(state, props) {
      return (
        {breakLength: state.breakLength - 60 < 0 ? 0 : state.breakLength - 60}
      )
    })
  }

  handleDecrementSession(event) {
    this.setState (function(state, props) {
      return (
        {sessionLength: state.sessionLength - 60 < 0 ? 0 : state.sessionLength - 60}
      )
    })
  }

  render() {
    const audio = 
    <audio id="beep" src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" autoPlay={true}>
    </audio>
    return (
      <div>
        <p>
          Start editing to see some magic happen :)
        </p>
        <div id="pomodoro">
          <div id="break-label">Break <br /> Length</div>
          <div id="session-label">
            Session <br />
            Length
          </div>
          <div id="break-length">{secondsToMinutes(this.state.breakLength)}</div>
          <div id="session-length">{secondsToMinutes(this.state.sessionLength)}</div>
          <div id="adjust-break">
            <div id="break-decrement" className="adjust-button" 
            onClick={this.handleDecrementBreak}>-</div>
            <div id="break-increment" className="adjust-button"
            onClick={this.handleIncrementBreak}>+</div>
          </div>
          <div id="adjust-session">
            <div id="session-decrement" className="adjust-button"
            onClick={this.handleDecrementSession}>-</div>
            <div id="session-increment" className="adjust-button"
            onClick={this.handleIncrementSession}>+</div>
          </div>
          <div id="timer-label">{this.state.timerLabel && `Session` || 
                                !this.state.timerLabel && `Break`}</div>
          <div id="time-left">{secondsToMinutes(this.state.timeLeft)}</div>
          <div id="start-stop" onClick={this.handleStartStop}>{this.state.startStop ? "Start" : "Stop"}</div>
          <div id="reset" onClick={this.handleReset}>Reset</div>
          {this.state.audioOn && audio}
        </div>        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));