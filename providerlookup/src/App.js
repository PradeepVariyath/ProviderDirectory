import React from "react";
import SearchCriteria from "./component/layout/searchCriteria";
import LoadingIndicator from "./component/controls/loadingIndicator";
import "./App1.css";

function App() {
  return (
    <form>
      <div id="AL_Container">
        <div id="AL_Content">
          <SearchCriteria />
          <LoadingIndicator />
        </div>
      </div>
    </form>
  );
}
export default App;
