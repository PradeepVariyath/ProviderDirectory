import React from "react";

function TextBoxControl(props) {
  let controlfocus=props.controlfocus;
  return (
    <div className="form-group row" style={{ "marginLeft":"10px","marginRight":"10px"}}>
      <div className="col-sm-2 col-md-2 col-lg-3">
        <label className="control-label text-type-bold" ><b>{props.labelText}</b></label>
        </div>
      <div className="col-sm-10 col-md-10 col-lg-9">
        <input
          type="input"
          placeholder={props.placeholder}
          value={props.Value.toUpperCase()}
          onChange={props.onChange}
          className="form-control"
          style={{ texttransform: "uppercase" }}       
          ref={controlfocus?x => x && x.focus():null}
          autoComplete="On"
        />
      </div>
    </div>
  );
}
export default TextBoxControl;
