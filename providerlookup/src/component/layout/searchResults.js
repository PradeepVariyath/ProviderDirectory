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
            <span class="bluebold">County : </span>
            <span>
              {" "}
              <i>{row.original.prov_county}</i>
              <br />
            </span>
            <span class="bluebold">Phone : </span>
            <a href="#">{row.original.prov_phone}</a>
            <br />
            <span class="bluebold">Email : {row.original.prov_addr_email}</span>
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
            <span class="bluebold">Speciality:</span>
            {row.original.prov_specicialty}
            <br />
            <span class="bluebold">
              Linguistic capabilities:
              {row.original.prov_lang_capabilities}
            </span>
            <br />

            <span class="bluebold">Accepting new Patients: </span>
            <span
              style={{
                color: row.original.prov_new_patient === "Yes" ? "Green" : "Red"
              }}
            >
              {row.original.prov_new_patient}
            </span>
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
            <span class="bluebold">DHCP: </span> {row.original.prov_dhcp}
            <br />
            <span class="bluebold">PCP: </span> {row.original.prov_pcp}
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
