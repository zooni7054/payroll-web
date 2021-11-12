import React from 'react';
import '../App.css';

import {adminUrls} from '../utils/urls';

import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <h3>Logo</h3>
      <ul>
          <Link to={`${adminUrls.Homee}`}>
          <li>Home</li>
          </Link>
          <Link to={`${adminUrls.About}`}>
          <li>About</li>
          </Link>
          <Link to={`${adminUrls.Shop}`}>
          <li>Shop</li>
          </Link>
      </ul>
    </nav>
  );
}

export default Nav;
