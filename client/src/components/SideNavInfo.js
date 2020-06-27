import React from 'react';

export default function SideNavInfo(props) {
  return (
    <div className="col-md-4 d-none d-md-block h-100 pt-2 desktop-postSidebar">
      <div className="w-100 h-100 desktop-postSidebar-scroll">
        <h1 className="text-center">WaveJs</h1>
        <h5>What is it?</h5>
        <p>- Social Media Desktop & Mobile application -<br />Somewhat of a Twitter/Instagram hybrid, users can:</p>
        <ul>
          <li>Create user accounts</li>
          <li>Follow other users</li>
          <li>Create posts either text, photo, or both together</li>
          <li>Edit their profiles</li>
          <li>Like & Comment on other user posts</li>
        </ul>
        <p>Some other key features of the application include live updates for the current user (soon to feature cross-device live updating), and mobile friendly view!<br /><u>note:</u> Mobile view is based off device recongition. If you are on a laptop or computer, refresh your browser use the inspect/dev tools to have browser mimic mobile device.</p>
        <p>The app database refreshes to default posts every 24 hours depending on volume of test content, and more features will continue to be added.<br />All feedback at all is appreciated! Please feel free to contact <b>greenlight8004@gmail.com | subject: Wavejs</b></p>
        <p>Thank you!</p>
      </div>
    </div>
  );
} 