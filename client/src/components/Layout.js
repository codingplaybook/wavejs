import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component{
  render(){
    return (
        <div className="h-100">
        <NavMenu 
        user={this.props.user} 
        isAuthenticated={this.props.isAuthenticated} 
        logout={this.props.logout}
        />
          <div className="h-100 pt-5 pb-3">
            {this.props.children}
          </div>
        </div>
    );
  }
}
