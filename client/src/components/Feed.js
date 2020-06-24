import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import { Spinner } from 'reactstrap';

import { MobileFeed } from './mobile-views/MobileFeed';
import { DesktopFeed } from './desktop-views/DesktopFeed';

import axios from 'axios';

export function Feed(props){
  return <FeedComponent 
  profile={props.profile} 
  profileFeedDisplay={props.profileFeedDisplay}
  profileDisplayType={props.profileDisplayType}
  activeUser={props.activeUser}
  />
}

export default class FeedComponent extends Component {
  static displayName = Feed.name;

  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      posts:[],
      targetProfileId:this.props.targetProfileId,
      userNameImg: "../../assets/sample-profile-pic.jpg"
    }
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.getCreatedDate = this.getCreatedDate.bind(this);
  }

  componentDidMount() {
    //Check if profile display
    //If profile display check for post by type
    if(this.props.profileFeedDisplay) {
      return axios.get(`/posts/findUserPosts/${this.props.profile.username}`)
      .then(res => this.setState({posts:res.data, isLoaded:true},()=>console.log('All posts: ' + this.state.posts)))
      .catch(err => 'Error getting posts: ' + err)
    } 
    else {
      return axios.get(`/posts/`)
      .then(res => this.setState({posts:res.data, isLoaded:true},()=>console.log('All posts: ' + this.state.posts)))
      .catch(err => 'Error getting posts: ' + err)
    }  
  }

  handleDislike(postId){
    axios.post(`/post/removeLike/${postId}`,{
    userId: this.props.profile._id ? this.props.profile._id : this.props.activeUser._id
    })
    .then(() => {
      if(this.props.profileFeedDisplay) {
        return axios.get(`/posts/findUserPosts/${this.props.profile.username}`)
        .then(res => this.setState({posts:res.data, isLoaded:true},()=>console.log('All posts: ' + this.state.posts)))
        .catch(err => 'Error getting posts: ' + err)
      } 
      else {
        return axios.get(`/posts/`)
        .then(res => this.setState({posts:res.data, isLoaded:true},()=>console.log('All posts: ' + this.state.posts)))
        .catch(err => 'Error getting posts: ' + err)
      }
    })
    .catch(err => "Error removing a like: " + err);
  }

  handleLike(postId){
    axios.post(`/post/addLike/${postId}`,{
    userId: this.props.profile._id ? this.props.profile._id : this.props.activeUser._id
    })
    .then(() => {
      if(this.props.profileFeedDisplay) {
        return axios.get(`/posts/findUserPosts/${this.props.profile.username}`)
        .then(res => this.setState({posts:res.data, isLoaded:true},()=>console.log('All posts: ' + this.state.posts)))
        .catch(err => 'Error getting posts: ' + err)
      } 
      else {
        return axios.get(`/posts/`)
        .then(res => this.setState({posts:res.data, isLoaded:true},()=>console.log('All posts: ' + this.state.posts)))
        .catch(err => 'Error getting posts: ' + err)
      }  
    })
    .catch(err => "Error posting a like: " + err);
  }

  getCreatedDate(createdDate) {
    //Amount of milliseconds per
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = day * 29;

    //Get milliseconds since now
    var newDate = Math.abs(createdDate - Date.now());

    //Convert to variable with string
    if(newDate > month){
      let timeSince = Math.floor(newDate/month);
      return `${timeSince}mo ago`
    }
    else if(newDate > week){
      let timeSince = Math.floor(newDate/week);
      return `${timeSince}wk ago`
    }
    else if(newDate > day){
      let timeSince = Math.floor(newDate/day);
      return `${timeSince}dy ago`
    }
    else if(newDate > hour){
      let timeSince = Math.floor(newDate/hour);
      return `${timeSince}hr ago`
    }
    else if(newDate > minute){
      let timeSince = Math.floor(newDate/minute);
      return `${timeSince}min ago`
    }
    else {
      let timeSince = Math.floor(newDate/second);
      return `${timeSince}s ago`
    }
  }

  render () {
    console.log(this.props.activeUser);
    const renderContent = () => {
      if(isMobile) {
        return <MobileFeed 
        profileFeedDisplay={this.props.profileFeedDisplay}
        profileDisplayType={this.props.profileDisplayType}
        activeUser={this.props.activeUser}
        handleLike={this.handleLike}
        handleDislike={this.handleDislike}
        posts={this.state.posts}
        getCreatedDate={this.getCreatedDate}
        />
      }
      else {
        return <DesktopFeed 
        profileFeedDisplay={this.props.profileFeedDisplay}
        profileDisplayType={this.props.profileDisplayType}
        activeUser={this.props.activeUser}
        handleLike={this.handleLike}
        handleDislike={this.handleDislike}
        posts={this.state.posts}
        getCreatedDate={this.getCreatedDate}  
        />
      }
    }
    return this.state.isLoaded ? renderContent() : 
    (
      <div className="w-100 h-100 d-flex flex-wrap justify-content-center align-content-center">
        <Spinner type="grow" color="info" style={{ width: '3rem', height: '3rem' }} />
        <Spinner type="grow" color="info" style={{ width: '3rem', height: '3rem' }} />
        <Spinner type="grow" color="info" style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }
}
