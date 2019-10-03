import React, { useState, useEffect } from "react";
import axios from "axios";
import Ribbon from "../controls/Ribbon";
import SearchResults from "./searchResults";
import Header from "./header";
import { Button } from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";
import Loader from "react-loader-spinner";

function SearchCritirea() {
  //Set the States for initializing the search controls
  const [providerName, SetProviderName] = useState("BACHAR");
  const [city, SetCity] = useState("");

  const initialSpecialtyValue = [
    { value: "0", label: "--- Select A Speciality ---" }
  ];
  const [specialtySelected, SetSpecialtySelected] = useState(
    initialSpecialtyValue[0].value
  );
  const [specialtys, SetSpecialtys] = useState([initialSpecialtyValue]);

  const initialCountyValue = [
    { value: "0", label: " --- Select A County --- " }
  ];
  const [county, SetCounty] = useState(initialCountyValue);
  const [countySelected, SetCountySelected] = useState(
    initialCountyValue[0].value
  );
  //Set Error Message
  const [errorMessage, SetErrorMessage] = useState("");
  //Set visibility for Header text and Search Result table
  const [visibleSearchResult, SetVisibleSearchResult] = useState(false);
  const [visibleHeaderText, SetVisibleHeaderText] = useState(true);
  //Data Fetched on Search button click
  const initialSearchValue = [{}];
  const [providerDisplay, SetProviderDisplay] = useState(initialSearchValue);
  const [searchUrl, SetSearchUrl] = useState("");
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    SetLoading(false);
    fetchInitialData();
  }, []);

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();
    (async () => {
      const res = await trackPromise(
        fetch(searchUrl, {
          signal: abortController.signal
        })
      );
      const data = await trackPromise(res.json());

      if (mounted) {
        SetLoading(false);
        if (data.providerDetails.length > 0) {
          SetVisibleSearchResult(true);
          SetProviderDisplay(data.providerDetails);
        } else {
          SetErrorMessage("No Matching Records Found.");
          SetVisibleSearchResult(false);
        }
      }
    })();
    const cleanup = () => {
      mounted = false;
      SetLoading(false);
      abortController.abort();
    };
    return cleanup;
  }, [searchUrl]);

  const onProvideChange = event => {
    const provName = event.target.value;
    SetProviderName(provName.toUpperCase());
  };
  const onCityChange = event => {
    SetCity(event.target.value.toUpperCase());
  };

  const onSpecialtySelection = event => {
    const specialtyValue = event.target.value;

    if (specialtyValue === "0") {
      SetSpecialtySelected(initialSpecialtyValue[0].value);
    } else {
      let specialtyIndex = specialtys.find(
        state => state.value === specialtyValue
      );
      SetSpecialtySelected(specialtyIndex.value);
    }
  };

  const onCountySelection = event => {
    const contyValue = event.target.value;

    if (contyValue === "0") {
      SetCountySelected(initialCountyValue[0].value);
    } else {
      const countyIndex = county.find(state => state.value === contyValue);
      SetCountySelected(countyIndex.value);
    }
  };

  //https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData
  //"http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"

  const fetchInitialData = async () => {
    try {
      const result = await axios(
        //"https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"

        "http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"
      );

      SetSpecialtys(result.data.SpecialityList);
      SetCounty(result.data.CountyList);
    } catch (error) {
      SetLoading(false);
      SetErrorMessage(
        "Error in Loading Specialty, County Information, Please contact Technical Support Team."
      );
    }
  };

  const onSearchBtnClick = event => {
    SetLoading(true);
    event.preventDefault();
    //no need to show the header text .
    SetVisibleHeaderText(false);
    //Set the Search Result Visible false
    SetVisibleSearchResult(false);

    if (
      providerName.trim() === "" &&
      city.trim() === "" &&
      countySelected === "0" &&
      specialtySelected === "0"
    ) {
      SetErrorMessage("Please Enter alteast one search Criteria.");
      SetLoading(false);
    } else if (
      providerName.trim().length < 3 &&
      city.trim() === "" &&
      countySelected === "0" &&
      specialtySelected === "0"
    ) {
      SetErrorMessage(
        "Please enter minimum 3 characters of provider name or enter more search criteria."
      );
      SetLoading(false);
    } else {
      SetErrorMessage("");
      fetchSearchData();
      //  trackPromise(fetchSearchData());
    }
  };

  const fetchSearchData = async () => {
    SetProviderDisplay(initialSearchValue);
    //  let url =  "https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/ProviderDirectorySearch?";
    let url =
      "http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/ProviderDirectorySearch?";
    url = url + "provider=" + providerName.trim();
    url =
      specialtySelected === "0"
        ? url + "&specialty_code="
        : url + "&specialty_code=" + specialtySelected;

    url =
      countySelected === "0"
        ? url + "&county="
        : url + "&county=" + countySelected;
    url = url + "&city=" + city.trim();
    SetSearchUrl(url);
  };

  const onResetClick = event => {
    event.preventDefault();
    SetSearchUrl("");
    SetProviderName("");
    SetSpecialtySelected("0");
    SetCountySelected("0");
    SetCity("");
    SetErrorMessage("");
    SetVisibleSearchResult(false);
    SetVisibleHeaderText(true);
  };

  const printOrder = event => {
    const printableElements = document.getElementById("printme").innerHTML;
    const orderHtmlPage =
      "<html><head><title></title></head><body>" +
      printableElements +
      "</body></html>";
    const oldPage = document.body.innerHTML;
    document.body.innerHTML = orderHtmlPage;
    window.print();
    document.body.innerHTML = oldPage;
  };

  return (
    <React.Fragment>
      <form onSubmit={onSearchBtnClick}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
              {/* One */}
            </div>
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 ">
              <div className="d-none d-md-block">
                {visibleHeaderText ? <Header /> : null}
              </div>

              <div>
                <Ribbon
                  labelText="Enter Search Criteria"
                  controlType="titleBar"
                />
                {/* Provider Name Text  */}
                <div className="form-group row  mb-2 mr-2 mt-2 ml-2">
                  <div className="col-sm-2 col-md-2 col-lg-3">
                    <label className="control-label">
                      <strong>Provider Name:</strong>
                    </label>
                  </div>
                  <div className="col-sm-10 col-md-10 col-lg-9">
                    <input
                      type="input"
                      id="txtProviderName"
                      name="txtProviderName"
                      placeholder="Enter Provider Name"
                      value={providerName.toUpperCase()}
                      onChange={onProvideChange}
                      className="form-control text-uppercase"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Specialty Dropdown  */}
                <div className="form-group row  mb-2 mr-2 mt-2 ml-2">
                  <div className="col-sm-2 col-md-2 col-lg-3">
                    <label className="control-label">
                      <strong>Specialty:</strong>
                    </label>
                  </div>
                  <div className="col-sm-10 col-md-10 col-lg-9">
                    <select
                      onChange={onSpecialtySelection}
                      key={specialtySelected}
                      value={specialtySelected}
                      className="form-control"
                      // style={{ fontsize:"75%" }}
                    >
                      <option key="0" value="0">
                        {"--- Select A Speciality ---"}
                      </option>
                      {specialtys.map((obj, index) => (
                        <option key={index} value={obj.value}>
                          {obj.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* County  Dropdown  */}
                <div className="form-group row  mb-2 mr-2 mt-2 ml-2">
                  <div className="col-sm-2 col-md-2 col-lg-3">
                    <label className="control-label">
                      <strong>County:</strong>
                    </label>
                  </div>
                  <div className="col-sm-10 col-md-10 col-lg-9">
                    <select
                      onChange={onCountySelection}
                      key={countySelected}
                      value={countySelected}
                      className="form-control"
                      // style={{ fontsize:"75%" }}
                    >
                      <option key="0" value="0">
                        {"--- Select A County ---"}
                      </option>
                      {county.map((obj, index) => (
                        <option key={index} value={obj.value}>
                          {obj.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City Text  */}
                <div className="form-group row  mb-2 mr-2 mt-2 ml-2">
                  <div className="col-sm-2 col-md-2 col-lg-3">
                    <label className="control-label">
                      <strong>City:</strong>
                    </label>
                  </div>
                  <div className="col-sm-10 col-md-10 col-lg-9">
                    <input
                      type="input"
                      id="txtCity"
                      name="txtCity"
                      placeholder="Enter City Name"
                      value={city.toUpperCase()}
                      onChange={onCityChange}
                      className="form-control text-uppercase"
                    />
                  </div>
                </div>

                <Ribbon labelText="&nbsp;" controlType="titleBar" />
              </div>

              <div className="float-right p-2">
                <Button
                  type="Submit"
                  className="btn btn-primary ml-3"
                  onClick={onSearchBtnClick}
                >
                  Search
                </Button>
                <Button
                  type="Button"
                  className="btn-primary ml-3"
                  onClick={onResetClick}
                >
                  Reset
                </Button>{" "}
                {visibleSearchResult ? (
                  <Button
                    type="Button"
                    className="btn-primary ml-3"
                    onClick={printOrder}
                  >
                    Print
                  </Button>
                ) : null}
              </div>

              <div style={{ clear: "both" }}>
                {visibleSearchResult ? (
                  <SearchResults
                    id="sr1"
                    providerDisplay={providerDisplay}
                    showPagination={true}
                  />
                ) : (
                  <div>
                    <Ribbon
                      labelText={errorMessage}
                      controlType="errorMessage"
                    />
                  </div>
                )}
              </div>
              {/* <div>{loading ? <LoadingIndicator /> : null}</div>  */}
              <div className="d-flex  justify-content-center align-items-center">
                {loading ? <Loader type="ThreeDots" color="#1e6bd6" /> : ""}
              </div>

              <div className="d-none" id="printme">
                <SearchResults
                  key="2"
                  id="sr2"
                  providerDisplay={providerDisplay}
                  showPagination={false}
                />
              </div>
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              {/* Three */}
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default SearchCritirea;

//todo
//variable standardisation
//overlap
//set focus
//iis shorten url.
