import React from "react";
import SearchCriteria from "./component/layout/searchCriteria"
import "./App1.css";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

//import './App.scss';
//import "./App.css";

function App() {
  
  return (
   <form>
    <div id="AL_Container">
      <div id="AL_Content"> 
     
      <SearchCriteria/>    
      </div></div>
    </form>
  );
}
export default App;
