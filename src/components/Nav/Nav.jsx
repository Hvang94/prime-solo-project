import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

function Nav() {
  const isAdmin = useSelector((store) => store.user.admin);
  return (
    <>
      <div className="nav">
        <Link to="/Home">
          <img className="logo" src="images/logo.png" />
        </Link>
        
        <Link className="navLink" to="/Home">
          HOME
        </Link>
        <Link className="navLink" to="/Services">
          SERVICES
        </Link>
        {isAdmin === true ? (
          <Link className="navLink" to="/AdminAppointment/">VIEW APPOINTMENTS</Link>
        ) : (
          <Link className="navLink" to="/ClientAppointment/">VIEW APPOINTMENTS</Link>
        )}
        <Link className="navLink" to="login">LOGIN/REGISTER</Link>
        <LogOutButton className="navLink" />
      </div>
    </>
  );
}

export default Nav;
