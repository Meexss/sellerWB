import React from 'react';
import classes from "./Header.module.css";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={classes.wrapper}>
            <Link to={'/'} className={classes.text}>WB</Link>
        </div>
    );
};

export default Header;