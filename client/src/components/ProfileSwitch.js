import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export default function ProfileSwitch(props){

  let { profileId } = useRouteMatch();

  return ( 
    <div className="w-100 h-100">
      <h1>{profileId}</h1>
      <h1>But you can see me</h1>

      <h1>{profileId}</h1>
      <h1>But you can see me</h1>

      <h1>{profileId}</h1>
      <h1>But you can see me</h1>

      <h1>{profileId}</h1>
      <h1>But you can see me</h1>
    </div>
  );

}