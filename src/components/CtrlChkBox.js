import React from "react";

export default function CtrlChkBox({ value, setValue, inputId, children }) {
  return (
    <p className="checkbox-holder">
      <label htmlFor={inputId}>
        <input type="checkbox" className="filled-in" id={inputId} onChange={handleInput(setValue)} checked={value}/>
        <span>{children}</span>
      </label>
    </p>
  );
  function handleInput(setter) {
      return function save(e) {
          setter(e.target.checked);
      }
  }

}