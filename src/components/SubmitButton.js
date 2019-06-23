import React, { Fragment } from "react";
import Loading from "./Loading";

export default function SubmitButton({ message, extraClasses, disabled, loading_indc, children }) {
  return (
    <Fragment>
      <div className="input-field">
        <button className={`btn
        ${extraClasses || "primary waves-effect waves-light"}
        ${(loading_indc && "hidden") || ""}
        ${(disabled && "disabled") || ""}
        `}>
          {children}
        </button>
      </div>
      {(loading_indc && (<Loading size="small"/>))}
      <p className="red-text">{(!loading_indc && message) || ""}</p>
    </Fragment>
  );
}