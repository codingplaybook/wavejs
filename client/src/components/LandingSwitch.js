import React, { Component } from 'react';

import feedImg from './../assets/feed-1.png';
import profile from './../assets/profile.png';

export class LandingSwitch extends Component{

  constructor(props){
    super(props);
    this.state = {
      switchName: "feed"
    }
    this.flipTheSwitch = this.flipTheSwitch.bind(this);
  }

  flipTheSwitch(value){
    this.setState({
      switchName: value
    });
  }

  render(){

    const theSwitch = (
      <ul className="landing-theSwitchList">
        <li 
          onClick={()=>this.setState({switchName:"feed"})}
          className={this.state.switchName === "feed" ? "switchActive" : null}>FEED & POSTS</li>
        <li 
          onClick={()=>this.setState({switchName:"profile"})}
          className={this.state.switchName === "profile" ? "switchActive" : null}>PROFILE</li>
      </ul>
    );

    const blockImgSrc = this.state.switchName === 'feed' ? feedImg : profile;

    const theBlock = {
      width:'100%',
      minHeight:'250px',
      maxHeight:'300px',
      backgroundImage:`url(${blockImgSrc})`,
      backgroundSize:'contain',
      backgroundPosition:'center'
    };

    return (
      <div className="w-100 row">
        <div className="col-4 d-none d-md-block">
          {theSwitch}
        </div>
        <div className="col-8 d-none d-md-block">
          <div style={theBlock} />
        </div>
      </div>
    );
  }
}