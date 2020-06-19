import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { Spinner } from 'reactstrap';

import { useParams, Redirect, useLocation } from 'react-router-dom';

import { MobileProfile } from './mobile-views/MobileProfile';
import { DesktopProfile } from './desktop-views/DesktopProfile';

import defaultProfileImg from '../assets/default-profile.png';
import addNewImage from '../assets/addImage.png';


export function Profile(props){
  const {username} = useParams();
  const { state = {} } = useLocation();
  const { activeComponent } = state;

  return <ProfileComponent 
  username={username} 
  activeUser={props.activeUser}
  logout={props.logout}
  activeComponent={activeComponent}
  />

}

export class ProfileComponent extends Component {

  
  constructor(props){
    super(props);
    this.state = {
      isLoaded:false,
      isFollowing: false, //pass from fetch or search after fetch?
      isNewPostSubmitted:false,
      newPostDescription:'',
      newPostType:'image',
      newPreviewPostImage:null,
      newPostImage:null,
      editEmail:'',
      editUsername:'',
      editFirstname:'',
      editLastname:'',
      editDescription:'',
      newPreviewProfileImage:null,
      newProfileImage:null,
      userNameImg: "../assets/sample-profile-pic.jpg",
      profile:'',
      activeComponent:this.props.activeComponent,
      mobileDisplayGrid:true,
      newPostLink:null,
      isPostSuccessful:false
    }
    this.handleActiveComponent = this.handleActiveComponent.bind(this);
    this.handleDropdownComponent = this.handleDropdownComponent.bind(this);
    this.previewProfileImage = this.previewProfileImage.bind(this);
    this.previewPostImage = this.previewPostImage.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnFollow = this.handleUnFollow.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleNewPostChange = this.handleNewPostChange.bind(this);
    this.handleNewPostSubmit = this.handleNewPostSubmit.bind(this);
    this.handleAllPosts = this.handleAllPosts.bind(this);
    this.handlePhotoPosts = this.handlePhotoPosts.bind(this);
    this.handleTextPosts = this.handleTextPosts.bind(this);
  }

  componentDidMount(){
    axios.get(`/users/profile/userame/${this.props.username}`)
    .then(res=>{
      this.setState({
        isloaded:true,
        profile:res
      },()=>{
        this.setState({
          isFollowing: this.state.profile.followers[0].some(x => x.username === this.props.activeUser.username)
        });
        console.log(this.props.activeUser);
      })
    })
    .catch(err=>console.log('Error getting user profile: ' + err));


    /*fetch(`/users/profile/username/${this.props.username}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          profile: result
        },()=>{
          this.setState({
            isFollowing: this.state.profile.followers[0].some(x => x.username === this.props.activeUser.username)
          })
          console.log(this.props.activeUser);
        });          
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log("Error getting user profile: " + error);
      }
    )*/
  }

  /*
  On edit success -> switch isLoaded: false, run fetch again w/ isLoaded: true
  Check to see what componentDidUpdate condition can do with new link or just use key method still
  */

  handleAllPosts(){
    axios.get(`/posts/getAllPosts/${this.state.profile._id}`)
    .then(res => this.setState({posts:res.data},()=>console.log('All posts: ' + this.state.posts)))
    .catch(err => 'Error getting posts: ' + err)
  }

  handlePhotoPosts(){
    axios.get(`/posts/getPhotoPosts${this.state.profile._id}`)
    .then(res => this.setState({posts:res.data},()=>console.log('All posts: ' + this.state.posts)))
    .catch(err => 'Error getting posts: ' + err)
  }

  handleTextPosts(){
    axios.get(`/posts/getTextPosts/${this.state.profile._id}`)
    .then(res => this.setState({posts:res.data},()=>console.log('All posts: ' + this.state.posts)))
    .catch(err => 'Error getting posts: ' + err)
  }

  previewProfileImage(e) {
    this.setState({
      newPreviewProfileImage: URL.createObjectURL(e.target.files[0]),
      newProfileImage: e.target.files[0]
    },()=>{console.log(this.state.newProfileImage)})
  }

  previewPostImage(e) {
    this.setState({
      newPreviewPostImage: URL.createObjectURL(e.target.files[0]),
      newPostImage:e.target.files[0]
    },()=>{console.log(this.state.newPostImage)})
  }

  handleProfileChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleActiveComponent(value){
    this.setState({activeComponent:value})
  }

  handleDropdownComponent(e) {
    this.setState({activeComponent: e.target.value});
  }

