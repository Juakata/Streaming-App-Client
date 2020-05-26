import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => (
  <header className="ui secondary pointing menu">
    <Link to="/" className="item">StreamingApp</Link>
    <div className="right menu">
      <Link to="/" className="item">All Streams</Link>
      <GoogleAuth />
    </div>
  </header>
);

export default Header;
