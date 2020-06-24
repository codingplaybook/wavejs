import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

import Liked from '../../assets/liked.png';
import Like from '../../assets/noLike.png';
import Comment from '../../assets/comment.png';
import Share from '../../assets/share.png';
import SamplePic from '../../assets/sample-profile-pic.jpg';

export default function DesktopPost(props){
  
  const getLike = props.post.likes[0];

  const [didUserLike, setUserLike] = useState(true);
  //const [didUserLike, setUserLike] = useState(props.post.likes.likes.some(x => x.userId === props.activeUser._id));

  const backgroundImageUrl = props.post.userId.image;

  const postImageUrl = props.post.image;
  
  const feedProfileImgStyle = {
    backgroundImage: (props.post.userId.image ? `url('${backgroundImageUrl}')` : `url('https://res.cloudinary.com/dzaepha4e/image/upload/v1592794284/sample-profile-pic_jxtcf8.jpg')`),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '60px',
    minHeight: '60px',
    borderRadius: '50%'
  }

  const feedPostImgStyle = {
    backgroundImage:(props.post.image ? `url('${postImageUrl}')` : `url('https://res.cloudinary.com/dzaepha4e/image/upload/v1592794284/sample-profile-pic_jxtcf8.jpg')`),
    borderRadius:'15px',
    backgroundSize:'cover',
    backgroundPosition:'center',
    minHeight:'200px'
  }
  
  /* 
  has to check if user has liked
  will control which styling to show and which function to call
  2 different hooks
  1) control which styling to show and which function to call
  2)
  */

  return(
    <div className={'w-100 mx-auto mb-3 p-3 row border ' + (props.post.type ? props.post.type === 'image' ? 'desktop-profilepostSingle-image' : 'desktop-profilepostSingle-text' : 'desktop-postSingle')}>
      <div className="col-12 row w-100">
        <div className="col-2 px-0 desktop-postImg">
          <Link className="postLink" to={`/profile/${props.post.userId.username}`}><div style={feedProfileImgStyle} /></Link>
        </div>
        <div className="col-10">
          <div className="d-flex justify-content-between mb-2">
            <div className="desktop-postUsername"><Link className="postLink" to={`/profile/${props.post.userId.username}`}>{props.post.userId.username}</Link></div>
            <div className="desktop-postDateTime"><b>{props.getCreatedDate(props.post.createdDate)}</b></div>
          </div>
          <div className="w-100 mb-3 desktop-postBlock">
            {
              props.post.image ? 
            <div className="w-100 h-100">
              <Link to={`/post/${props.post.link}`}><div style={feedPostImgStyle} onDoubleClick={()=>{didUserLike === true ? props.handleLike(props.post._id) : props.handleDislike(props.post._id)}}/></Link> 
              {props.post.description}
            </div> :
            <Link className="postLink" to={`/post/${props.post.link}`}><h5>{props.post.description}</h5></Link>
            }
          </div>
        </div>
      </div>
      <hr />
      <div className="col-4 desktop-postPostIcon d-flex justify-content-center">
        <div>
          <img onClick={()=>{didUserLike ? props.handleDislike(props.post._id) : props.handleLike(props.post._id)}} src={didUserLike ? Liked : Like} alt="Like-Icon" />
          <span><Link className="postLink" to={`/post/${props.post.link}`}>{props.post.likes ? props.post.likes.likes.length : 0}&nbsp;likes</Link></span>
        </div>
      </div>
      <div className="col-4 desktop-postPostIcon d-flex justify-content-center">
        <div>
          <Link className="postLink" to={`/post/${props.post.link}`}>
          <img src={Comment} alt="Comment-Icon" />
          {props.post.comments ? props.post.comments.comments.length : 0}&nbsp;comments
          </Link>
        </div>
      </div>
      <div className="col-4 desktop-postPostIcon shareIcon">
        <div className="d-flex justify-content-center" id={`PopoverFocus${props.post._id}`}>
        <Button className="btn btn-outline-light d-flex flex-wrap align-items-start justify-content-center shareIcon" id={`PopoverFocus${props.post._id}`} type="button"><img src={Share} alt="Share-Icon" /></Button>
          <UncontrolledPopover trigger="focus" placement="bottom" target={`PopoverFocus${props.post._id}`}>
            <PopoverHeader>Share Post Link:</PopoverHeader>
            <PopoverBody>{`${window.location.protocol}//${window.location.hostname}${window.location.port}/${props.post.link}`}</PopoverBody>
          </UncontrolledPopover>
        </div>
      </div>  
    </div>
  );
}