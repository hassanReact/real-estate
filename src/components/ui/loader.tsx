import React from "react";

const Loader = () => {
  return (
    <div className="relative w-12 h-12 transform rotate-45 perspective-1000 rounded-full">
      <div className="absolute top-0 left-0 w-full h-full rounded-full animate-spin loader-before"></div>
      <div className="absolute top-0 left-0 w-full h-full rounded-full animate-spin loader-after"></div>
    </div>
  );
};

export default Loader;
