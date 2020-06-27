import React from 'react';
import { Button, Col, Form, FormGroup, FormFeedback, FormText, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

export function RegisterOne(props){
  return (
    <div className="w-100 h-100">
      <div className="h-25 d-flex justify-content-center flex-wrap align-content-center"><h1 className="text-center">Wave Js</h1></div>
      <div className="w-100 h-75 mx-0 row">
        <div className="h-100 col-md-6 d-none d-md-block row">
          <div className="col-md-9 col-11 mx-auto">
          <h4>Register a new profile.</h4>
          <p><b>Fill out all boxes</b> to start a new profile entry. After submitting the entries the next page will take you to completing your profile.</p>
          <p><b>Additional profile features</b> personal profile image, description, your personal posts and always the ability to edit this information later.</p>
          <p><b>Personal profiles and posts are deleted every 24 hours.</b> This is only a test site after all.</p>
          </div>
        </div>
        <div className="h-100 col-12 col-md-6 d-flex flex-wrap">
          <div className="mx-auto">
            <div className="text-center mb-4">
              <h4>Register New Profile</h4>
              <span>Enter all the information below to create new profile</span>
            </div>
            <Form>
              <FormGroup>
                <Input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Email address" 
                  onChange={props.handleChange} 
                  value={props.email}
                />
                <FormText>(It can be fake, but keep in email format)</FormText>
                {props.isEmailValid === false ? 
                  <span className="text-danger"><b>{props.emailValidMessage}</b></span> 
                : null}
              </FormGroup>
              <FormGroup>
                <Input 
                  type="text" 
                  name="username" 
                  id="username" 
                  placeholder="Create username"
                  onChange={props.handleChange} 
                  value={props.username}
                />
                <FormText>8 to 16 characters for username (Aa-Zz, 0-9, -, _)</FormText>
                {props.isUsernameValid === false ? 
                  <span className="text-danger"><b>{props.usernameValidMessage}</b></span> 
                : null}
              </FormGroup>
              <FormGroup>
                <Input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Create Password"
                  onChange={props.handleChange} 
                  value={props.password}
                />
              </FormGroup>
              <FormGroup>
                <Input 
                  type="password" 
                  name="repassword" 
                  id="repassword" 
                  placeholder="Re-enter Password"
                  onChange={props.handleChange} 
                  value={props.repassword}
                />
                <FormText>8 to 16 characters, special characters allowed</FormText>
                {props.isPasswordValid === false ? 
                  <span className="text-danger"><b>{props.passwordValidMessage}</b></span> 
                : null}
              </FormGroup>
              <div className="row d-flex justify-content-around text-center mb-3">
                <div className="col-6"><Button color="info" onClick={props.handleRegister}>Submit</Button></div>
                <div className="col-6"><Button onClick={props.cancelRegister}>Cancel</Button></div>
              </div>
              <div className="row d-flex justify-content-around text-center mb-3">
                <div className="col-9 login-changeLogin">
                  <span><Link to="/login">Already a User? Click here to Log In</Link></span>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}