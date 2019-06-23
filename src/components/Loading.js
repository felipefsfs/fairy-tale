import React from "react";

export default function Loading({size}) {
  return (
    <div className={`preloader-wrapper active
      ${size === "big" || size}
      ${size === "small" || size}
    `}>
      <div className="spinner-layer">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}