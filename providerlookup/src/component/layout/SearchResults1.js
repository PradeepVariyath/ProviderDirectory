import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

function SearchResults1(props) {
  const providerDisplay = props.providerDisplay;
  const columns = [
    {
      dataField: "prov_name",
      text: "prov_name"
    },
    {
      dataField: "provname",
      text: "Provider",
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
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <span>DHCP: </span> {row.prov_dhcp}
          <br />
          <span>PCP: </span> {row.prov_pcp}
        </div>
      )
    }
  ];

  const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
    <li key={text} role="presentation" className="dropdown-item">
      <a
        href="#"
        tabIndex="-1"
        role="menuitem"
        data-page={page}
        onMouseDown={e => {
          e.preventDefault();
          onSizePerPageChange(page);
        }}
        style={{ color: "red" }}
      >
        {text}
      </a>
    </li>
  );

  const options = {
    sizePerPageOptionRenderer
  };
  return (
    <BootstrapTable
      id="prov_name"
      keyField="Information"
      data={providerDisplay}
      columns={columns}
      pagination={paginationFactory(options)}
    />
  );
}
export default SearchResults1;
