import React, { Component } from 'react';
import MobilePost from './MobilePost';

import Like from '../../assets/like.png';
import CommentIcon from '../../assets/comment.png';
import Share from '../../assets/share.png';

export function MobileFeed(props){

  const PostList = props.posts.map(post => {
    if(props.profileDisplayType === 'text'){
      return post.type === 'text' ? 
      <MobilePost
      activeUser={props.activeUser} 
      handleLike={props.handleLike}
      handleDislike={props.handleDislike}
      key={post._id}
      post={post}
      getCreatedDate={props.getCreatedDate}
      /> : null
    }
    else if(props.profileDisplayType === 'image'){
      return post.type === 'image' ? 
      <MobilePost
      activeUser={props.activeUser} 
      handleLike={props.handleLike}
      handleDislike={props.handleDislike}
      key={post._id}
      post={post}
      getCreatedDate={props.getCreatedDate}
      /> : null
    }
    else { 
      return <MobilePost
      activeUser={props.activeUser} 
      handleLike={props.handleLike}
      handleDislike={props.handleDislike}
      key={post._id}
      post={post}
      getCreatedDate={props.getCreatedDate}
      />
      }
    }
  );

  return (
    <div className="h-100 pt-4">
      {PostList}
    </div>
  );
}
