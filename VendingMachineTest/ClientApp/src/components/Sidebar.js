import React from "react";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
const Sidebar = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.sidebar__container}>
        <ul className={classes.sidebar__list}>
          <NavLink className={classes.row} to="/user">
            <span>User</span>
          </NavLink>
          <NavLink className={classes.row} to="/admin">
            <span>Admin panel</span>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
