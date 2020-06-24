import React, { useState } from 'react';

import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

import { Link } from 'react-router-dom';

import Liked from '../../assets/liked.png';
import Like from '../../assets/noLike.png';
import Comment from '../../assets/comment.png';
import Share from '../../assets/share.png';
import SamplePic from '../../assets/sample-profile-pic.jpg';

export default function MobilePost(props){

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
    maxHeight:'400px',
    minHeight:'200px',
    backgroundImage:(props.post.image ? `url('${postImageUrl}')` : `url('https://res.cloudinary.com/dzaepha4e/image/upload/v1592794284/sample-profile-pic_jxtcf8.jpg')`),
    backgroundSize:'cover',
    backgroundPosition:'center'
  }

  return (
    <div className="w-100 mh-50 mb-5">
          <div className="mobile-postHeader px-4 py-1 d-flex justify-content-between">
            <Link className="postLink" to={`/profile/${props.post.userId.username}`}>
              <div style={mobileFeedProfileImgStyle} className="float-left mr-3"/>
              <span><b>{props.post.userId.username}</b></span>
            </Link>
            <div className="desktop-postDateTime"><p><b>{props.getCreatedDate(props.post.createdDate)}</b></p></div>
          </div>
          <Link className="postLink" to={`/post/${props.post.link}`}> 
            {props.post.type === "image" ? 
              <div style={mobileFeedPostImgStyle} />
            : <div className="mobile-postText border d-flex flex-wrap align-content-center justify-content-center">
                <h5>{props.post.description}</h5> 
              </div>
            }
          </Link> 
          <div className="p-2 mobile-postResponseImg">
            <div className="w-100 row p-0 m-0 d-flex flex-wrap align-items-center justify-content-between">
              <span>
                <img onClick={()=>{props.post.userLiked === true ? props.handleLike(props.post._id) : props.handleDislike(props.post._id)}} src={Like} alt="Like-Icon" />
                <span><Link className="postLink" to={`/post/${props.post.link}`}>{props.post.likes ? props.post.likes.likes.length : 0}&nbsp;likes</Link></span>
              </span>
              <span>
                <Link className="postLink" to={`/post/${props.post.link}`}>
                <img src={Comment} alt="Comment-Icon" />
                {props.post.comments ? props.post.comments.comments.length : 0}&nbsp;comments
                </Link>
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
          </div>
        </div>
  )
}