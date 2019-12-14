import React from "react";

export default function CtrlSelect({ value, setValue, selectId, options,  children }) {
  const [head, ...tail] = options;
  
  return (
    <div className="input-field">
      <select id={selectId} onChange= {handleInput(setValue)} value={value} >
        <option value="" disabled defaultValue>{head}</option>
        {tail.map(optValue => (<option key={optValue} value={optValue}>{optValue}</option>))}
      </select>
      <label>{children}</label>
    </div>
  );

  function handleInput(setter) {
      return function save(e) {
          setter(e.target.value);
      }
  }

}