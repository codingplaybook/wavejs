import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

export function RegisterTwo(props){

  const profileImg = {
    backgroundSize: 'cover',
    backgroundColor: 'gray',
    backgroundImage:`url('${props.previewImage}')`,
    backgroundPosition: 'center',
    width: '7rem',
    minHeight: '7rem',
    borderRadius: '50%',
    margin: 'auto'
  }

  return(
    <div className="w-100 h-100 d-flex flex-wrap align-content-center createProfile-scroll">
      <div className="w-100 h-100 px-3 mx-0 row ">
        <div className="col-md-6 col-sm-12 mb-2">
          <h1>Welcome {props.username}!</h1>
          <h3>Fill out the rest of the info needed to complete your profile!</h3>
        </div>
        <div className="col-md-6 col-sm-12 row  d-flex flex-wrap align-items-center">
          <div className="col-md-6 col-sm-12 mb-2">
            <div id="newProfileImg" style={profileImg} />
          </div>
          <div className="col-md-6 col-sm-12 mb-2">
          <FormGroup>
            <Input type="file" name="image" id="image" onChange={props.previewFile}/>
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
            onChange={props.handleChange} 
            value={props.firstname} 
            />
          </FormGroup>
          <FormGroup>
            <Input 
            type="text" 
            name="lastname" 
            id="lastname" 
            placeholder="Last Name"
            onChange={props.handleChange} 
            value={props.lastname} 
            />
          </FormGroup>
          {/*<FormGroup tag="fieldset">
            <legend>Profile Visibility</legend>
            <FormGroup check>
              <Label check>
                <Input 
                type="radio" 
                name="visibility"
                onChange={props.handleChange}
                checked={props.visibility === "public"}
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
                onChange={props.handleChange}
                checked={props.visibility === "private"} 
                value="private"
                />{' '}
                Private
              </Label>
            </FormGroup>
          </FormGroup>*/}
        </div>
        <div className="col-md-6 col-sm-12 mb-2">
          <FormGroup>
            <Label for="exampleText">Add a header to your profile</Label>
            <Input 
            type="textarea" 
            name="description" 
            id="description" 
            placeholder="100 characters max"
            onChange={props.handleChange} 
            value={props.description}
            />
          </FormGroup>
        </div>
        { props.isRegisterSuccessful === true ? 
          <Redirect to={`/profile/${props.username}`} />
        :
        <div className="col-12 mt-3 row register-submitButtons">
        <Button color="primary" className="mx-3" onClick={props.handleSubmit}>Submit</Button>
        <Button className="mx-3" onClick={props.cancelRegister}>Cancel</Button>
        </div>
        }
      </div>
    </div>
  );
}