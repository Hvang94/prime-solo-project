import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import Hamburger from "../HambugerMenu/HamburgerMenu";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <div className="nav">
        {/* <img className="logo" src="images/logo.png" /> */}
        <Link to="/home">
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
