import React from "react";
import brain from "./Brain.png";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="flex justify-between items-center">
        <div className="ma3 br4" style={{ backgroundColor: "white" }}>
          <img
            style={{ width: "auto", height: "4.6rem" }}
            className="br4"
            src={brain}
            alt="Logo"
          />
        </div>
        <button
          onClick={() => onRouteChange("signIn")}
          className="f3 link dim dib white bg-black pointer br4 pa3 mh3">
          Sign Out
        </button>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-between items-center">
        <div className="ma3 br4" style={{ backgroundColor: "white" }}>
          <img
            style={{ width: "auto", height: "4.6rem" }}
            className="br4"
            src={brain}
            alt="Logo"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => onRouteChange("signIn")}
            className="f3 link dim dib white bg-black pointer br4 pa3 mh3">
            Sign in
          </button>
          <button
            onClick={() => onRouteChange("Register")}
            className="f3 link dim dib white bg-black pointer br4 pa3 mh3">
            Register
          </button>
        </div>
      </nav>
    );
  }
};

export default Navigation;
