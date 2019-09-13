import React from "react";
import SearchCriteria from "./component/layout/searchCriteria";
import LoadingIndicator from "./component/controls/loadingIndicator";
import "./App1.css";

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
