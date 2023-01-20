import React from "react";
import loaderImg from "../../assets/loader.gif";
import ReactDOM from "react-dom";
import "./Loader.scss";

/* we are implementing 2 types of loaders, the first one is the fullscreen loader for when someone in logging in aur updating */
const Loader = () => {
  return ReactDOM.createPortal(               /* Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component(i.e) root, so "loader" div is outside the root(check in html file) so we use portals.. if we do not use this and simply render it to the loader, there may be problems sometimes that loader will not work comletely or work on half screen,, create portal takes 2 args 1st is the child which we want to render and the second is the parent under which we want to render */
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

/* the second is when someone is searching for products from the databse    */
export const SpinnerImg = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="Loading..." />
    </div>
  );
};

export default Loader;
