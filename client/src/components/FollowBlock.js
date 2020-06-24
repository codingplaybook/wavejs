import React from 'react';
import { Link } from 'react-router-dom';

import SamplePic from '../assets/sample-profile-pic.jpg';

export default function FollowBlock(props){
  
  const selectFollow = props.followDisplay === 'followers' ? 'Followers' : 'Following';

  const followType = props.followDisplay === 'followers' ? props.profile.followers.followers : props.profile.followings.followings;

  function displayFollowImg(image){
    return {
      backgroundImage: (image ? `url('${image}')` : `url('https://res.cloudinary.com/dzaepha4e/image/upload/v1592794284/sample-profile-pic_jxtcf8.jpg')`),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '60px',
      minHeight: '60px',
      borderRadius: '50%'
    }
  }

  const singleFollowProfile = followType.map(follow => 
    (
      <div key={follow._id} className="w-100 my-1 row d-flex flex-wrap align-items-center">
        <div className="col-3">
          <Link to={`/profile/${follow.username}`}>
            <div style={displayFollowImg(follow.image)} />
          </Link>
        </div>
        <div className="col-5">
          <Link to={`/profile/${follow.username}`} className="postLink"><h4>{follow.username}</h4></Link>
        </div>
      </div>
    )
  );

  const noFollows = (
    <p>No {selectFollow}</p>
  );

  return (
    <div className="w-100">
      <h1>{selectFollow}</h1>
      {props.profile.followers ? singleFollowProfile : noFollows}
    </div>
  );
}