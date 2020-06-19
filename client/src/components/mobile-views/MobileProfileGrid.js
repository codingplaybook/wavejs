import React, { Component } from 'react';

import Like from '../../assets/like.png';
import CommentIcon from '../../assets/comment.png';
import Share from '../../assets/share.png';

export class MobileProfileGrid extends Component {
  static displayName = MobileProfileGrid.name;

  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      posts: []
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            posts: result.slice(0,40)
          });
          console.log(result.length)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }

  render () {
    const PostGrid = this.state.posts.map(post => (
        <div key={post.id} className="col-4 p-1 mobile-profileGridBlock">
          <div className="mobile-feedPhoto"><img src={post.url} alt={post.title} /></div>
        </div>
      )
    );

    return (
      <div className="h-100">
        <div className="row px-3">
          {PostGrid}
        </div>
      </div>
    );
  }
}
