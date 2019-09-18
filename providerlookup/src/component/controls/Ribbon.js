import React from "react";

function Ribbon(props) {
  let controlType = props.controlType;
    return (    
   <React.Fragment>
     
       {props.labelText? (
      <div  className="row">
        <div className="col-sm-12 col-md-12 col-lg-12" style={{fontWeight:"bold"}}>
        <p className={controlType==="errorMessage"?"bg-danger text-white": "bg-primary text-white"}  style={{fontWeight:"bold"}}>&nbsp;{props.labelText}</p></div></div> 
       ) 
        :(null)}
     </React.Fragment>
    );
}
export default Ribbon;