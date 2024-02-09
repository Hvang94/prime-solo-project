import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Hamburger from '../HambugerMenu/HamburgerMenu';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">The Glow Up Feature</h2>
      </Link>
      <div>

       <Hamburger/>

      </div>
    </div>
  );
}

export default Nav;
