import React from "react";

function DropDownSelector(props) {
  const onChange = props.onChange;
  const { options } = props;

  return (
    <div className="form-group row " style={{ marginLeft:"10px",marginRight:"10px"}}>
      <label className="col-sm-2 control-label"><b >{props.labelText}</b></label>
      <div className="col-sm-6 col-lg-10">
        <select onChange={onChange}   key={props.value} value={props.value} className="form-control">
          <option key="0" value="0">
            {props.defaultText}
          </option>
          {options.map((obj, index) => (
            <option key={index} value={obj.value}>
              {obj.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DropDownSelector;
