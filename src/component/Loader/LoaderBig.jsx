import React from 'react';
import classes from "./LoaderBig.module.css";

const LoaderBig = ({children}) => {
    return (
        <div className="lds-dual-ring"></div>
    );
};

export default LoaderBig;