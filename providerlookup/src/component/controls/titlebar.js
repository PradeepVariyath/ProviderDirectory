import React from "react";

function TitleBar(props) {
    return (
      <div  className="row">
        <div className="col-sm-12 col-md-12 col-lg-12" >
        <p className="bg-primary text-white"  style={{height:"30px",fontWeight:"bold"}}>{props.labelText}</p></div></div>  
    );
}
export default TitleBar;