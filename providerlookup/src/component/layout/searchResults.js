import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
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
        <div>
          <span>{row.prov_name}</span>
          <br />
          <span> {row.prov_addr_str1}</span>
          <br />
          <span>
            {row.prov_addr_mail_city},{row.prov_addr_mail_state}{" "}
            {row.prov_addr_zip}{" "}
          </span>
          <br />
          <span>County : </span>
          <span>
            {row.prov_county}
            <br />
          </span>
          <span>Phone : </span>
          {row.prov_phone}
          <br />
          <span>Email : {row.prov_addr_email}</span>
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
          <span>Speciality:</span>
          <span> {row.prov_specicialty}</span>
          <br />
          <span>
            Linguistic capabilities:
            {row.prov_lang_capabilities}
          </span>
          <br />

          <span>Accepting new Patients: </span>
          <span>{row.prov_new_patient}</span>
        </div>
      )
    },
    {
      dataField: "prov_dhcp",
      text: "DHCP/PCP",
      sort: true,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <span>DHCP: </span> {row.prov_dhcp}
          <br />
          <span>PCP: </span> {row.prov_pcp}
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
    <BootstrapTable
    bootstrap4
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
