import React from 'react';
import { assets } from '../../assets/assets';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-left">
          <img src={assets.logo} alt="DailyCrave Logo" />
          <p>DailyCrave is for your cravings, comfort, and convenience. We serve deliciousness, all day long — just one tap away.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91 63003 06929</li>
            <li>rathika369yadav@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className='footer-copyright'>
        Copyright 2025 © DailyCrave. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
