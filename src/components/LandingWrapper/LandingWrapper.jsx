import React from "react";
import Navbar from "../Navbar/Navbar";
import PropTypes from "prop-types";

const LandingWrapper = ({ children }) => {
  return (
    <div className="relative w-full h-full min-h-lvh bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navbar />
      {children}
    </div>
  );
};

LandingWrapper.propTypes = {
    children: PropTypes.node,
  };

export default LandingWrapper;
