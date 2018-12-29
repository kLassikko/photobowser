import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Gallery from './Gallery';
import Photo from './Photo';
import './App.css';
import banner from'./photobowserbanner.svg';

class App extends Component {

  state = {
    thumbnails: [],
    hasMore: true
  }

  updateState = (newState) => {
    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <Link to="/" className="Header"><img src={banner} alt="banner" /></Link>
          <Route path="/" exact render={()=><Gallery thumbnails={this.state.thumbnails} 
            hasMore={this.state.hasMore}
            updateState={this.updateState} />} />
          <Route path="/img/:id" component={Photo} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;