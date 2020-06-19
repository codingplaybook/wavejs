import React, { Component } from 'react';

import Like from '../../assets/like.png';
import CommentIcon from '../../assets/comment.png';
import Share from '../../assets/share.png';

export class MobileProfileFeed extends Component {
  static displayName = MobileProfileFeed.name;

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
    const PostList = this.state.posts.map(post => (
        <div key={post.id} className="w-100 mh-50 mb-5">
          <div className="mobile-postHeader px-4 py-1 d-flex justify-content-between">
            <div><h4>{post.albumId}</h4></div>
            <div><h4>3h</h4></div>
          </div>  
          <div className="mobile-postPhoto"><img src={post.url} alt={post.title} /></div>
          <div className="px-4 py-2 mobile-postResponseImg">
            <div className="w-100">
              <span>
                <img src={Like} alt="Like"/>25
              </span>
              <span>
                <img src={CommentIcon} alt="Like"/>6
              </span>
              <span>
                <img src={Share} alt="Share"/>
              </span>
            </div>
            <div className="w-100">{post.title}</div>
          </div>
        </div>
      )
    );

    return (
      <div className="h-100">
        {PostList}
      </div>
    );
  }
}
