import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="border-info offset-md-4 col-sm-4 mt-5">
        <h1 className="text-center">
          Welcome to <b>Twittar</b>!
        </h1>
        <br/>
          <br/>
        <p>
          Here you can share your thoughts in posts, see what other people share,
          comment 'em, add photos and follow other users!
        </p>
        <p>
          From breaking news and entertainment to sports and politics,
          get the full story with all the live commentary (like with the real-life <a href="https://twitter.com/" target='__blank'>Twitter</a>!)
        </p>
        <br/>
      </div>
    );
  }
}
