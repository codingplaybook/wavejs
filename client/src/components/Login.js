import React, { Component } from 'react';
import axios from 'axios';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';

export function Login(props){

    return (
      <div className="w-100 h-100 pt-4">
        <div className="h-25 d-flex justify-content-center flex-wrap align-content-center"><h1 className="text-center">Wave Js</h1></div>
        <div className="w-100 h-75 mx-0 row">
          <div className="h-100 col-md-6 d-none d-md-block row">
            <div className="col-md-9 mx-auto">
            <h4>Login to your profile</h4>
            <p><b>If you haven't created a profile already</b> click the link below the form to register a new one.</p>
            <p><b>Personal profiles and posts are deleted every 3 days.</b> This is only a test site after all.</p>
            </div>
          </div>
          <div className="h-100 col-12 col-md-6 d-flex flex-wrap">
            <div className="mx-auto">
              <div className="text-center mb-4">
                <h4>Login</h4>
                <span>Enter Username and Password</span>
                {props.loginError != null ? <p className="my-1 text-center text-danger">{props.loginError}</p>: null}
              </div>
              <Form>
                <Col md={12}>
                  <FormGroup>
                    <Input 
                      type="text" 
                      name="username" 
                      id="username" 
                      placeholder="Username"
                      onChange={props.handleLoginChange} 
                      value={props.username}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Input 
                      type="password" 
                      name="password" 
                      id="password" 
                      placeholder="Password"
                      onChange={props.handleLoginChange} 
                      value={props.password} 
                    />
                  </FormGroup>
                </Col>
                <div className="row d-flex justify-content-around text-center mb-3">
                  <div className="col-6"><Button color="info" onClick={props.handleLogin}>Submit</Button></div>
                  <div className="col-6"><Button onClick={props.clearLogin}>Cancel</Button></div>
                </div>
                <div className="row d-flex justify-content-around text-center mb-3">
                  <div className="col-9 login-changeLogin">
                    <span><Link to="/register">Register as a new user</Link></span>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
}