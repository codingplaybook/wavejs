import React, { Component } from 'react';
import SimpleCRM from '../assets/Simple-CRM.png';
import SampleImg from '../assets/sample-portfolio-img.png';
import NaviFree from '../assets/navifree-1300x650.jpg';
import LinkedIn from '../assets/linkedin-black.png';
import Github from '../assets/GitHub-Mark-fix.png';
import jumbotronImg from '../assets/jumbotron-1.png';
import { LandingSwitch } from './LandingSwitch';

import { Link } from 'react-router-dom';
//import { ApplicationPaths } from './api-authorization/ApiAuthorizationConstants';

export function Landing(props){
  const landingFeedPic = {
    backgroundImage:`url('${jumbotronImg}')`,
    backgroundSize:'contain',
    backgroundPosition:'center',
    width: '80%',
    minHeight:'325px',
    maxHeight:'400px',
    boxShadow: '6px -6px 10px #d9d9d9'
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto col-xs-12 pt-5 landingHeading">
          <h1 className="mb-5 ">Wave Js<br />A Social Media App!</h1>
        </div>
        <div className="col-md-8 mx-auto col-xs-12 mb-5 landingHeading">
          <h5>Click Below To Enter</h5>
          <div className="w-100">
              <Link to='/login'>
                <button type="button" className="btn btn-info btn-lg mr-3">Log In</button>
              </Link>
              <Link to='/register'>
                <button type="button" className="btn btn-danger btn-lg ml-3">Sign Up</button>
              </Link>
          </div>
          <h5>Scroll Below for More</h5>
        </div>
        <div className="col-12 my-5 landingFeedPic">
          <div className="w-100 d-flex justify-content-center">
            <div style={landingFeedPic}/>
          </div>
        </div>
        <div className="col-12">
          <p>Wave Js is a Social Media Web Application designed to be compatible on both desktop and mobile devices. Allowing users the ability to create profiles, upload posts of both text and images, as well as view & interact with other user's posts. Created as a full custom MERN Stack Web Application.</p>
        </div>
        <div className="col-12 mb-5 landingPreFooter">
          <LandingSwitch />
        </div>
        <div className="col-md-6 col-sm-12 mb-5 px-5 d-flex flex-wrap align-content-center">
          <div>
          <span>Sample Work - PSD Template</span>
          <h5>NaviFree is a Mobile Application</h5>
          <p>PSD template for a full stop travel application similar to Kayak, Hopper, Priceline an AirBnb.</p>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 mb-5 d-flex justify-content-center align-items-center landingSix"><img src={NaviFree} alt="NaviFree"/></div>
        <div className="col-md-6 col-sm-12 mb-5 d-flex justify-content-center align-items-center landingSix">
          <a href="https://my-simple-node.herokuapp.com/"><img src={SimpleCRM} alt="SimpleCRM" /></a>
        </div>
        <div className="col-md-6 col-sm-12 mb-5 px-5 d-flex flex-wrap align-content-center">
          <div>
          <span>Sample Work - Web Application</span>
          <h5>Simple CRM is a Ticketing Service </h5>
          <p>Web Application deisgned to allow users to create new support ticket issues which can be tracked, modified, and assigned to different support role members. Support members can also create tickets for users while adding comments and updating statuses.</p>
          </div>
        </div>
        {/*<div className="col-12 d-flex justify-content-center align-items-center landingPreFooter"><h5>Replace image later...</h5></div>*/}
        {/*<div className="col-12 mb-5 landingPreFooter">
          <img src={BenefitsImg} alt="SimpleCRM" />
          </div>*/}
        {/* Footer*/}
        <div className="row w-100 mx-auto py-5 landingFooter">
          <div className="col-md-8 col-12 mx-auto">
            <div className="w-100 mx-auto row">
              <div className="col-6"><span><b>&copy;Adrian Townsend 2020</b></span></div>
              <div className="col-6"><a href="https://www.linkedin.com/in/adrianrtownsend" rel="noopener noreferrer" target="_blank"><img src={LinkedIn} alt="LinkedIn" />My LinkedIn</a></div>
              <div className="col-6">Design Credit: <a rel="noopener noreferrer" target="_blank" href="https://dribbble.com/pawelkadysz">Pawel Kadysz</a></div>
              <div className="col-6"><a href="https://github.com/adrianrtownsend/" rel="noopener noreferrer" target="_blank"><img src={Github} alt="github" />My Github</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
