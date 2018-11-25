import React, { Component } from 'react';
import './App.css';
import { ChartComponent } from './components/ChartComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChartComponent/>
      </div>
    );
  }
}

export default App;
