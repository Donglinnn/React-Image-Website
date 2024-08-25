import React from "react";

// Styling of every pictures
const Picture = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p> {/* Show up photogragher */}
      <div className="imageContainer">
        <img src={data.src.large} alt="" />
      </div>
      <p>
        Download Picture Here:{" "}
        <a href={data.src.large} target="_blank">
          Download
        </a>
      </p>
    </div>
  );
};

export default Picture;
