import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

//https://codesandbox.io/s/react-bootstrap-table-next-basic-example-fsgk9
function SearchResults(property) {
  const providerDisplay = property.providerDisplay;
  const showPagination = property.showPagination;
  const { SearchBar } = Search;
  //Hidden columns are needed inorder to quick search to work
  //Please do not delete the id column which is unique identifier for the rows.
  const columns = [
    {
      dataField: "id",
      text: "row_id",
      hidden: true
    },
    {
      dataField: "prov_addr_str1",
      text: "prov_addr_str1",
      hidden: true
    },
    {
      dataField: "prov_addr_mail_city",
      text: "prov_addr_mail_city",
      hidden: true
    },
    {
      dataField: "prov_addr_mail_state",
      text: "prov_addr_mail_state",
      hidden: true
    },
    {
      dataField: "prov_addr_zip",
      text: "prov_addr_zip",
      hidden: true
    },
    {
      dataField: "prov_county",
      text: "prov_county",
      hidden: true
    },
    {
      dataField: "prov_phone",
      text: "prov_phone",
      hidden: true
    },
    {
      dataField: "prov_addr_email",
      text: "prov_addr_email",
      hidden: true
    },
    {
      dataField: "prov_specicialty",
      text: "prov_specicialty",
      hidden: true
    },
    {
      dataField: "prov_lang_capabilities",
      text: "prov_lang_capabilities",
      hidden: true
    },
    {
      text: "Provider",
      dataField: "prov_name",
      style: { "white-space": "unset" },
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
      dataField: "Information",
      text: "Information",
      style: { "white-space": "unset","word-wrap": "break-word" },
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <span>Speciality:</span>
          {row.prov_specicialty}
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
      dataField: "DHCP/PCP",
      text: "DHCP/PCP",
      style: { "white-space": "unset" },
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
      <ToolkitProvider
        keyField="id"
        data={providerDisplay}
        columns={columns}
        pagination={showPagination ? paginationFactory(options) : null}
        search
      >
        {props => (
          <div>
            <div className="form-group row">
              <label className="col-sm-4 col-md-4 col-lg-4 control-label">
                Search Something quickly from the results:
              </label>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <SearchBar {...props.searchProps} />
              </div>
            </div>
            {/* <ClearSearchButton {...props.searchProps} /> */}
            <BootstrapTable {...props.baseProps} />
          </div>
        )}
      </ToolkitProvider>
    </React.Fragment>
  );
}
export default SearchResults;
