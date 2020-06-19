import React, { Component } from 'react';
import { Button, Form, FormGroup, FormFeedback, FormText, Label, Input } from 'reactstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { CreateProfile } from './CreateProfile';

import { RegisterOne } from './RegisterOne';
import { RegisterTwo } from './RegisterTwo';

export class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      isRegistered:false,
      //Input values
      email:'',
      username:'',
      password:'',
      repassword:'',
      firstname:'',
      lastname:'',
      description:'',
      visibility:'public',
      previewImage:null,
      image:null,
      isRegisterSuccessful:false,

      //Validation values
      isEmailValid:'',
      emailValidMessage:'',
      isUsernameValid:'',
      usernameValidMessage:'',
      isPasswordValid:'',
      passwordValidMessage:'',
      isFullyValid:''
    }
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.checkPasswords = this.checkPasswords.bind(this);
    this.finalRegisterCheck = this.finalRegisterCheck.bind(this);
    this.previewFile = this.previewFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelRegister = this.cancelRegister.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkEmail(){
    /* 
    1) validate format [if/else]
    2) check if email already exists [return value in state]
    */
 
    //validate format ([letters,numbers,_,-]@[letters,numbers].[com,co,net,edu,.co.uk])
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
    if(this.state.email.match(emailFormat)){
     //check if email already exists
     axios.get(`/users/checkEmail/${this.state.email}`)
     .then(res=>{
       this.setState({
         isEmailValid:res.data.isEmailValid,
         emailValidMessage:res.data.emailValidMessage
       }, ()=> {
         //Console log result after setState
         console.log("Email valid?: " + this.state.isEmailValid);
         console.log('Email valid message: ' + this.state.emailValidMessage);
         this.checkUsername();
         }
       );
     })
     .catch(err=>('Error: ' + err));
    } 
    else {
     //Return error as 'invalid email format'
     this.setState({
       isEmailValid:false,
       emailValidMessage:'Invalid Email format'
     }, ()=>{
       //Console log result after setState
       console.log("Email valid?: " + this.state.isEmailValid);
       console.log('Email valid message: ' + this.state.emailValidMessage);
       }
     );
    }
   }
 
   checkUsername(){
     /* 
     1) validate format [if/else]
     2) check if username already exists [return value in state]
     */
 
     //validate format ([letters,numbers,_,-] / between 8-16 characters)
     var usernameFormat =  /^[0-9A-Za-z_-]+[0-9A-Za-z_-]*$/g;
 
     if(this.state.username.match(usernameFormat) && this.state.username.length >= 8 && this.state.username.length <= 16){
       //check if username already exists
       axios.get(`/users/checkUsername/${this.state.username}`)
       .then(res=>{
         this.setState({
           isUsernameValid:res.data.isUsernameValid,
           usernameValidMessage:res.data.usernameValidMessage
         }, ()=> {
           //Console log result after setState
           console.log("Username valid?: " + this.state.isUsernameValid);
           console.log("Username valid message: " + this.state.usernameValidMessage);
           this.checkPasswords();
           }
         );
       })
       .catch(err=>('Error: ' + err));
       } 
       else {
       //Return error as 'invalid username format'
       this.setState({
         isUsernameValid:false,
         usernameValidMessage:'Invalid Username format'
       }, ()=>{
         //Console log result after setState
         console.log("Username valid?: " + this.state.isUsernameValid);
         console.log("Username valid message: " + this.state.usernameValidMessage);
         }
       );
     }
   }
 
   checkPasswords(){
     /*
     1) Check if passwords match
     2) Validate password
     */
     //validate format (A-Z... a-z ... 1234567890 ... !@#$%&*()_-+={[}]|\:;"'<,>.?/~`)
 
     if(this.state.password === this.state.repassword){
       // validate this.state.registerPassword format (since both are same)
       var passwordFormat =  /^[0-9A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\~`]+[0-9A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\~`]*$/g;
 
       if(this.state.password.match(passwordFormat) && this.state.repassword.length >= 8 && this.state.repassword.length <= 16){
         this.setState({
           isPasswordValid: true,
           passwordValidMessage: null
         }, ()=>{
           console.log("Password valid?: " + this.state.isPasswordValid);
           console.log("Password valid message: " + this.state.passwordValidMessage);
           this.finalRegisterCheck();
           }
         );
       }
       else {
         this.setState({
           isPasswordValid:false,
           passwordValidMessage:'Invalid Password Format', 
         }, ()=>{
           console.log("Password valid?: " + this.state.isPasswordValid);
           console.log("Password valid message: " + this.state.passwordValidMessage);
           }
         );
       }
     } 
     else {
       this.setState({
         isPasswordValid:false,
         passwordValidMessage:'Passwords do not match',
       }, () =>{
         console.log("Password valid?: " + this.state.isPasswordValid);
         console.log("Password valid message: " + this.state.passwordValidMessage);
         }
       );
     }
   }
 
   finalRegisterCheck() {
     if(this.state.isEmailValid === true && this.state.isUsernameValid === true && this.state.isPasswordValid === true) {
       this.setState({isRegistered:true},()=>console.log(this.state.isRegistered))
     } else { console.log('isEmailValid='+this.state.isEmailValid+' isUsernameValid='+this.state.isUsernameValid+' isPasswordValid='+this.state.isPasswordValid)}
   }
 
   handleRegister(){
     this.checkEmail();
   }

   cancelRegister(){
     this.setState({
      isRegistered:false,
      //Input values
      email:'',
      username:'',
      password:'',
      repassword:'',
      firstname:'',
      lastname:'',
      description:'',
      visibility:'public',
      previewImage:null,
      image:null,

      //Validation values
      isEmailValid:'',
      emailValidMessage:'',
      isUsernameValid:'',
      usernameValidMessage:'',
      isPasswordValid:'',
      passwordValidMessage:'',
      isFullyValid:''
     })
   }

   previewFile(e) {
    this.setState({
      previewImage: URL.createObjectURL(e.target.files[0]),
      image:e.target.files[0]
    },()=>{console.log(this.state.image)})
  }

   handleSubmit(){
    if(this.state.username && this.state.email && this.state.firstname && this.state.lastname && this.state.password && this.state.image){
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        var fd = new FormData();
        fd.append('file',this.state.image);
        fd.append('username',this.state.username);
        fd.append('email',this.state.email);
        fd.append('firstname',this.state.firstname);
        fd.append('lastname',this.state.lastname);
        fd.append('password',this.state.password);
        fd.append('isVisible',true);
        fd.append('description',this.state.description);
      axios.post('/users/register', fd, config)
      .then(res => {
        this.props.registerSuccessful(res.data);
        this.setState({isRegisterSuccessful:true})
      })
      .catch(err => 'Error registering user: ' + err);
      } else {
        console.log('error adding user' + this.state);
      }
  }
  /*
  Not registered -> Render register component, and pass down grabRegistration()
  If registered -> Flip state and redirect with values
  */
  render() {
    return (
      this.state.isRegistered === false ? 
      <RegisterOne
      email={this.state.email}
      username={this.state.username}
      password={this.state.password}
      isEmailValid={this.state.isEmailValid}
      emailValidMessage={this.state.emailValidMessage}
      isUsernameValid={this.state.isUsernameValid}
      usernameValidMessage={this.state.usernameValidMessage}
      isPasswordValid={this.state.isPasswordValid}
      passwordValidMessage={this.state.passwordValidMessage}
      isFullyValid={this.state.isFullyValid}
      handleRegister={this.handleRegister}
      handleChange={this.handleChange}
      cancelRegister={this.cancelRegister}
      /> : 
      <RegisterTwo
      email={this.state.email}
      username={this.state.username}
      password={this.state.password}
      firstname={this.state.firstname}
      lastname={this.state.lastname}
      description={this.state.description}
      visibility={this.state.visibility}
      previewImage={this.state.previewImage}
      image={this.state.image}
      previewFile={this.previewFile}
      handleSubmit={this.handleSubmit}
      handleChange={this.handleChange}
      cancelRegister={this.cancelRegister}
      isRegisterSuccessful={this.state.isRegisterSuccessful}
      />
    );
  }
}