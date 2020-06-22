import React from 'react';
import NewPost from '../NewPost';
import FollowBlock from '../FollowBlock';
import EditProfile from '../EditProfile';
import FeedComponent from '../Feed';

export function DesktopProfile(props){

  const displayActiveComponent = () => {
    switch(props.activeComponent){
      case 'photo':
        return <FeedComponent profile={props.profile} profileFeedDisplay={true} username={props.profile.username} profileDisplayType={'image'}/>;

      case 'text':
        return <FeedComponent profile={props.profile} profileFeedDisplay={true} username={props.profile.username} profileDisplayType={'text'} />;

      case 'edit':
        return <EditProfile
        editEmail={props.editEmail}
        editUsername={props.editUsername}
        editFirstname={props.editFirstname}
        editLastname={props.editLastname}
        editDescription={props.editDescription} 
        newProfileImgStyle={props.newProfileImgStyle}
        previewProfileImage={props.previewProfileImage}
        handleProfileChange={props.handleProfileChange}
        handleProfileUpdate={props.handleProfileUpdate}
        />;

      case 'followers':
        return <FollowBlock followDisplay={props.activeComponent} profile={props.profile} />;

      case 'following':
        return <FollowBlock followDisplay={props.activeComponent} profile={props.profile} />;

      case 'new':
        return <NewPost 
        activeUser={props.activeUser}
        newPostType={props.newPostType}
        newPostImage={props.newPostImage}
        newPreviewPostImage={props.newPreviewPostImage}
        newPostImgStyle={props.newPostImgStyle}
        newPostDescription={props.newPostDescription}
        previewPostImage={props.previewPostImage}
        handleNewPostChange={props.handleNewPostChange}
        handleNewPostSubmit={props.handleNewPostSubmit}
        isNewPostSubmitted={props.isNewPostSubmitted}
        newPostLink={props.newPostLink}
        />;

      case 'all':
        return <FeedComponent 
        profile={props.profile}
        activeUser={props.activeUser} profileFeedDisplay={true} />; 

      default:
        return <FeedComponent profile={props.profile} profileFeedDisplay={true} />;
    }
  }  
  console.log('isFollowing: ' + props.isFollowing);

  return (
    <div className="row h-100 py-4 desktop-profileContainer">
      <div className="col-4 h-100">
        <div className="h-100 px-5 desktop-profileHeader">
          <div style={props.profileImgStyle}/>
            <h4>{props.profile.username}</h4>
            <h6 className="text-capitalize">{props.profile.firstname + ' ' + props.profile.lastname}</h6>
            <p>{props.profile.description}</p>
            <div className="d-flex flex-wrap align-content-center">
              { props.activeUser._id === props.profile._id ? null : 
              <div className="mx-auto mb-1">
                <button type="button" className={props.isFollowing ? "btn btn-outline-primary font-weight-bold" : "btn btn-primary font-weight-bold"} onClick={()=>{
                  props.isFollowing === true ? props.handleUnFollow() : props.handleFollow()
                }
                }>
                  {props.isFollowing === true ? "Unfollow" : "Follow"}
                </button>
              </div>
              }
              {/* Hide until messaging works
              <div className="mx-auto">
                <button type="button" className="btn btn-secondary">Message</button>
              </div>
              */}
            </div>
          <ul className="desktop-profileLinks">
            <li>
              <span onClick={()=>props.handleActiveComponent('followers')}>Followers&nbsp;{props.profile.followers.followers ? props.profile.followers.followers.length : '0'}</span>
              &nbsp;|&nbsp; 
              <span onClick={()=>props.handleActiveComponent('following')}>Following&nbsp;{props.profile.followings.followings ? props.profile.followings.followings.length : '0'}</span>
            </li>
            { props.activeUser._id === props.profile._id ? 
            <li onClick={()=>props.handleActiveComponent('edit')}>
              <button type="button" className="btn btn-outline-light text-dark font-weight-bold">Edit Profile</button>
            </li>
            : null }
            { props.activeUser._id === props.profile._id ? 
            <li>
              <div className="mx-auto mt-2">
              <button type="button" className="btn btn-danger btn-sm" onClick={props.logout}>Log Out</button>
              </div>
            </li>
            : null }
          </ul>
        </div>
      </div>
      <div className="col-8 h-100 pb-3 container">
        <div className="w-100 mb-2 desktop-profileFeedControlRow">
          <button type="button" className={"btn btn-outline-light text-dark desktop-profileFeedSwitch"} onClick={()=>props.handleActiveComponent('all')}>All </button>
          <button type="button" className={"btn btn-outline-light text-dark desktop-profileFeedSwitch"} onClick={()=>props.handleActiveComponent('photo')}>Photos Only</button>
          <button type="button" className={"btn btn-outline-light text-dark desktop-profileFeedSwitch"} onClick={()=>props.handleActiveComponent('text')}>Text Only</button>
          { props.activeUser._id === props.profile._id ? 
          <button type="button" className={"btn btn-outline-light text-dark desktop-profileFeedSwitch"} onClick={()=>props.handleActiveComponent('new')}>+ New Post</button>
          : null }
        </div>
        <div className="desktop-profileContainerFeed py-2 px-5">
            {props.isLoaded ? displayActiveComponent() : null}
        </div>
      </div>
    </div>
  );
}