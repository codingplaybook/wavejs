import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';

import MobileSinglePost from './mobile-views/MobileSinglePost';
import DesktopSinglePost from './desktop-views/DesktopSinglePost';


export class SinglePost extends Component {
  static displayName = SinglePost.name;

  render () {

    const renderContent = () => {
      if(isMobile) {
        return <MobileSinglePost />
      }
      /*else if(isTablet) {
        return <div>Tablet</div>
      }*/
      else {
        return <DesktopSinglePost />
      }
    }
    return renderContent();
  }
}