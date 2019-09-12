import React from "react";

function TextBoxControl(props) {
  return (
    <div className="form-group row">
      <label className="col-sm-2 control-label">{props.labelText}</label>
      <div className="col-sm-6 col-lg-10">
        <input
          type="search"
          placeholder={props.placeholder}
          value={props.Value}
          onChange={props.onChange}
          className="form-control"
          style={{ texttransform: "uppercase" }}
        />
      </div>
    </div>
  );
}
export default TextBoxControl;
