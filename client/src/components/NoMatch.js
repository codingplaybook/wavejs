import React from 'react';
import { Link } from 'react-router-dom';

export function NoMatch(props){

  return(
    <div className="w-100 h-100 d-flex flex-wrap align-content-center justify-content-center">
      <div>
        <h1 className="text-center">404 Error</h1>
        <h3 className="text-center">Sorry! This page does not exist. :(</h3>
          <p className="text-center"><Link to='/'>Click here to return home</Link></p>
      </div>
    </div>
  );
}