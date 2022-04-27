import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, boxes }) => {
  return (
    <div className="center ma extended">
      <div className="absolute mt2 div-center">
        <img
          id="inputimage"
          src={imageURL}
          alt=""
          width="500px"
          height="auto"
        />
        {boxes.map((box, i) => {
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
