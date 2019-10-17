import React from "react";

function Header() {
  return (
    <React.Fragment>
      <div>
        <h1 className="text-center"><strong>Find a Provider</strong></h1>
        <p className="mt-4 mb-2 ml-2 mr-2"><strong>
          You may use all or any of the fields below to search for a provider.
          At least one field must be entered.</strong>
        </p>
        <p className="m-2">
          <strong>Provider Name:</strong> Enter as many letters as possible of the provider’s
          name.
        </p>
        <p className="m-2">
        <strong>Specialty:</strong> Select one specialty from the drop-down menu.
        </p>
        <p className="m-2">
        <strong>County:</strong> This is the county where the provider is located. To find a
          provider in your county you may select the county where you live or
          work.
        </p>
        <p className="m-2">         
          <strong>City: </strong>This is the city where the provider is located. To find a
          provider in your city you may enter the city where you live or work.
        </p>
        <p className="mt-4 mb-2 ml-2 mr-2">Disclaimer: </p>

        <p className="m-2">
          The information displayed in this tool is based on the information on
          the provider files with AMA/DXC. As a provider, if you find the
          information displayed is inaccurate, please follow the usual means of
          updating your provider file (i.e., Web Portal, Provider Enrollment
          Staff, etc.). Please note that not all provider types are shown in the
          search results.
        </p>
      </div>
    </React.Fragment>
  );
}

export default Header;
