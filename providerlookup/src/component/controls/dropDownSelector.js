import React from "react";

function DropDownSelector(props) {
  const onChange = props.onChange;
  const { options } = props;

  return (
    <div className="form-group row">
      <label className="col-sm-2 control-label">{props.labelText}</label>
      <div className="col-sm-6 col-lg-10">
        <select onChange={onChange}   key={props.value} value={props.value} className="form-control">
          <option key="0" value="0">
            {props.defaultText}
          </option>
          {options.map(obj => (
            <option key={obj.value} value={obj.value}>
              {obj.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DropDownSelector;
