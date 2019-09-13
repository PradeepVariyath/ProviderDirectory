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
  const [providerName, setProviderName] = useState(
    // "ALABAMA ALLERGY & ASTHMA CLINIC"
    "BACHA"
  );
  const initialSpecialtyValue = [{ value: "0", label: "Select a Specialty" }];

  const [specialtySelected, setSpecialtySelected] = useState(
    initialSpecialtyValue[0].value
  );
  const [allSpecialtys, setAllSpecialtys] = useState([initialSpecialtyValue]);

  const initialCountyValue = [
    { value: "0", label: " --- Select A County --- " }
  ];
  const [allCounty, setAllCounty] = useState(initialCountyValue);
  const [countySelected, setCountySelected] = useState(
    initialCountyValue[0].value
  );
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleSearchResult, SetVisibleSearchResult] = useState(false);
  const [visibleHeaderText, SetVisibleHeaderText] = useState(true);

  const initialSearchValue = [{}];
  const [providerDisplay, setProviderDisplay] = useState(initialSearchValue);

  useEffect(() => {
    fetchInitialData();
    SetVisibleSearchResult(false);
  }, []);

  const onProvideChange = event => {
    const value = event.target.value.toUpperCase();
    setProviderName(value);
  };
  const onCityChange = event => {
    const value = event.target.value.toUpperCase();
    setCity(value);
  };

  const onSpecialtySelection = event => {
    const value = event.target.value;

    if (value === "0") {
      setSpecialtySelected(initialSpecialtyValue[0].value);
    } else {
      let specialtyIndex = allSpecialtys.filter(state => state.value === value);
      setSpecialtySelected(specialtyIndex[0].value);
    }
  };

  const onCountySelection = event => {
    const value = event.target.value;
    if (value === "0") {
      setCountySelected(initialCountyValue[0].value);
    } else {
      const countyIndex = allCounty.filter(state => state.value === value);
      setCountySelected(countyIndex[0].value);
    }
  };

  const onSearchBtnClick = event => {
    event.preventDefault();
    if (
      providerName === "" &&
      city === "" &&
      countySelected === "0" &&
      specialtySelected === "0"
    ) {
      setErrorMessage("Please Enter alteast one search Criteria.");
    } else {
      setErrorMessage("");
      //no need to show the header text .
      SetVisibleHeaderText(false);

      trackPromise(fetchSearchData());
    }
  };

  const fetchSearchData = async () => {
    SetVisibleSearchResult(false);
    setProviderDisplay(initialSearchValue);

    //let url =  "https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/ProviderDirectorySearch?";
    let url =
      "http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/ProviderDirectorySearch?";
    url = url + "provider=" + providerName;

    if (specialtySelected === "0") {
      url = url + "&specialty_code=";
    } else {
      url = url + "&specialty_code=" + specialtySelected;
    }

    if (countySelected === "0") {
      url = url + "&county=";
    } else {
      url = url + "&county=" + countySelected;
    }
    url = url + "&city=" + city;
    console.log(url);
    try {
      const result = await axios(url);

      if (result.data.length !== 0) {
        SetVisibleSearchResult(true);
      } else {
        setErrorMessage("No Matching Records Found.");
        SetVisibleSearchResult(false);
      }
      setProviderDisplay(result.data.providerDetails);
    } catch (error) {
      setErrorMessage("Error Fetching data.");
    }
  };

  //https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData
  //"http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"

  const fetchInitialData = async () => {
    try {
      const result = await axios(
        //   "https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"

        "http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"
      );

      setAllSpecialtys(result.data.SpecialityList);
      setAllCounty(result.data.CountyList);
    } catch (error) {
      setErrorMessage(
        "Error in Loading Specialty, County Information, Please contact Technical Support Team."
      );
    }
  };

  const onResetClick = event => {
    setProviderName("");
    setSpecialtySelected("0");
    setCountySelected("0");
    setCity("");
    setErrorMessage("");
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
              {visibleHeaderText? <Header /> : null}

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
                  options={allSpecialtys}
                  onChange={onSpecialtySelection}
                />
                <DropDownSelector
                  value={countySelected}
                  labelText="County: "
                  defaultText="--- Select A County ---"
                  options={allCounty}
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
