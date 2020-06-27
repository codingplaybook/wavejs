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
  const switchActiveComponent = props.location ? props.location.change.activeComponent : null;
  const {username} = useParams();
  const {grabLocation} = useLocation();
  console.log(grabLocation);

  return <ProfileComponent 
  username={username} 
  activeUser={props.activeUser}
  logout={props.logout}
  activeComponent={switchActiveComponent}
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
      editPassword:'',
      editRePassword:'',
      editDescription:'',
      showErrors:'',
      isEditError:false,
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
    this.continueProfileUpdate = this.continueProfileUpdate.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
  }

  componentDidMount(){
    fetch(`/users/profile/username/${this.props.username}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          profile: result
        },()=>{
          this.setState({
            isFollowing: this.state.profile.followers.followers.some(x => x.username === this.props.activeUser.username)
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
    )
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.username !== prevProps.username) {
      fetch(`/users/profile/username/${this.props.username}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            profile: result,
            activeComponent:'all'
          },()=>{
            this.setState({
              isFollowing: this.state.profile.followers.followers.some(x => x.username === this.props.activeUser.username)
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
      )
    }
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

  continueProfileUpdate(){
    if(this.state.newProfileImage){
      if(this.state.editPassword === this.state.editRePassword){
        /* 
        Add code to checkusername
        */
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        var fd = new FormData();
        fd.append('file',this.state.newProfileImage);
        fd.append('upload_preset','sryediiz');
        axios.post('https://api.cloudinary.com/v1_1/dzaepha4e/image/upload',fd)
        .then(res=>{
          axios.post(`/users/updateWithImage/${this.state.profile._id}`,{
            username:(this.state.editUsername ? this.state.editUsername : null),
            email:(this.state.editEmail ? this.state.editEmail : null),
            username:(this.state.editUsername ? this.state.editUsername : null),
            firstname:(this.state.editFirstname ? this.state.editFirstname : null),
            lastname:(this.state.editLastname ? this.state.editLastname : null),
            password:(this.state.editPassword ? this.state.editPassword : null),
            image:res.data.secure_url
          })
          .then(res=>{
            if(this.state.editUsername) {this.props.logout()}
            else {
              this.setState({
                editEmail:'',
                editUsername:'',
                editFirstname:'',
                editLastname:'',
                editDescription:'',
                editPassword:'',
                editRePassword:'',
                showErrors:false,
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
          .catch(err=>console.log('Error updating user: ' + err));
        })
        .catch(err=>console.log('Error uploading edit user image to cloudinary: ' + err));
      }
      else {
        this.setState({isEditError:true, showErrors:'Password do not match'})
      }
    } else {
      if(this.state.editPassword === this.state.editRePassword){
        var firstname = this.state.editFirstname ? this.state.editFirstname : null;
        var lastname = this.state.editLastname ? this.state.editLastname : null;
        var email = this.state.editEmail ? this.state.editEmail : null;
        var description = this.state.editDescription ? this.state.editDescription : null;
        var username = this.state.editUsername ? this.state.editUsername : null;
        var password = this.state.editPassword ? this.state.editPassword : null;

        axios.post(`/users/updateNoImage/${this.state.profile._id}`,{
          firstname,
          lastname,
          email,
          description,
          username,
          password,
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
              editPassword:'',
              editRePassword:'',
              isEditError:false,
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
      else {
        this.setState({isEditError:true, showErrors:'Password do not match'})
      }
    }
  }

  checkUsername(){
    var usernameFormat =  /^[0-9A-Za-z_-]+[0-9A-Za-z_-]*$/g;

    if(this.state.editUsername.match(usernameFormat) && this.state.editUsername.length >= 8 && this.state.editUsername.length <= 16){
      //check if editUsername already exists
      axios.get(`/users/changeUsername/${this.state.editUsername}`)
      .then(res=>{
        this.setState({
          isEditError:res.data.isEditError,
          showErrors:res.data.showErrors 
        }, ()=> {
          if(!this.state.isEditError){this.continueProfileUpdate()}
          }
        );
        //Console log result after setState
        console.log(res);
        console.log(this.state.isEditError + ' ' + this.state.showErrors);
      })
      .catch(err=>('Error: ' + err));
      } 
      else {
      //Return error as 'invalid editUsername format'
      this.setState({
        isEditError:true,
        showErrors:'Invalid Username format'
      }, ()=>{
        //Console log result after setState
        console.log("Username valid?: " + this.state.isEditError);
        console.log("Username valid message: " + this.state.showErrors);
        }
      );
    }
  }

  handleProfileUpdate(){
    if(this.state.editUsername){this.checkUsername()}
    else{this.continueProfileUpdate()}
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
      fd.append('upload_preset','sryediiz');
      axios.post('https://api.cloudinary.com/v1_1/dzaepha4e/image/upload',fd)
      .then(res=>{
        axios.post('/posts/newImagePost',{
          description:(this.state.newPostDescription ? this.state.newPostDescription : ''),
          type:'image',
          image:res.data.secure_url,
          userId:this.props.activeUser._id,
        },()=>console.log(res))
        .then(res => {
          this.setState({
            newPostLink:res.data.link
          },()=>{
            this.setState({isNewPostSubmitted:true});
            console.log(res.data)
          });
        })
        .catch(err=>console.log('Error uploading new post: ' + err)); 
      })
      .catch(err=>console.log('Error uploading to cloudinary: ' + err)); 
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

    const backgroundProfileImg = this.state.profile.image ? this.state.profile.image : 'https://res.cloudinary.com/dzaepha4e/image/upload/v1592793992/default-profile_wydw3s.png';

    const newProfileImage = this.state.newPreviewProfileImage ? this.state.newPreviewProfileImage : 'https://res.cloudinary.com/dzaepha4e/image/upload/v1592793992/default-profile_wydw3s.png';

    const newPostImage = this.state.newPreviewPostImage ? this.state.newPreviewPostImage : 'https://res.cloudinary.com/dzaepha4e/image/upload/v1592794052/addImage_js9ypz.png';

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
      backgroundImage: `url('${backgroundProfileImg}')`,
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
      backgroundImage:  `url('${backgroundProfileImg}')`,
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
        editPassword={this.state.editPassword}
        editRePassword={this.state.editRePassword}
        editDescription={this.state.editDescription}
        showErrors={this.state.showErrors}
        isEditError={this.state.isEditError}
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
        editPassword={this.state.editPassword}
        editRePassword={this.state.editRePassword}
        editDescription={this.state.editDescription}
        showErrors={this.state.showErrors}
        isEditError={this.state.isEditError}
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
