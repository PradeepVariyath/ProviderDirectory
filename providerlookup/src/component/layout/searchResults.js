import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

function SearchResults(props) {
  const providerDisplay = props.providerDisplay;
  const defaultPageSize = props.defaultPageSize;
  const HeaderClassName = props.headerClassName;
  const showPagination = props.showPagination;
  const reactTableCell = props.reactTableCell;

  const TheadComponent = props => null;
  const columns = [
    {
      Header: "Provider",
      fixed: "left",
      style: { "white-space": "unset" },
      Cell: row => {
        return (
          <div className={reactTableCell}>
            <span id="provname">{row.original.prov_name}</span>
            <br />
            {row.original.prov_addr_str1}
            <br />
            {row.original.prov_addr_mail_city},
            {row.original.prov_addr_mail_state} {row.original.prov_addr_zip}
            <br />
            <span>County : </span>
            <span>
              {" "}
              {row.original.prov_county}
              <br />
            </span>
            <span>Phone : </span>
            {row.original.prov_phone}
            <br />
            <span>Email : {row.original.prov_addr_email}</span>
          </div>
        );
      }
    },
    {
      Header: "Information",
      accessor: "",
      fixed: "left",
      style: { "white-space": "unset" },
      Cell: row => {
        return (
          <div className={reactTableCell}>
            <span>Speciality:</span>
            {row.original.prov_specicialty}
            <br />
            <span>
              Linguistic capabilities:
              {row.original.prov_lang_capabilities}
            </span>
            <br />

            <span>Accepting new Patients: </span>
            <span>{row.original.prov_new_patient}</span>
          </div>
        );
      }
    },
    {
      Header: "DHCP/PCP",
      accessor: "",
      fixed: "right",
      className: "ReactColumn",
      style: { "white-space": "unset" },
      Cell: row => {
        return (
          <div className={reactTableCell}>
            <span>DHCP: </span> {row.original.prov_dhcp}
            <br />
            <span>PCP: </span> {row.original.prov_pcp}
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <ReactTable
        data={providerDisplay}
        style
        columns={columns}
        minRows={0}
        showPagination={showPagination}
        defaultPageSize={defaultPageSize}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  );
}
export default SearchResults;
