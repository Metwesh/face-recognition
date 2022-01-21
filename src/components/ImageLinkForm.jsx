import React from "react";
import "./carbon.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This magic brain will detect faces in your pictures. Give it a try!"}
      </p>
      <div className="center">
        <div className="pa4 br3 shadow-5 center carbon w-70">
          <input
            className="f4 pa2 w-50 center br4"
            placeholder="Input image link here"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-20 dim f4 link ph3 pv2 dib white bg-light-purple pointer br4 mh3"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
