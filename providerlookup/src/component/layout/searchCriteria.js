import React, { useState, useEffect } from "react";
import axios from "axios";
import Ribbon from "../controls/Ribbon";
import TextBoxControl from "../controls/textBoxControl";
import DropDownSelector from "../controls/dropDownSelector";
import SearchResults from "./searchResults";
import Header from "./header";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { trackPromise } from "react-promise-tracker";

function SearchCritirea() {
  //Set the States for initializing the search controls
  const [providerName, SetProviderName] = useState("");
  const [city, SetCity] = useState("");

  const initialSpecialtyValue = [{ value: "0", label: "Select a Specialty" }];
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

  useEffect(() => {    
    fetchInitialData();
  }, []);

  const onProvideChange = event => {
    const provName=event.target.value;
    SetProviderName(provName.toUpperCase());
  };
  const onCityChange = event => {
    SetCity(event.target.value.toUpperCase());
  };

  const onSpecialtySelection = event => {
    const specialtyvalue = event.target.value;
    let specialtyIndex = specialtys.find(state => state.value === specialtyvalue);
    SetSpecialtySelected(specialtyIndex.value);
    
  };

  const onCountySelection = event => {
    const value = event.target.value;    
      const countyIndex = county.find(state => state.value === value);
      SetCountySelected(countyIndex.value);
    
  };

  const onSearchBtnClick = event => {
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
    } else {
      SetErrorMessage("");
      trackPromise(fetchSearchData());
    }
  };

  const fetchSearchData = async () => {
   
    SetProviderDisplay(initialSearchValue);

  // let url =  "https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/ProviderDirectorySearch?";
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
    console.log(url);
    try {
      const result = await axios(url);

      //if Length > 0 Set the output otherwise Set error Message
      if (result.data.providerDetails.length > 0) {
        SetVisibleSearchResult(true);
        SetProviderDisplay(result.data.providerDetails);

      } else {
        SetErrorMessage("No Matching Records Found.");
        SetVisibleSearchResult(false);
      }
    } catch (error) {
      SetErrorMessage("Error Fetching data.");
    }
  };

  //https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData
  //"http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"

  const fetchInitialData = async () => {
    try {
      const result = await axios(
      // "https://mod.alxix.slg.eds.com/AlportalaLT/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"

     "http://localhost/Alportal/webservices/provider/ProviderDirectoryLocation.svc/GetInitialData"
      );

      SetSpecialtys(result.data.SpecialityList);
      SetCounty(result.data.CountyList);
    } catch (error) {
      SetErrorMessage(
        "Error in Loading Specialty, County Information, Please contact Technical Support Team."
      );
    }
  };

  const onResetClick = event => {
    event.preventDefault();
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
             {visibleHeaderText ? <Header /> : null}</div> 

              <div >
                <Ribbon
                  labelText="Enter Search Criteria"
                  controlType="titleBar"
                />                      
                <TextBoxControl
                  id="ct0"
                  placeholder="Enter Provider Name"
                  labelText="Provider Name: "
                  Value={providerName}
                  onChange={onProvideChange}
                  controlfocus={true}
                  
                />
                <DropDownSelector
                  value={specialtySelected}
                  labelText="Specialty: "
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
                  controlfocus={false}
                />
                <Ribbon labelText="&nbsp;" controlType="titleBar" />
              </div>
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
                  <Ribbon
                    labelText={errorMessage}
                    controlType="errorMessage"
                  />
                )}
              </div>

              <div className="d-none" id="printme">
                <SearchResults
                key ="2"
                  id="sr2"
                   providerDisplay={providerDisplay}
                  showPagination={false}
                />
              </div>
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">{/* Three */}</div>
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