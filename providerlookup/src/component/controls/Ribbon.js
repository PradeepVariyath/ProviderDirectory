import React from "react";

function Ribbon(props) {
  let controlType = props.controlType;
  return (
    <React.Fragment>
      {props.labelText ? (
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 font-weight-bold p-2">
            <p
              className={
                controlType === "errorMessage"
                  ? "bg-danger text-white display-block p-2"
                  : "bg-primary text-white display-block p-2"
              }
            >
              &nbsp;{props.labelText}
            </p>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default Ribbon;
