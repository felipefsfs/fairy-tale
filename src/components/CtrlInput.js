import React from "react";

export default function CtrlInput({ value, setValue, type = "text", inputId, children }) {
  return (
    <div className="input-field">
      <label htmlFor={inputId}>{children}</label>
      <input type={type} id={inputId} onChange= {handleInput(setValue)} value={value} />
    </div>
  );

  function handleInput(setter) {
      return function save(e) {
          setter(e.target.value);
      }
  }

}