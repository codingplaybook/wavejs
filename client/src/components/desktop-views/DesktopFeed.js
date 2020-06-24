import React from 'react';

import DesktopPost from './DesktopPost';
import SideNavInfo from '../SideNavInfo';

export function DesktopFeed(props){

  const PostList = props.posts.map(post => {
    if(props.profileDisplayType === 'text'){
      return post.type === 'text' ? 
      <DesktopPost className="w-100 p-4 showme"
      activeUser={props.activeUser} 
      handleLike={props.handleLike}
      handleDislike={props.handleDislike}
      key={post._id}
      post={post}
      getCreatedDate={props.getCreatedDate}
      profileFeedDisplay={props.profileFeedDisplay}
      profileDisplayType={props.profileDisplayType}
      /> : null
    }
    else if(props.profileDisplayType === 'image'){
      return post.type === 'image' ? 
      <DesktopPost
      activeUser={props.activeUser} 
      handleLike={props.handleLike}
      handleDislike={props.handleDislike}
      key={post._id}
      post={post}
      getCreatedDate={props.getCreatedDate}
      profileFeedDisplay={props.profileFeedDisplay}
      profileDisplayType={props.profileDisplayType}
      /> : null
    }
    else { 
      return <DesktopPost
      activeUser={props.activeUser} 
      handleLike={props.handleLike}
      handleDislike={props.handleDislike}
      key={post._id}
      post={post}
      getCreatedDate={props.getCreatedDate}
      profileFeedDisplay={props.profileFeedDisplay}
      profileDisplayType={props.profileDisplayType}
      />
      }
    }
  ); 

  return props.profileFeedDisplay ? (
    <div className="container-fluid h-100 py-3 px-4">
      <div className="row h-100">{PostList}</div>
    </div>
    ) : (
    <div className="container-fluid h-100 py-3 px-4">
      <div className="row h-100">
        <div className="col-md-7 col-12 h-100 px-2 pt-3 desktop-postContent">
            {PostList}
        </div>
          <SideNavInfo />
      </div>
    </div>
  );
}