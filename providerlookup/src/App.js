import React from "react";
import SearchCriteria from "./component/layout/SearchCriteria";
import LoadingIndicator from "./component/controls/LoadingIndicator";

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
