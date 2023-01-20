import React from "react";
import "../infoBox/InfoBox.scss";

const InfoBox = ({ bgColor, title, count, icon }) => {       /* all these four properties are different in the upperportion of the dashboard so we make them dynamic and then will give them different values passing props in the component */
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text">
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};

export default InfoBox;
