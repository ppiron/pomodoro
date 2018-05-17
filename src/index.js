import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionLength: "25:00",
      breakLength: "5:00",
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
          <div id="break-length">{state.breakLength}</div>
          <div id="session-length">{state.sessionLength}</div>
        </div>
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));