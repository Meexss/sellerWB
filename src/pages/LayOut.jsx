import React, {useRef} from 'react';
import {Outlet} from "react-router-dom";
import Header from "../component/Header/Header";
import classes from "./LayOut.module.css";
import Footer from "../component/Footer/Footer";
import ReactToPrint from "react-to-print";

const LayOut = () => {
    const ref = useRef()
    return (
        <div>
            <Header/>
            <ReactToPrint content={() => ref.current} trigger={() => <button className={classes.print}>Print</button>}/>
            <div className={classes.wrapper}></div>
            <div ref={ref} className={classes.wrapperOutlet}>
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default LayOut;