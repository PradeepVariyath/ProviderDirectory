import React from "react";

function TextBoxControl(props) {
  return (
    <div class="form-group row">
      <label class="col-sm-2 control-label">{props.labelText}</label>
      <div class="col-sm-6 col-lg-10">
        <input
          type="Search"
          placeHolder={props.placeHolder}
          value={props.Value}
          onChange={props.onChange}
          class="form-control"
          style={{ texttransform: "uppercase" }}
        />
      </div>
    </div>
  );
}
export default TextBoxControl;
