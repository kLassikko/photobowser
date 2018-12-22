import React, { Component } from 'react';
import Client from "./Client";

class Photo extends Component {

  state = {
    data: {}
  }

  getPhoto = (id) => {
    Client.get(`photos/${id}`, data => {
      this.setState({
        data: data
      });
    });
  }

  componentDidMount() {
    this.getPhoto(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <img src={this.state.data.url} alt={this.state.data.title}
          className="Photo" />
        <p> {this.state.data.title} </p>
      </div>
    );
  }
}

export default Photo;