  handleFollow(){
    axios.post(`/users/addFollower/${this.state.profile._id}`,{activeUserId:this.props.activeUser._id})
    .then(() => {
      fetch(`/users/profile/username/${this.state.profile.username}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            profile: result
          });
          console.log("We have the profile: " + this.state.profile);          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("Error getting user profile: " + error);
        }
      )
    })
    .then(() => this.setState({isFollowing: true}))
    .catch(err => "Error following user: " + err);
  }

  handleUnFollow(){
    axios.post(`/users/removeFollower/${this.state.profile._id}`,{activeUserId:this.props.activeUser._id})
    .then(() => {
      fetch(`/users/profile/username/${this.state.profile.username}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            profile: result
          });
          console.log("We have the profile: " + this.state.profile);          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("Error getting user profile: " + error);
        }
      )
    })
    .then(() =>this.setState({isFollowing: false}))
    .catch(err => console.log("Error unfollowing user: " + err))
  }

  handleProfileUpdate(){
    if(this.state.newProfileImage){
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      var fd = new FormData();
      fd.append('file',this.state.newProfileImage);
      if(this.state.editEmail)fd.append('email',this.state.editEmail);
      if(this.state.editUsername)fd.append('username',this.state.editUsername);
      if(this.state.editFirstname)fd.append('firstname',this.state.editFirstname);
      if(this.state.editLastname)fd.append('lastname',this.state.editLastname);
      axios.post(`/users/updateWithImage/${this.state.profile._id}`, fd, config)
      .then(res=>{
        if(this.state.editUsername) {this.props.logout()}
        else {
          this.setState({
            editEmail:'',
            editUsername:'',
            editFirstname:'',
            editLastname:'',
            editDescription:'',
            addImage:'../assets/addImage.png',
            newPreviewProfileImage:null,
            newProfileImage:null,
          }, ()=>{
            fetch(`/users/profile/username/${this.props.username}`)
            .then(result => result.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  profile: result
                });
                console.log("We have the profile: " + this.state.profile);          
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                console.log("Error getting user profile: " + error);
              }
            );
          })
        }
      })
      .catch(err=>console.log("Error updating with image: " + err))
    } else {
      var firstname = this.state.editFirstname ? this.state.editFirstname : null;
      var lastname = this.state.editLastname ? this.state.editLastname : null;
      var email = this.state.editEmail ? this.state.editEmail : null;
      var description = this.state.editDescription ? this.state.editDescription : null;
      var username = this.state.editUsername ? this.state.editUsername : null;
      axios.post(`/users/updateNoImage/${this.state.profile._id}`,{
        firstname,
        lastname,
        email,
        description,
        username
      })
      .then(res => {
        if(this.state.editUsername) {this.props.logout()}
        else {
          this.setState({
            editEmail:'',
            editUsername:'',
            editFirstname:'',
            editLastname:'',
            editDescription:'',
            addImage:'../assets/addImage.png',
            newPreviewProfileImage:null,
            newProfileImage:null,
          }, ()=>{
            fetch(`/users/profile/username/${this.props.username}`)
            .then(result => result.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  profile: result
                });
                console.log("We have the profile: " + this.state.profile);          
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                console.log("Error getting user profile: " + error);
              }
            );
          })
        }
      })
      .catch(err=>console.log("Error updating without image: " + err));
    }
  }

  handleNewPostChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleNewPostSubmit(){
    if(this.state.newPostType === "image"){
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      var fd = new FormData();
      fd.append('file',this.state.newPostImage);
      fd.append('description',this.state.newPostDescription ? this.state.newPostDescription : '');
      fd.append('userId',this.props.activeUser._id);
      axios.post('/posts/newImagePost', fd, config)
      .then(res => {
        this.setState({
          newPostLink:res.data.link
        },()=>{
          this.setState({isNewPostSubmitted:true});
          console.log(res.data)
        });
      }); 
    } else {
    axios.post(`/posts/newTextPost`,{
      userId:this.props.activeUser._id,
      description:this.state.newPostDescription
    })
    .then(res => {
      this.setState({
        newPostLink:res.data.link
      },()=>{
        this.setState({isNewPostSubmitted:true});
        console.log(res.data)
      });
    })
    .catch(err => "Error submitting new post: " + err);
    }
  }

  render(){

    const backgroundProfileImg = this.state.profile.image ? this.state.profile.image : defaultProfileImg;

    const newProfileImage = this.state.newPreviewProfileImage ? this.state.newPreviewProfileImage : defaultProfileImg;

    const newPostImage = this.state.newPreviewPostImage ? this.state.newPreviewPostImage : addNewImage;

    const newProfileImgStyle = {
      width: '100px',
      height: '100px',
      margin: 'auto',
      marginBottom:'0.25rem',
      borderRadius: '50%',
      backgroundColor: 'gray',
      backgroundImage: `url('${newProfileImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    const profileImgStyle = {
      width: '150px',
      height: '150px',
      margin: 'auto',
      marginBottom:'0.25rem',
      borderRadius: '50%',
      backgroundImage: `url('/${backgroundProfileImg.replace(/\\/g, "/")}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    const newPostImgStyle = {
      height: '350px',
      borderRadius: '15px',
      backgroundColor: 'rgb(200, 200, 200)',
      backgroundImage:`url('${newPostImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginLeft:'auto',
      marginRight:'auto',
      width:'100%'
    }

    const mobileProfileCircle = {
      width: '100px',
      height: '100px',
      margin: 'auto',
      marginBottom:'0.25rem',
      borderRadius: '50%',
      backgroundColor: 'gray',
      backgroundImage:  `url('/${backgroundProfileImg.replace(/\\/g, "/")}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center' 
    }

    const renderContent = () => {
      if(isMobile) {
        return <MobileProfile
        profile={this.state.profile} 
        isLoaded={this.state.isLoaded}
        isFollowing={this.state.isFollowing}
        activeComponent={this.state.activeComponent} 
        handleDropdownComponent={this.handleDropdownComponent}
        activeUser={this.props.activeUser} 
        username={this.props.username} 
        logout={this.props.logout}
        previewFile={this.previewFile}
        handleActiveComponent={this.handleActiveComponent}
        handleFollow={this.handleFollow}
        handleUnFollow={this.handleUnFollow}
        handleProfileChange={this.handleProfileChange}
        handleProfileUpdate={this.handleProfileUpdate}
        mobileProfileCircle={mobileProfileCircle}
        previewPostImage={this.previewPostImage}
        previewProfileImage={this.previewProfileImage}
        editEmail={this.state.editEmail}
        editUsername={this.state.editUsername}
        editFirstname={this.state.editFirstname}
        editLastname={this.state.editLastname}
        editDescription={this.state.editDescription}
        newProfileImage={newProfileImage}
        newPostType={this.state.newPostType}
        newPostImage={this.state.newPostImage}
        newPreviewPostImage={this.state.newPreviewPostImage}
        newPostDescription={this.state.newPostDescription}
        isNewPostSubmitted={this.state.isNewPostSubmitted}
        newPostLink={this.state.newPostLink}
        profileImgStyle={profileImgStyle}
        newProfileImgStyle={newProfileImgStyle}
        newPostImgStyle={newPostImgStyle}
        profileFeedDisplay={true}
        handleNewPostChange={this.handleNewPostChange}
        handleNewPostSubmit={this.handleNewPostSubmit}
        />
      }
      /*else if(isTablet) {
        return <div>Tablet</div>
      }*/
      else {
        return <DesktopProfile 
        profile={this.state.profile}
        isLoaded={this.state.isLoaded} 
        isFollowing={this.state.isFollowing}
        activeComponent={this.state.activeComponent} 
        activeUser={this.props.activeUser} 
        username={this.props.username} 
        logout={this.props.logout} 
        previewFile={this.previewFile}
        handleActiveComponent={this.handleActiveComponent}
        handleFollow={this.handleFollow}
        handleUnFollow={this.handleUnFollow}
        handleProfileChange={this.handleProfileChange}
        handleProfileUpdate={this.handleProfileUpdate}
        previewPostImage={this.previewPostImage}
        previewProfileImage={this.previewProfileImage}
        editEmail={this.state.editEmail}
        editUsername={this.state.editUsername}
        editFirstname={this.state.editFirstname}
        editLastname={this.state.editLastname}
        editDescription={this.state.editDescription}
        newProfileImage={newProfileImage}
        newPostType={this.state.newPostType}
        newPostImage={this.state.newPostImage}
        newPreviewPostImage={this.state.newPreviewPostImage}
        newPostDescription={this.state.newPostDescription}
        isNewPostSubmitted={this.state.isNewPostSubmitted}
        newPostLink={this.state.newPostLink}
        profileImgStyle={profileImgStyle}
        newProfileImgStyle={newProfileImgStyle}
        newPostImgStyle={newPostImgStyle}
        profileFeedDisplay={true}
        handleNewPostChange={this.handleNewPostChange}
        handleNewPostSubmit={this.handleNewPostSubmit}
        />
      }
    }
    return this.state.isNewPostSubmitted ? <Redirect to={`/post/${this.state.newPostLink}`} /> : this.state.isLoaded ? renderContent() : (
      <div className="w-100 h-100 d-flex flex-wrap justify-content-center align-content-center">
        <Spinner type="grow" color="info" style={{ width: '3rem', height: '3rem' }} />
        <Spinner type="grow" color="info" style={{ width: '3rem', height: '3rem' }} />
        <Spinner type="grow" color="info" style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }
}
