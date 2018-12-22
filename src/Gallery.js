import React, { Component } from 'react';
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import Client from "./Client";

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
      let more = false;
      let images = [];
      images.push(this.props.thumbnails);
      if(photos.length > 0) {
        more = true;
        for(let i of photos) {
          images.push(<Thumbnail url={i.url} thumbnailUrl={i.thumbnailUrl} title={i.title} id={i.id} key={i.id} />);
        }
      }
      this.props.updateState({thumbnails: images, hasMore: more});
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

export default Gallery;