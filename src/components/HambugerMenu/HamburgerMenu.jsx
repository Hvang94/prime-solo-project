import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

export default function Hamburger() {
  const isAdmin = useSelector((store) => store.user.admin);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="hamburger">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        🐼
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to="/home/">
          <MenuItem onClick={handleClose}>Home</MenuItem>
        </Link>

        {/* <Link to="/about/">
          <MenuItem onClick={handleClose}>About Me</MenuItem>
        </Link> */}

        <Link to="/Services/">
          <MenuItem onClick={handleClose}>Services</MenuItem>
        </Link>

        {isAdmin === true ? (
          <Link to="/AdminAppointment/">
            <MenuItem onClick={handleClose}>View Appointments</MenuItem>
          </Link>
        ) : (
          <Link to="/ClientAppointment/">
            <MenuItem onClick={handleClose}>View Appointments</MenuItem>
          </Link>
        )}

        <Link to="login">
          <MenuItem onClick={handleClose}>Login/Register</MenuItem>
        </Link>
        <LogOutButton />
      </Menu>
    </div>
  );
}
