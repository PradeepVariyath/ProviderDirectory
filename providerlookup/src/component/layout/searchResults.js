import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";

function SearchResults(props) {
  const providerDisplay = props.providerDisplay;
  const showPagination = props.showPagination;

  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

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
      sort: true,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <h6>
            {" "}
            <small>{row.prov_name}</small>
          </h6>
          <h6>
            {" "}
            <small>{row.prov_addr_str1}</small>
          </h6>
          <h6>
            <small>
              {row.prov_addr_mail_city},{row.prov_addr_mail_state}{" "}
              {row.prov_addr_zip}{" "}
            </small>
          </h6>
          <h6>
            County : <small> {row.prov_county}</small>
          </h6>
          <h6>
            Phone :{" "}
            <small>
              <a href={'tel:' + row.prov_phone}>{row.prov_phone}</a>
            </small>
          </h6>
          <h6>
            Email : <small>{row.prov_addr_email}</small>
          </h6>
        </div>
      )
    },
    {
      dataField: "prov_specicialty",
      text: "Information",
      sort: true,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <h6>
            Speciality: <small>{row.prov_specicialty}</small>
          </h6>
          <h6>
            Secondary Language: <small> {row.prov_lang_capabilities}</small>
          </h6>
          <h6>
            Accepting New Patients: <small> {row.prov_new_patient}</small>
          </h6>
        </div>
      )
    },
    {
      dataField: "prov_dhcp",
      text: "Provider Use Only",
      sort: true,
      hidden: windowWidth < 500 ? true : false,
      formatter: (cell, row, rowIndex, extraData) => (
        <div className="d-none d-sm-table-cell">
          <h6>
            DHCP : <small>{row.prov_dhcp}</small>
          </h6>
          <h6>
            PCP : <small>{row.prov_pcp}</small>
          </h6>
        </div>
      )
    }
  ];

  const options = {
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
  };

  return (
    <React.Fragment>
      <BootstrapTable
        bootstrap4
        id={id}
        keyField={id}
        data={providerDisplay}
        columns={columns}
        pagination={showPagination ? paginationFactory(options) : null}
        filter={filterFactory()}
      />
    </React.Fragment>
  );
}
export default SearchResults;
