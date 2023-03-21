import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../component/Header/Header";
import classes from "./LayOut.module.css";
import Footer from "../component/Footer/Footer";

const LayOut = () => {
    return (
        <div>
            <Header/>
            <div className={classes.wrapper}></div>
            <div className={classes.wrapperOutlet}>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default LayOut;