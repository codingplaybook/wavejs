import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { Feed } from './Feed';
import { Post } from './Post';
import { Profile } from './Profile';


export function ProtectedRoutes(props){

    return(
      <Switch>
        <Route exact path='/feed'>
          {
            props.isAuthenticated ?
            <Feed activeUser={props.user} /> : 
            <Redirect to='/login' />
          }
        </Route>
        <Route exact path='/post/'>
          <Redirect to='/feed'/>
        </Route>
        <Route exact path='/post/:link'>
        {
          props.isAuthenticated ?
          <Post activeUser={props.user} /> : 
          <Redirect to='/login' />
        }
        </Route>
        <Route path={`/profile/:username`}>
          {
            props.isAuthenticated ?
            <Profile 
            activeComponent="all"
            activeUser={props.user}
            logout={props.logout}
            /> : 
            <Redirect to='/login' />
          }
        </Route>
        <Route exact path={`/profile/:username/newpost`}>
          {
            props.isAuthenticated ?
            <Profile 
            activeUser={props.user}
            activeComponent="new"
            logout={props.logout}
            /> : 
            <Redirect to='/login' />
          }
        </Route>
      </Switch>
    );
}