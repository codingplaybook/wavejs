import React, { useState } from 'react';

import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

import { Link } from 'react-router-dom';

import Liked from '../../assets/liked.png';
import Like from '../../assets/noLike.png';
import Comment from '../../assets/comment.png';
import Share from '../../assets/share.png';
import SamplePic from '../../assets/sample-profile-pic.jpg';

export default function MobilePost(props){

  const commentsLine = props.post.comments.comments.map(comment => (
    <div key={comment._id} className="w-100 p-2 mobile-SocialContainer row">
      <div className="col-6">
        <Link className="postLink" to={`/profile/${comment.userId.username}`}><b>{comment.userId.username}</b>
        </Link>
      </div>
      <div className="col-6">{props.getCreatedDate(comment.time)}</div>
      <div className="col-12">{comment.description}</div>
    </div>
  )
);

  const showComments = (
    <div className="w-100">
      <div className="w-100 p-2 d-flex justify-content-center">
        <div className="col-8">
          <input 
          type="text" 
          className="form-control" 
          placeholder="Enter comment" 
          id="comment-description"
          value={props.newComment}
          name="newComment"
          onChange={props.handleChange}
          />
        </div>
        <div className="col-2 pl-0 d-flex flex-wrap align-content-center">
          <button className="btn btn-outline-light text-dark font-weight-bold" onClick={()=>props.addComment()}>{'>'}</button>
        </div>
      </div>
      {commentsLine}
    </div>
  );

  const showLikes = props.post.likes ? 
  props.post.likes.likes.map(like => (
      <div key={like._id} className="w-100 p-2 mobile-SocialContainer row">
        <div className="col-6">
          <Link className="postLink" to={`/profile/${like.userId.username}`}><b>{like.userId.username}</b>
          </Link>
        </div>
        <div className="col-6">{props.getCreatedDate(like.time)}</div>
      </div>
    )
  ) : <span>No likes for this post</span>;

  const backgroundImageUrl = props.post.userId.image;

  const postImageUrl = props.post.image;

  const mobileFeedProfileImgStyle = {
    backgroundImage: (props.post.userId.image ? `url('${backgroundImageUrl}')` : `url('https://res.cloudinary.com/dzaepha4e/image/upload/v1592794284/sample-profile-pic_jxtcf8.jpg')`),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '25px',
    minHeight: '25px',
    borderRadius: '50%'
  }

  const mobileFeedPostImgStyle = {
    minHeight:'300px',
    backgroundImage:(props.post.image ? `url('${postImageUrl}')` : `url('https://res.cloudinary.com/dzaepha4e/image/upload/v1592794284/sample-profile-pic_jxtcf8.jpg')`),
    backgroundSize:'cover',
    backgroundPosition:'center'
  }

  return (
    <div className="w-100 mh-50 mb-5">
          <div className="mobile-postHeader px-4 py-1 d-flex justify-content-between">
            <Link className="postLink" to={`/profile/${props.post.userId.username}`}>
              <div style={mobileFeedProfileImgStyle} className="float-left mr-2"/>
              <span><b>{props.post.userId.username}</b></span>
            </Link>
            <div className="desktop-postDateTime"><p><b>{props.getCreatedDate(props.post.createdDate)}</b></p></div>
          </div>
          <Link className="postLink" to={`/post/${props.post.link}`}> 
            {props.post.type === "image" ? 
              <div style={mobileFeedPostImgStyle}>
              </div> 
            : <div className="mobile-postText border d-flex flex-wrap align-content-center justify-content-center">
                <h5>{props.post.description}</h5> 
              </div>
            }
          </Link> 
          <div className="p-2 mobile-postResponseImg">
            <div className="w-100 row p-0 m-0 d-flex flex-wrap align-items-center justify-content-between">
              <span>
                <img onClick={()=>(props.isPostLiked ? props.removeLike() : props.addLike())} src={props.isPostLiked ? Liked : Like} style={{transition:'0.5s'}} alt="Like-Icon" />
                <span onClick={()=>props.toggleComments(false)}>{props.post.likes ? props.post.likes.likes.length : 0}&nbsp;likes</span>
              </span>
              <span onClick={()=>props.toggleComments(true)}>
                <img src={Comment} alt="Comment-Icon" />
                {props.post.comments ? props.post.comments.comments.length : 0}&nbsp;comments
              </span>
              <span>
                <div className="d-flex justify-content-center" id={`PopoverFocus${props.post._id}`}>
                <Button className="btn btn-outline-light d-flex flex-wrap align-items-start justify-content-center shareIcon" id={`PopoverFocus${props.post._id}`} type="button"><img src={Share} alt="Share-Icon" /></Button>
                  <UncontrolledPopover trigger="focus" placement="bottom" target={`PopoverFocus${props.post._id}`}>
                    <PopoverHeader>Share Post Link:</PopoverHeader>
                    <PopoverBody>{`${window.location.protocol}//${window.location.hostname}${window.location.port}/${props.post.link}`}</PopoverBody>
                  </UncontrolledPopover>
                </div>
              </span>
            </div>
            {props.post.type === "image" ?<div className="w-100">{props.post.description}</div> : null}
            <div className="mt-2">
            {props.isShowingComments === true ? 
            showComments
            : showLikes}
            </div>
          </div>
        </div>
  )
}