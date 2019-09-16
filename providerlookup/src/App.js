import React from "react";
import SearchCriteria from "./component/layout/searchCriteria";
import LoadingIndicator from "./component/controls/loadingIndicator";

function App() {
  return (   
      <div id="AL_Container">
        <div id="AL_Content">
          <SearchCriteria />
          <LoadingIndicator />
        </div>
      </div>

  );
}
export default App;
