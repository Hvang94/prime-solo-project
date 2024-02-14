import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Hamburger from "../HambugerMenu/HamburgerMenu";

function Nav() {
  return (
    <>
      <div className="nav">
        <Link to="/Home">
          {/* <h2 className="nav-title">The Glow Up Feature</h2> */}
          <img className="logo" src="images/logo.png" />
        </Link>
        <div>
          <Hamburger />
        </div>
      </div>
    </>
  );
}

export default Nav;
