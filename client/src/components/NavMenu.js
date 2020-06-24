import React, { Component } from 'react';
import axios from 'axios';

import { Button, Collapse, Container, UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, InputGroupText, Input, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './NavMenu.css';

import Home from '../assets/home.png';
// import Notifications from '../assets/notifications.png';
// import NewNotifications from '../assets/notifications-new.png';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
    this.state = {
      collapsed: true,
      searchError:null,
      isOpen: false,
      username:''
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleSearch(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
    fetch(`/users/profile/username/${this.state.username}`)
    .then(res => res.json())
    .then(res => {
      if(res){
        this.props.history.push(`/profile/${this.state.username}`)
        //return      <Redirect to={{pathname: `/profile/${this.state.username}`}}/>
      }
      else{
        this.setState({searchError:'User does not exist'})
      }
    })
    .catch(err => "Error searching for username: " + err);  
    }
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {

    const profileImgLink = this.props.user.image;

    const profileImg = this.props.user.image != null ? 
    (`${profileImgLink}`) : null;

    const profileCircle = {
      height: '25px',
      width: '25px',
      backgroundImage:`url(${profileImg})`,
      backgroundColor:'grey',
      borderRadius:'50%',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    const publicNav = (
      <ul className="navbar-nav flex-grow">
        <NavItem>
          <Link to='/login'>
          <Button color="info" className="mx-2 my-1">Log In</Button>
          </Link>
        </NavItem>
        <NavItem>
          <Link to='/register'>
          <Button color="danger" className="mx-2 my-1">Sign Up</Button>
          </Link>
        </NavItem>
      </ul>
    );

    const authenticatedNav = (
      <ul className="navbar-nav flex-grow">
        {/*<NavItem className="mr-2">
          <Input 
          type="text" 
          name="username" 
          id="username" 
          onChange={this.handleSearch} 
          placeholder="Search username"
          onKeyDown={this._handleKeyDown} 
          />
        </NavItem>*/}
        {/*<UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>
            Messages
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>{this.state.userName}</DropdownItem>
            <DropdownItem><NavLink tag={Link} className="text-dark" to="/home ">message here!</NavLink></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><NavLink tag={Link} className="text-dark" to="/home">message here!</NavLink></DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>*/}
        <NavItem className="d-flex flex-wrap align-content-center">
            <Link to={{
              pathname: `/profile/${this.props.user.username}`,
              change: {
                activeComponent: 'new'
              }
            }}>
              <button type="button" className="btn btn-outline-primary btn-sm"><b>+New Post</b></button>
            </Link>
        </NavItem>
        {/*<UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>
            <img src={NewNotifications} alt="notifications" style={profileCircle}/>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>{this.props.user.username}</DropdownItem>
            <DropdownItem><NavLink tag={Link} className="text-dark" to="/profile">My Profile</NavLink></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><NavLink tag={Link} className="text-dark" to="/home"><b>Log Out</b></NavLink></DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>*/}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>
            <div style={profileCircle}/>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>{this.props.user.username}</DropdownItem>
            <DropdownItem><NavLink tag={Link} className="text-dark" to={`/profile/${this.props.user.username}`}>My Profile</NavLink></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><span className="text-dark" onClick={this.props.logout}><b>Log Out</b></span></DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ul>
    );

    return(
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 fixed-top bg-white" light>
          <Container>
            <NavbarBrand tag={Link} to="/"><img src={Home} alt="home" className="mx-2 nav-home" />Wave Js</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <Nav>
              {this.props.isAuthenticated === true ? authenticatedNav : publicNav}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}