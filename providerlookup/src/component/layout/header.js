import React from "react";

function Header() {
  return (
    <React.Fragment>
      <div >
        <h1>Find a Provider</h1>
        <p  style={{ "marginTop":"1em","marginBottom":"1em"}}>
          Have you had trouble finding a provider ? Use Provider Locator in your
          community who sees and accepts Medicaid and CHIP.
        </p>
        <p >Finding a provider is easy:</p>
        <p >1. Enter part/Full of Provider Name.
        </p>
        <p>
          2. Select the specialty from the drop-down menu.
        </p>
        <p>
          3. Enter county close to where you live or work.
        </p>
        <p >
          4. Choose the city to where you live or work.
        </p> 
      </div>
    </React.Fragment>
  );
}

export default Header;
