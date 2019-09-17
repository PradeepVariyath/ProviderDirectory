import React from "react";

function Header() {
  return (
    <React.Fragment>
      <div className="mainFont">
        <h1>Find a Provider</h1>
        <p className="StaticTextPara">
          Have you had trouble finding a provider ? Use Provider Locator in your
          community who sees and accepts Medicaid and CHIP.
        </p>
        <p className="StaticTextPara">Finding a provider is easy:</p>
        <p className="StaticTextPara">
          1. Enter part/Full of Provider Name.
        </p>
        <p className="StaticTextPara">
          2. Select the specialty from the drop-down menu.
        </p>
        <p className="StaticTextPara">
          3. Enter county close to where you live or work.
        </p>
        <p className="StaticTextPara">
          4. Choose the city to where you live or work.
        </p>        
        <p className="StaticTextPara">
          If you want to look for specialty provider who speak your language, expand the Additional Search
          Criteria and select options that fit your needs.
        </p>
      </div>
    </React.Fragment>
  );
}

export default Header;
