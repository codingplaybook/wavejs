import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect, withRouter } from 'react-router';
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import history from './history';
import { Layout } from './components/Layout';

import { Landing } from './components/Landing';
import { Login } from './components/Login';
import { Register } from './components/Register';

import { ProtectedRoutes } from './components/ProtectedRoutes';

import './App.css';
import './custom.css';

class App extends Component {
  static displayName = App.name;

  constructor(props){
    super(props);
    this.state = {
      user:'',
      username:'',
      password:'',
      loginError:null,
      token:null,
      isAuthenticated: false,
      myDoor:''
    }
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.clearLogin = this.clearLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.registerSuccessful = this.registerSuccessful.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      // navigated!
      localStorage.setItem('myDoor', this.props.location.pathname);
      console.log(localStorage.getItem('myDoor', this.props.location.pathname));
    }
  }

  componentDidMount(){
    if(!this.state.user || !this.state.username){
      if(this.state.isAuthenticated){
        this.logout();
      }
    }
    console.log('user auth? ' + localStorage.getItem('isAuthenticated'));
    const thisUser = JSON.parse(localStorage.getItem('user'));
    const thisDoor = localStorage.getItem('myDoor');
    if(localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('user')) {
      this.setState({ 
        user:thisUser
      }, 
        ()=>this.setState({
          isAuthenticated:localStorage.getItem('isAuthenticated')},
          ()=>console.log('user = ' + this.state.isAuthenticated)
          )
        );
    }
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      localStorage.setItem('myDoor',this.setState({myDoor: location.pathname},()=>console.log('myDoor: ' + this.state.myDoor)));
    });
  }

  componentWillUnmount() {
      this.unlisten();
  }

  handleLoginChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  kickUser(){
   this.setState({
     username:'',
     user:'',
     password:'',
     loginError:null,
     isAuthenticated:false
   }) 
  }

  resetTimeOut(){
    //used to reset timeout time limit
  }

  handleLogin(e){
    /* 
    1)check login
    2)clear password
    3)route to profile
    */
    e.preventDefault();
    axios.post(`/users/login/`,{
      username:this.state.username,
      password:this.state.password
    })
    .then(res => {
      this.setState({
        user:res.data.user,
        username:'',
        password:'',
        isAuthenticated:res.data.isAuthenticated,
        token:res.data.token
      },()=>{
        localStorage.setItem('user',JSON.stringify(res.data.user));
        localStorage.setItem('isAuthenticated',res.data.isAuthenticated);
        console.log('the user' + this.state.user);
      });
    })
    .catch(err => {
      this.setState({
        loginError:"Invalid Username/Password"
      });
      console.log("Error logging in: " + err);
    });
  }

  clearLogin(){
    this.setState({
      username:'',
      password:''
    })
  }

  logout(){
    this.setState({
      user:'',
      username:'',
      token:null,
      isAuthenticated:false
    },()=>localStorage.clear());
  }

  registerSuccessful(value){
    this.setState({
      user:value,
      username:'',
      password:'',
      isAuthenticated:true
    },()=>{console.log("Register Successful: " + this.state.user)})
  }

  render () {
    return (
      <Layout
      user={this.state.user} 
      isAuthenticated={this.state.isAuthenticated}
      logout={this.logout}
      >
        {/* Public Routes */}
        <Route exact path='/'>
          {this.state.isAuthenticated ?
            <Redirect to='/feed' />
            : <Landing />}
        </Route>
        <Route exact path='/login'>
        {this.state.isAuthenticated ? 
          <Redirect to={`/profile/${this.state.user.username}`} /> 
          :
          <Login 
            username={this.state.username}
            password={this.state.password}
            handleLoginChange={this.handleLoginChange}
            handleLogin={this.handleLogin}
            clearLogin={this.clearLogin}
            loginError={this.state.loginError}
          />
        }
        </Route>
        <Route exact path='/register'>
          <Register 
            registerSuccessful={this.registerSuccessful}
          />
        </Route>
       <ProtectedRoutes
       isAuthenticated={this.state.isAuthenticated}
       user={this.state.user}
       logout={this.logout}
       />
      </Layout>
    );
  }
}

export default withRouter(App);