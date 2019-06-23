import React, { Fragment } from "react";

export default function SubmitButton({ message, extraClasses, children }) {
  return (
    <Fragment>
      <div className="input-field">
        <button className={"btn " + (extraClasses || "primary waves-effect waves-light")}>
          {children}
        </button>
      </div>
      <p className="red-text">{message}</p>
    </Fragment>
  );
}