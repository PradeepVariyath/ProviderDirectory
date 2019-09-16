import React, { useState, useEffect } from "react";
import axios from "axios";
import TextBarControl from "../controls/textBar";
import TextBoxControl from "../controls/textBoxControl";
import DropDownSelector from "../controls/dropDownSelector";
import SearchResults from "./searchResults";
import Header from "./header";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { trackPromise } from "react-promise-tracker";

function SearchCritirea() {
  //States  the ProviderName, Specialty, County, City
  const [providerName, SetProviderName] = useState("");

  const [specialtys, SetSpecialtys] = useState([]);
  const [specialtySelected, SetSpecialtySelected] = useState();

  const [county, SetCounty] = useState([]);
  const [countySelected, SetCountySelected] = useState();

  const [city, SetCity] = useState("");

  //states for the visibility for the header text, Search Result.
  const [visibleSearchResult, SetVisibleSearchResult] = useState(false);
  const [visibleHeaderText, SetVisibleHeaderText] = useState(true);

  //State for the Search Results.
  const [providerDisplay, SetProviderDisplay] = useState([]);
  //State for Error Message.
  const [errorMessage, SetErrorMessage] = useState("");

  //Initialize the drop downs and set Results display to false.
  useEffect(() => {
    fetchInitialData();
    SetVisibleSearchResult(false);
  }, []);

  const fetchInitialData = async () => {
    try {
      const result = await axios(
        "https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"
        // "http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"
      );

      SetSpecialtys(result.data.SpecialityList);
      SetCounty(result.data.CountyList);
    } catch (error) {
      SetErrorMessage(
        "Error in Loading Specialty, County Information, Please contact Technical Support Team."
      );
    }
  };
  //on Provider Name Text box change.
  const onProvideChange = event => {
    const value = event.target.value.toUpperCase();
    SetProviderName(value);
  };
  //on City Text box change.
  const onCityChange = event => {
    const value = event.target.value.toUpperCase();
    SetCity(value);
  };
  //On Specialty dropdown Selection.
  const onSpecialtySelection = event => {
    let specialtyIndex = specialtys.filter(
      state => state.value === event.target.value
    );
    SetSpecialtySelected(specialtyIndex[0].value);
  };
  //On County Dropdown selection.
  const onCountySelection = event => {
    let countyIndex = county.filter(
      state => state.value === event.target.value
    );
    SetCountySelected(countyIndex[0].value);
  };

  const onSearchBtnClick = event => {
    event.preventDefault();
    console.log(
      "providerName.trim()" + providerName.trim() + "providerName.trim()"
    );
    if (
      providerName.trim() === "" &&
      city.trim() === "" &&
      countySelected === "0" &&
      specialtySelected === "0"
    ) {
      SetErrorMessage("Please Enter alteast one search Criteria.");
    } else {
      SetErrorMessage("");
      //no need to show the header text .
      SetVisibleHeaderText(false);

      trackPromise(fetchSearchData());
    }
  };

  const fetchSearchData = async () => {
    SetVisibleSearchResult(false);
    SetProviderDisplay([]);

    let url =
      "https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/ProviderDirectorySearch?";
    // let url =
    //   "http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/ProviderDirectorySearch?";
    url = url + "provider=" + providerName.trim();

    if (specialtySelected === undefined || specialtySelected === "0") {
      url = url + "&specialty_code=";
    } else {
      url = url + "&specialty_code=" + specialtySelected;
    }

    if (countySelected === undefined || countySelected === "0") {
      url = url + "&county=";
    } else {
      url = url + "&county=" + countySelected;
    }
    url = url + "&city=" + city.trim();
    //console.log(url);

    try {
      const result = await axios(url);

      if (result.data.providerDetails.length !== 0) {
        SetVisibleSearchResult(true);
      } else {
        SetErrorMessage("No Matching Records Found.");
        SetVisibleSearchResult(false);
      }

      SetProviderDisplay(result.data.providerDetails);
    } catch (error) {
      SetErrorMessage("Error Fetching data.");
    }
  };

  //https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData
  //"http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"

  const onResetClick = event => {
    SetProviderName("");
    SetSpecialtySelected("0");
    SetCountySelected("0");
    SetCity("");
    SetErrorMessage("");
    SetVisibleSearchResult(false);
    SetVisibleHeaderText(true);
    event.preventDefault();
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
            <div className="col-xs-8 col-sm-8 col-md-4 col-lg-8 ">
              {visibleHeaderText ? <Header /> : null}

              <div>
                <TextBarControl
                  labelText="Enter Search Criteria"
                  controlType="titleBar"
                />
                <br />
                <TextBoxControl
                  id="ct0"
                  placeholder="Enter Provider Name"
                  labelText="Provider Name: "
                  Value={providerName}
                  onChange={onProvideChange}
                  autoFocus
                />
                <DropDownSelector
                  value={specialtySelected}
                  labelText="Specialty : "
                  defaultText="--- Select A Speciality ---"
                  options={specialtys}
                  onChange={onSpecialtySelection}
                />
                <DropDownSelector
                  value={countySelected}
                  labelText="County: "
                  defaultText="--- Select A County ---"
                  options={county}
                  onChange={onCountySelection}
                />
                <TextBoxControl
                  id="ct1"
                  labelText="City: "
                  placeholder="Enter City Name"
                  Value={city}
                  onChange={onCityChange}
                />
                <TextBarControl labelText="&nbsp;" controlType="titleBar" />
              </div>
              <br />
              <div className="float-right">
                <Button
                  type="Submit"
                  className="btn btn-primary"
                  onClick={onSearchBtnClick}
                >
                  Search
                </Button>
                <span> </span>
                <Button
                  type="Button"
                  className="btn btn-primary"
                  onClick={onResetClick}
                >
                  Reset
                </Button>{" "}
                <span> </span>
                {visibleSearchResult ? (
                  <Button
                    type="Button"
                    className="btn btn-primary"
                    onClick={printOrder}
                  >
                    Print
                  </Button>
                ) : null}
              </div>
              <br />
              <br />
              <div>
                {visibleSearchResult ? (
                  <div>
                    <SearchResults
                      id="sr1"
                      providerDisplay={providerDisplay}
                      showPagination={true}
                    />
                  </div>
                ) : (
                  <TextBarControl
                    labelText={errorMessage}
                    controlType="errorMessage"
                  />
                )}
              </div>

              <div className="d-none" id="printme">
                <SearchResults
                  id="sr2"
                  providerDisplay={providerDisplay}
                  showPagination={false}
                />
              </div>
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2">{/* Three */}</div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default SearchCritirea;
