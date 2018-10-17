import React, { Component } from 'react';

import Recipes from './containers/Recipes/Recipes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Recipes />
      </div>
    );
  }
}

export default App;
