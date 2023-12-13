import React from "react";
import FooterPic from "../img/Powered_By_Enphase_Logo_RGB.png";
import GreenLink from "../img/Greenlink-Energy-Solutions-Logo.svg";
const Footer = () => {
  return (
    <footer className="footer">
      <img className="el" src={FooterPic} alt="Enphase Logo" />
      <img className="gll" src={GreenLink} alt="Greenlink Energy Logo" />
    </footer>
  );
};

export default Footer;
