import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className="d-flex justify-content-center ">
        <Loader type="ThreeDots" color="#1e6bd6" />
      </div>
    )
  );
};

export default LoadingIndicator;
