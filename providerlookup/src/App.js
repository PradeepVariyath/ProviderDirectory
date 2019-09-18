import React from "react";
import SearchCriteria from "./component/layout/searchCriteria";
import LoadingIndicator from "./component/controls/loadingIndicator";

function App() {
  return (
    <div>
      <div>
        <SearchCriteria />
        <LoadingIndicator />
      </div>
    </div>
  );
}
export default App;
