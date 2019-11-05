import React, { useState, useEffect } from "react";
import axios from "axios";
import Ribbon from "../controls/Ribbon";
import SearchResults from "./SearchResults";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "../../app.css";
//needed below for rendering the page in IE.
import "promise-polyfill/src/polyfill";
import "unfetch/polyfill";
import "abortcontroller-polyfill";

function SearchCritirea() {
  //Set the States for initializing the search controls
  const [providerName, SetProviderName] = useState("");
  const [city, SetCity] = useState("");

  const initialSpecialtyValue = [
    { value: "0", label: "--- Select A Specialty ---" }
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
  const initialErrorMessage =
    "Error in Loading Specialty, County Information. Please contact Technical Support Team.";
  const [errorMessage, SetErrorMessage] = useState("");
  //Set visibility for Header text and Search Result table
  const [visibleSearchResult, SetVisibleSearchResult] = useState(false);
  const [visibleHeaderText, SetVisibleHeaderText] = useState(true);
  //Data Fetched on Search button click
  const initialSearchValue = [{}];
  const [providerDisplay, SetProviderDisplay] = useState(initialSearchValue);
  const [searchUrl, SetSearchUrl] = useState("");
  const [loading, SetLoading] = useState(false); // use state used to display the busy Progress bar.

  //URL Path
  const [urlPath, SetUrlPath] = useState("");

  //Use Effect to fetch the initial data.
  useEffect(() => {
    const hostname = window && window.location && window.location.hostname;
    let url_path = "";
    if (hostname === "localhost") {
      url_path =
        "http://localhost/Alportal/webservices/provider/ProviderDirectory.svc";
    } else {
      url_path =
        "https://" +
        hostname +
        "/Alportal/webservices/provider/ProviderDirectory.svc";
    }
    SetUrlPath(url_path);

    //Fetch initial data to fill the drop down for specialty, county.
    const url = url_path + "/GetInitialData";
    axios
      .get(url)
      .then(result => {
        SetSpecialtys(result.data.SpecialityList);
        SetCounty(result.data.CountyList);
        SetErrorMessage("");
      })
      .catch(error => {
        SetErrorMessage(initialErrorMessage);
      });
  }, []);

  //Use effect called when there is a change in the searUrl.
  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();

    try {
      //console.log(searchUrl);
      (async () => {
        const res = await trackPromise(
          fetch(searchUrl, {
            signal: abortController.signal
          })
        );

        const data = await trackPromise(res.json());
        if (mounted) {
          SetLoading(false);
          if (data.errorMessage.length > 0) {
            SetErrorMessage(data.errorMessage);
            SetVisibleSearchResult(false);
          } else if (data.providerDetails.length > 0) {
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
    } catch (error) {
      SetErrorMessage("Error in Loading the search Result");
    }
  }, [searchUrl]);

  //fired when there is a change in Provider name input text box
  const onProvideChange = event => {
    SetProviderName(event.target.value.toUpperCase());
  };

  //fired when there is a change in city input text box
  const onCityChange = event => {
    SetCity(event.target.value.toUpperCase());
  };

  //fired when there the specialty dropdown value selected.
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

  //fired when there the county dropdown value selected.
  const onCountySelection = event => {
    const contyValue = event.target.value;
    if (contyValue === "0") {
      SetCountySelected(initialCountyValue[0].value);
    } else {
      const countyIndex = county.find(state => state.value === contyValue);
      SetCountySelected(countyIndex.value);
    }
  };

  //On SearchButton Click,
  const onSearchBtnClick = event => {
    event.preventDefault();
    //no need to show the header text .
    SetVisibleHeaderText(false);
    //If there is error in initial loading then do not do any search.
    if (errorMessage === initialErrorMessage) {
      return;
    }

    if (
      providerName.trim() === "" &&
      city.trim() === "" &&
      countySelected === "0" &&
      specialtySelected === "0"
    ) {
      SetErrorMessage("Please Enter alteast one search Criteria.");
      SetVisibleSearchResult(false);
      SetSearchUrl("");
    } else if (
      providerName.trim().length < 3 &&
      city.trim() === "" &&
      countySelected === "0" &&
      specialtySelected === "0"
    ) {
      SetErrorMessage(
        "Please enter minimum 3 characters of provider name or enter more search criteria"
      );
      SetVisibleSearchResult(false);
      SetSearchUrl("");
    } else {
      SetErrorMessage("");
      fetchSearchData();
    }
  };

  //Set the SearchUrl
  const fetchSearchData = async () => {
    let url = urlPath + "/ProviderDirectorySearch?";

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
   
    //If no search criteria changed and on  click of search nothing has to be done.
    if (url !== searchUrl) {
      SetSearchUrl(url);

      SetProviderDisplay(initialSearchValue);
      //Set the Search Result Visible false
      SetVisibleSearchResult(false);
    } else {
      SetLoading(false);
    }
  };

  //On Result Click.
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

  //On Print button click
  const printOrder = event => {
    window.print();
  };

  return (
    <React.Fragment>
      <form onSubmit={onSearchBtnClick}>
        <div className="container-fluid">
          <div className="row" id="searchCriteria">
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2 ">
              {/* One */}
            </div>
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-8 ">
              <div>{visibleHeaderText ? <Header /> : null}</div>

              <div className="no-print">
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
                      className="form-control text-uppercase input-field"
                      autoFocus
                      maxLength="100"
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
                    >
                      <option key="0" value="0">
                        {"--- Select A Specialty ---"}
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
                  <div className="col-sm-10 col-md-10 col-lg-9  ">
                    <select
                      onChange={onCountySelection}
                      key={countySelected}
                      value={countySelected}
                      className="form-control "
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
                      className="form-control text-uppercase input-field"
                      maxLength="50"
                    />
                  </div>
                </div>

                <Ribbon labelText="&nbsp;" controlType="titleBar" />
              </div>

              <div className="float-right p-2 no-print">
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
                  <React.Fragment>
                    <Button
                      type="Button"
                      className="btn-primary ml-3 no-print"
                      onClick={printOrder}
                    >
                      Print
                    </Button>
                  </React.Fragment>
                ) : null}
              </div>
              <div
                className="no-print"
                style={{ clear: "both" }}
                id="SearchResultsContent"
              >
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
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
              {/* Three */}
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default SearchCritirea;
