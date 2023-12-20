import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header/Header";
import classes from "./LayOut.module.css";
import Footer from "../component/Footer/Footer";

const LayOut = () => {
  const ref = useRef();
  return (
    <div>
      <Header />
      <div ref={ref} className={classes.wrapperOutlet}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayOut;
