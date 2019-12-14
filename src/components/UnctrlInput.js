import React from "react";

export default React.forwardRef(function UnctrlInput({type = "text", inputId, extraClasses = "", children }, ref) {
  return (
    <div className="input-field">
      <label htmlFor={inputId}>{children}</label>
      <input type={type} id={inputId} ref={ref} className={extraClasses}/>
    </div>
  );
});