import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import Client from "./Client";
import './App.css';

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
        <Link to="/" className="Header"><h1>Photo Bowser</h1></Link>
        <Route path="/" exact render={()=><Gallery thumbnails={this.state.thumbnails} 
          hasMore={this.state.hasMore}
          updateState={this.updateState} />} />
        <Route path="/img/:id" component={Pic} />
        </div>
        </Router>
      </div>
    );
  }
}

class Pic extends Component {
  render() {
    return (
      <p> full size photo view here </p>
    );
  }
}

class Thumbnail extends Component {
  render() {
    return (
      <Link to={{pathname: `/img/${this.props.id}`}}><img src={this.props.thumbnailUrl} alt={this.props.title} 
      className="Thumbnail" /></Link>
    );
  }
}

class Gallery extends Component {

  getPhotos = (page) => {
    Client.get('photos?_page=' + page, photos => {
      let more = false
      let images = []
      images.push(this.props.thumbnails)
      if(photos.length > 0) {
        more = true;
        for(let i of photos) {
          images.push(<Thumbnail url={i.url} thumbnailUrl={i.thumbnailUrl} title={i.title} id={i.id} key={i.id} />)
        }
      }
      this.props.updateState({thumbnails: images, hasMore: more})
    });
  }

  render() {
      return (
        <div className="Gallery">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.getPhotos}
            hasMore={this.props.hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            {this.props.thumbnails}
          </InfiniteScroll>
        </div>
      );
  }
}

export default App;