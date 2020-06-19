import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

import SampleProfile from '../../assets/sample-profile-pic.jpg';
import Liked from '../../assets/liked.png';
import Like from '../../assets/noLike.png';
import Comment from '../../assets/comment.png';
import Share from '../../assets/share.png';

export default function DesktopSinglePost(props){

  const backgroundImageUrl = props.activeUser.image;

  const postUserImageUrl = props.post.userId.image;

  const postImageUrl = props.post.image;

  const postProfilePic = {
    backgroundImage: (props.post.userId.image ? `url('/${postUserImageUrl.replace(/\\/g, "/")}')` : `url(${SampleProfile})`),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '50px',
    height: '50px',
    borderRadius:'50%'
  }

  const commentUserPic = {
    backgroundImage: (props.activeUser.image ? `url('/${backgroundImageUrl.replace(/\\/g, "/")}')` : `url(${SampleProfile})`),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '40px',
    height: '40px',
    borderRadius:'50%'
  }

  console.log(props.post.userId);

  const likeProfilePic = {
    backgroundImage: `url(${SampleProfile})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '40px',
    height: '40px',
    borderRadius:'50%'
  }

  const postPhoto = {
    backgroundImage:(props.post.image ? `url('/${postImageUrl.replace(/\\/g, "/")}')` : `url(${SampleProfile})`),
    backgroundColor: 'grey',
    borderRadius:'15px',
    backgroundSize:'cover',
    backgroundPosition:'center'
  }

  const commentsLine = props.post.comments.comments.map(comment =>
    { 
      const commentImageUrl = comment.userId.image ;
      const commentProfilePic = {
        backgroundImage: (comment.userId.image ? `url('/${commentImageUrl.replace(/\\/g, "/")}')` : `url(${comment.userId.image})`),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '30px',
        height: '30px',
        borderRadius:'50%'
      }
      return (
        <div key={comment._id} className="row py-2">
          <div className="col-2">
            <Link className="postLink" to={`/profile/${comment.userId.username}`}>
              <div style={commentProfilePic} />
            </Link>
          </div>
          <div className="col-7 font-weight-normal">
            <span>{comment.description}</span><br />
          </div>
          <div className="col-3 desktop-postDateTime">
            <span><b>{props.getCreatedDate(comment.time)}</b></span>
          </div>
        </div>
      )
    }
  );

  const noComments = (
    <p>No Comments</p>
  );

  const commentsBlock = props.post.comments ? commentsLine : noComments;

  const commentForm = (
    <div className="w-100 h-100 py-3">
      <div className="w-100 mx-auto row h-25">
        <div className="col-2 pr-0 h-100 desktop-postProfile d-flex flex-wrap align-items-center">
          <div style={commentUserPic} />
        </div>
        <div className="col-8 d-flex flex-wrap align-items-center">
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
      <div className="row h-75 w-100 desktop-commentScroll pb-1">
        <div className="col-10 mx-auto h-100 p-3">
          {commentsBlock}
        </div>
      </div>
    </div>
  );

  const likesBlock = props.post.likes.likes.map(like => {
    const likeImageUrl = like.userId.image ;
    const likeProfilePic = {
      backgroundImage: (like.userId.image ? `url('/${likeImageUrl.replace(/\\/g, "/")}')` : `url(${like.userId.image})`),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '30px',
      height: '30px',
      borderRadius:'50%'
    }
      return (
        <div key={like._id} className="row desktop-singPostLike-List d-flex flex-wrap align-items-center justify-content-center mx-auto mb-2">
        <div className="col-2">
          <Link className="postLink" to={`/profile/${like.userId.username}`}>
            <div style={likeProfilePic} />
          </Link>
        </div>
        <div className="col-5"><b><Link className="postLink" to={`/profile/${like.userId.username}`}>{like.userId.username}</Link></b>
        </div>
        <div className="col-4 desktop-postDateTime"><b>{props.getCreatedDate(like.time)}</b></div>
      </div>
      )
    }
  );

  const noLikes = (
    <p>No Likes</p>
  );

  const image = (
    <div className="col-md-7 d-flex flex-wrap align-content-center h-100">
      <div className="desktop-postPhotoSingle" style={postPhoto}/>
      <div className="w-100 p-2">
        <p className="text-center"><b>{props.post.description}</b></p>
      </div>
    </div>
  );

  const text = (
    <div className="col-md-7 d-flex flex-wrap align-content-center h-100">
      <div className="w-75 mx-auto">
      <h1 className="text-left mb-3">{props.post.description}</h1>
      <h5>{'@'}{props.post.userId.username}</h5>
      </div>  
    </div>
  );

  const descriptionBlock = (
    <div className="col-md-5 d-flex flex-wrap align-content-center h-100">
      <div className="desktop-postDescription row mx-auto">
        <div className="col-12 desktop-postDescriptionTop row pt-3 px-0">
        <div className="col-12 row w-100 d-flex flex-wrap align-items-center mx-auto pl-0">
          <div className="col-3 h-100 d-flex flex-wrap align-items-center desktop-postProfile">
            <Link className="postLink" to={`/profile/${props.post.userId.username}`}>
              <div style={postProfilePic} />
            </Link>
          </div>
          <div className="col-5">
            <Link className="postLink" to={`/profile/${props.post.userId.username}`}><b>{props.post.userId.username}</b></Link>
          </div>
          <div className="col-4 desktop-postDateTime"><b>{props.getCreatedDate(props.post.createdDate)}</b></div>
        </div>
          <div className="col-4 d-flex flex-wrap align-items-center desktop-singlePostLike" style={{cursor:'pointer'}}>
          <img className="mr-1" style={{transition:'0.5s'}} onClick={()=>(props.isPostLiked ? props.removeLike() : props.addLike())} src={props.isPostLiked ? Liked : Like} alt="Like-Icon" />
            <span onClick={()=>props.toggleComments(false)}>{props.post.likes ? props.post.likes.likes.length : 0}&nbsp;likes</span>
          </div>
          <div className="col-5 d-flex flex-wrap align-items-center desktop-singlePostComment" onClick={()=>props.toggleComments(true)} style={{cursor:'pointer'}}>
          <img src={Comment} alt="Comment-Icon" />
          <span>{props.post.comments ? props.post.comments.comments.length : 0}&nbsp;comments</span>
          </div>
          <div className="col-2 d-flex flex-wrap align-items-center desktop-singlePostShare"  id={`PopoverFocus${props.post._id}`}>
            <Button className="btn btn-outline-light d-flex flex-wrap align-items-start justify-content-center shareIcon" id={`PopoverFocus${props.post._id}`} type="button"><img src={Share} alt="Share-Icon" /></Button>
            <UncontrolledPopover trigger="focus" placement="bottom" target={`PopoverFocus${props.post._id}`}>
              <PopoverHeader>Share Post Link:</PopoverHeader>
              <PopoverBody>{`${window.location.protocol}//${window.location.hostname}${window.location.port}/${props.post.link}`}</PopoverBody>
            </UncontrolledPopover>
          </div>
        </div>
        <hr className="w-100 mx-auto my-1"/>
        <div className="desktop-postDescriptionBottom w-100 pt-2">
          {props.isShowingComments === true ? 
            props.post.comments ? commentForm : noComments
            : props.post.likes ? likesBlock : noLikes}
        </div>
      </div>
    </div>
  );

  return(
    <div className="w-1 00 h-100 p-5">
      <div className="row h-100">
      { props.post.type === 'image' ? image : text }
      {descriptionBlock}
      </div>
    </div>
  );
}