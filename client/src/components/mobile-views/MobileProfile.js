import React from 'react';
import FeedComponent from '../Feed';
import FollowBlock from '../FollowBlock';
import EditProfile from '../EditProfile';
import NewPost from '../NewPost';

/* 
Should contain profile info
if logged in user -> log out & edit button
else -> follow/unfollow button

>> On edit // switch dropdown and grid option with submit/cancel. Cancel is link button back to same profile
*/

export function MobileProfile(props){

  const displayActiveComponent = () => {
    switch(props.activeComponent){
      case 'photo':
        return <FeedComponent 
        profile={props.profile}
        activeUser={props.activeUser} profileFeedDisplay={true} profileDisplayType={'image'}/>;

      case 'text':
        return <FeedComponent 
        profile={props.profile}
        activeUser={props.activeUser} profileFeedDisplay={true} profileDisplayType={'text'} />;

      case 'edit':
        return (
          <div className="px-3">
            <EditProfile
            editEmail={props.editEmail}
            editUsername={props.editUsername}
            editFirstname={props.editFirstname}
            editLastname={props.editLastname}
            editPassword={props.editPassword}
            editRePassword={props.editRePassword}
            editDescription={props.editDescription}
            showErrors={props.showErrors}
            isEditError={props.isEditError}  
            newProfileImgStyle={props.newProfileImgStyle}
            previewProfileImage={props.previewProfileImage}
            handleProfileChange={props.handleProfileChange}
            handleProfileUpdate={props.handleProfileUpdate}
            />
          </div>
        );

      case 'followers':
        return (
          <div className="px-3">
            <FollowBlock followDisplay={props.activeComponent} profile={props.profile} />
          </div>
        );

      case 'following':
        return (
          <div className="px-3">
            <FollowBlock followDisplay={props.activeComponent} profile={props.profile} />
          </div>
        );

      case 'new':
        return (
          <div className="px-5">
            <NewPost 
            activeUser={props.activeUser}
            newPostType={props.newPostType}
            newPostImage={props.newPostImage}
            newPostImgStyle={props.newPostImgStyle}
            newPostDescription={props.newPostDescription}
            previewPostImage={props.previewPostImage}
            handleNewPostChange={props.handleNewPostChange}
            handleNewPostSubmit={props.handleNewPostSubmit}
            isNewPostSubmitted={props.isNewPostSubmitted}
            />
          </div>
        );
      case 'all':
        return <FeedComponent 
        profile={props.profile}
        activeUser={props.activeUser} profileFeedDisplay={true} />;
      default:
        return <FeedComponent 
        profile={props.profile}
        activeUser={props.activeUser} profileFeedDisplay={true} />;
    }
  } 

  return (
    <div className="h-100 w-100 pt-3">

      {props.isLoaded ? 
      <div className="h-100 mobile-profileContainer">
        <div className="px-3 my-3 mobile-profileHeader">
          <div className="row d-flex justify-content-between mobile-profileInformation">
            <div className="w-50 pl-3">
              <div style={props.mobileProfileCircle} />
            </div>

            { props.activeUser._id === props.profile._id ?
              (
              <div className="w-50 d-flex flex-column">
                <div className="mx-auto m-2">
                  <button type="button" className="btn btn-outline-light text-dark font-weight-bold" onClick={()=>props.handleActiveComponent('edit')}>Edit Profile</button>
                </div>
                <div className="mx-auto mb-2">
                  <button type="button" className="btn btn-danger font-weight-bold" onClick={props.logout}>Log Out</button>
                </div>
              </div>
              ) 
              : 
              (
              <div className="w-50 pr-3 d-flex flex-wrap align-content-center">
                <div className="mx-auto mb-1">
                  <button type="button" className={props.isFollowing ? "btn btn-outline-primary font-weight-bold" : "btn btn-primary font-weight-bold"} onClick={()=>{
                    props.isFollowing === true ? props.handleUnFollow() : props.handleFollow()
                  }
                  }>
                    {props.isFollowing === true ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </div>
              )
            }
            <div className="pl-3">
              <h1>{props.profile.username}</h1>
              <h4 className="text-capitalize">{props.profile.firstname + ' ' + props.profile.lastname}</h4>
              <p>{props.profile.description}</p>
            </div>
          </div>
          <div className="row px-5 py-2 mobile-profileFollowRow">
            <div className="w-100 mx-auto d-flex justify-content-between mobile-profileFollows">
              <span onClick={()=>props.handleActiveComponent('followers')}>{props.profile.followers ? props.profile.followers.followers.length : '0'} Followers</span>
              <span onClick={()=>props.handleActiveComponent('following')}>{props.profile.followings ? props.profile.followings.followings.length : '0'} Following</span>
            </div>
          </div>
          <div className="row mobile-profileFeedControlRow">
            <div className="col-12 d-flex justify-content-around">
              <button type="button" className={"btn btn-outline-light text-dark desktop-profileFeedSwitch"} onClick={()=>props.handleActiveComponent('all')}><b>All</b></button>
              <button type="button" className={"btn btn-outline-light text-dark desktop-profileFeedSwitch"} onClick={()=>props.handleActiveComponent('text')}><b>Text</b></button>
              <button type="button" className={"btn btn-outline-light text-dark desktop-profileFeedSwitch"} onClick={()=>props.handleActiveComponent('photo')}><b>Photo</b></button>
              { props.activeUser._id === props.profile._id ?
              <button type="button" className={"btn btn-outline-primary desktop-profileFeedSwitch"} onClick={()=>props.handleActiveComponent('new')}><b>+ New</b></button>
              : null }
          </div>
          </div>
        </div>
        <div className="w-100 mobile-displayComponentScroll">
          {displayActiveComponent()}
        </div>
      </div>
      :
      null
      }
    </div>
  )
}
