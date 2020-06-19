import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { useParams, Redirect } from 'react-router-dom';

export function CreateProfile(props){
  const {username,email,password} = useParams();
  return (
    <CreateProfileClass 
    username={username}
    email={email}
    password={password} 
    />
  );
}

export class CreateProfileClass extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstname:"",
      lastname:"",
      description:"",
      visibility:"public",
      image:null,
    }
    this.previewFile = this.previewFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    //Use this to check for [username, email, password] values. if empty redirect to register
    if(this.props.email === undefined && this.props.username === undefined && this.props.password === undefined){
      return console.log("pass");
    } else {
      return console.log("fail");
    }
  }

  previewFile(e) {
    this.setState({
      image: URL.createObjectURL(e.target.files[0])
    })
    console.log(e.target.files[0])
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  handleSubmit(){
    if(this.state.username && this.state.email && this.state.firstname && this.state.lastname && this.state.password && this.state.image){
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
      axios.post('/users/register', {
        username: this.props.username,
        email: this.props.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        password: this.props.password,
        isVisible: this.state.visibility === "public" ? true : false,
        description: this.state.description,
        image: this.state.image
      }, config)
      .then(res => console.log(res))
      .catch(err => 'Error registering user: ' + err);
      } else {
        console.log('error adding user');
      }
  }

  render(){

    const profileImg = {
      backgroundSize: 'cover',
      backgroundColor: 'gray',
      backgroundImage:`url('${this.state.image}')`,
      backgroundPosition: 'center',
      width: '7rem',
      minHeight: '7rem',
      borderRadius: '50%',
      margin: 'auto'
    }

    return(
      <div className="w-100 h-100 d-flex flex-wrap align-content-center createProfile-scroll">
        <div className="w-100 px-3 mx-0 row ">
          <div className="col-md-6 col-sm-12 mb-2">
            <h1>Welcome {this.props.username}!</h1>
            <h3>Fill out the rest of the info needed to complete your profile!</h3>
          </div>
          <div className="col-md-6 col-sm-12 row  d-flex flex-wrap align-items-center">
            <div className="col-md-6 col-sm-12 mb-2">
              <div id="newProfileImg" style={profileImg} />
            </div>
            <div className="col-md-6 col-sm-12 mb-2">
            <FormGroup>
              <Input type="file" name="image" id="image" onChange={this.previewFile}/>
            </FormGroup>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 mb-2">
            <FormGroup>
              <Input 
              type="text" 
              name="firstname" 
              id="firstname" 
              placeholder="First Name"
              onChange={this.handleChange} 
              value={this.state.firstname} 
              />
            </FormGroup>
            <FormGroup>
              <Input 
              type="text" 
              name="lastname" 
              id="lastname" 
              placeholder="Last Name"
              onChange={this.handleChange} 
              value={this.state.lastname} 
              />
            </FormGroup>
            <FormGroup tag="fieldset">
              <legend>Profile Visibility</legend>
              <FormGroup check>
                <Label check>
                  <Input 
                  type="radio" 
                  name="visibility"
                  onChange={this.handleChange}
                  checked={this.state.visibility === "public"}
                  value="public" 
                  />{' '}
                  Public
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input 
                  type="radio" 
                  name="visibility"
                  onChange={this.handleChange}
                  checked={this.state.visibility === "private"} 
                  value="private"
                  />{' '}
                  Private
                </Label>
              </FormGroup>
            </FormGroup>
          </div>
          <div className="col-md-6 col-sm-12 mb-2">
            <FormGroup>
              <Label for="exampleText">Add a header to your profile</Label>
              <Input 
              type="textarea" 
              name="description" 
              id="description" 
              placeholder="100 characters max"
              onChange={this.handleChange} 
              value={this.state.description}
              />
            </FormGroup>
          </div>
          <div className="col-12 mt-3 row">
          <Button color="primary" className="mx-3" onClick={this.handleSubmit}>Submit</Button>
          <Button className="mx-3">Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}