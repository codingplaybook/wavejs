import React, { Component } from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap';

import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router-dom';

import MobileSinglePost from './mobile-views/MobileSinglePost';
import DesktopSinglePost from './desktop-views/DesktopSinglePost';

export function Post(props){
  const {link} = useParams();
  return (
    <PostComponent 
    link={link} 
    activeUser={props.activeUser}
    />
  );
}

export class PostComponent extends Component{
  static displayName = Post.name;

  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      isPostLiked:false,
      post:'',
      newComment:'',
      isShowingComments:false,
      userNameImg: "../../assets/sample-profile-pic.jpg"
    }
    this.handleChange = this.handleChange.bind(this);
    this.getCreatedDate = this.getCreatedDate.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
    this.addComment = this.addComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  componentDidMount(){
    axios.get(`/posts/findLink/${this.props.link}`)
    .then(res => {
      this.setState({
        post:res.data
      },()=>{
        this.setState({
          isLoaded:true,
          isPostLiked: this.state.post.likes.likes.some(x => x.userId.username === this.props.activeUser.username)
        },()=>console.log(this.state))
      })
    },
    (error) => {
      console.log('Error getting single post: ' + error);
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  addComment(){
    axios.post(`/posts/addComment/${this.state.post._id}`,{
      userId:this.props.activeUser._id,
      description:this.state.newComment
    })
    .then(() => {
      axios.get(`/posts/findLink/${this.state.post.link}`)
      .then(res => {
        this.setState({
          post:res.data,
          newComment:''
        },()=>{
          this.setState({
            isLoaded:true,
            isPostLiked: this.state.post.likes.likes.some(x => x.userId.username === this.props.activeUser.username)
          })
        })
      },
      (error) => {
        console.log('Error getting single post: ' + error);
      })
    })
    .catch(err => 'Error adding comment: ' + err);
  }

  removeComment(commentId){
    axios.post(`/posts/removeComment/${this.state.post._id}`,{

    })
    .then(() => {
      axios.get(`/posts/findLink/${this.state.post.link}`)
      .then(res => {
        this.setState({
          post:res.data
        },()=>{
          this.setState({
            isLoaded:true,
            isPostLiked: this.state.post.likes.likes.some(x => x.userId.username === this.props.activeUser.username)
          })
        })
      },
      (error) => {
        console.log('Error getting single post: ' + error);
      })
    })
    .catch(err => 'Error removing comment: ' + err);
  }

  addLike(){
    axios.post(`/posts/addLike/${this.state.post._id}`,{
      userId:this.props.activeUser._id
    })
    .then(() => {
      axios.get(`/posts/findLink/${this.state.post.link}`)
      .then(res => {
        this.setState({
          post:res.data
        },()=>{
          this.setState({
            isLoaded:true,
            isPostLiked: this.state.post.likes.likes.some(x => x.userId.username === this.props.activeUser.username)
          })
        })
      },
      (error) => {
        console.log('Error getting single post: ' + error);
      })
    })
    .catch(err => 'Error adding like: ' + err);
  }

  removeLike(){
    axios.post(`/posts/removeLike/${this.state.post._id}`,{
      userId:this.props.activeUser._id
    })
    .then(() => {
      axios.get(`/posts/findLink/${this.state.post.link}`)
      .then(res => {
        this.setState({
          post:res.data
        },()=>{
          this.setState({
            isLoaded:true,
            isPostLiked: this.state.post.likes.likes.some(x => x.userId.username === this.props.activeUser.username)
          })
        })
      },
      (error) => {
        console.log('Error getting single post: ' + error);
      })
    })
    .catch(err => 'Error removing like: ' + err);
  }

  toggleComments(value){
    this.setState({
      isShowingComments: value
    })
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

  render(){

    const renderContent = () => {
      if(isMobile) {
        return <div className="h-100 pt-3 d-flex flex-wrap align-content-center">
        <MobileSinglePost 
        activeUser={this.props.activeUser} 
        getCreatedDate={this.getCreatedDate} 
        post={this.state.post}
        isShowingComments={this.state.isShowingComments}
        toggleComments={this.toggleComments}
        isPostLiked={this.state.isPostLiked}
        newComment={this.state.newComment}
        handleChange={this.handleChange}
        addComment={this.addComment}
        removeComment={this.removeComment}
        addLike={this.addLike}
        removeLike={this.removeLike}
        />
        </div>
      }
      else {
        return <DesktopSinglePost 
        activeUser={this.props.activeUser} 
        getCreatedDate={this.getCreatedDate} 
        post={this.state.post}
        isShowingComments={this.state.isShowingComments}
        toggleComments={this.toggleComments}
        isPostLiked={this.state.isPostLiked}
        newComment={this.state.newComment}
        handleChange={this.handleChange}
        addComment={this.addComment}
        removeComment={this.removeComment}
        addLike={this.addLike}
        removeLike={this.removeLike}
        />
      }
    }
    return this.state.isLoaded === true ? renderContent() : (
      <div className="w-100 h-100 d-flex flex-wrap justify-content-center align-content-center">
        <Spinner type="grow" color="info" style={{ width: '3rem', height: '3rem' }} />
        <Spinner type="grow" color="info" style={{ width: '3rem', height: '3rem' }} />
        <Spinner type="grow" color="info" style={{ width: '3rem', height: '3rem' }} />
      </div>
    );;
  }
}