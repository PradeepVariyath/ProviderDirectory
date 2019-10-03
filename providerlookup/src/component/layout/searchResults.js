import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
//import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from 'react-bootstrap-table2-filter';
//https://codesandbox.io/s/react-bootstrap-table-next-basic-example-fsgk9

function SearchResults(props) {
  const providerDisplay = props.providerDisplay;
  const showPagination = props.showPagination;
  const id = props.id;
  const columns = [
    {
      dataField: "id",
      text: "id",
      sort: true,
      hidden: true
    },
    {
      dataField: "prov_name",
      text: "Provider",
      sort:true,
      formatter: (cell, row, rowIndex, extraData) => (
        <div  >
            <h6> <small>{row.prov_name}</small></h6>   
            <h6> <small>{row.prov_addr_str1}</small></h6>    
        
            <h6><small>
            {row.prov_addr_mail_city},{row.prov_addr_mail_state}{" "}
            {row.prov_addr_zip}{" "}
            </small></h6> 
          <h6>County : <small> {row.prov_county}</small></h6>
          <h6>Phone :  <small>{row.prov_phone}</small></h6>
          <h6>Email :  <small>{row.prov_addr_email}</small></h6>         
        </div>
      )
      //formatExtraData: this.state.count
    },
    {
      dataField: "prov_specicialty",
      text: "Information",
      sort: true,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
           <h6>Speciality: <small>{row.prov_specicialty}</small></h6>          
           <h6>Linguistic capabilities: <small> {row.prov_lang_capabilities}</small></h6>          
           <h6>Accepting new Patients: <small> {row.prov_new_patient}</small></h6> 
        </div>
      )
    },
    {
      dataField: "prov_dhcp",
      text: "DHCP/PCP",
      sort: true,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
           <h6>DHCP :  <small>{row.prov_dhcp}</small></h6>     
           <h6>PCP :  <small>{row.prov_pcp}</small></h6>    
        </div>
      )
    }
  ];

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
  };

 
  return (
    <React.Fragment>
    <BootstrapTable    bootstrap4
      id={id}
      keyField="id"
      data={providerDisplay}
      columns={columns}
      pagination={showPagination ? paginationFactory(options) : null}
      filter={ filterFactory() }
    />
    </React.Fragment>
  );
}
export default SearchResults;
