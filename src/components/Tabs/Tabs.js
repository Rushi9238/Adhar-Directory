import React from "react";
// import "./tabs.css";

const TABS = {
  Add: "Add",
  Retrieve: "Retrieve",
};

const Tabs = ({ changeTab, currentTab }) => {
  return (
    <div className="wrapper-tabs">
      <button
        className={`button ${currentTab === TABS.Add ? "active" : ""}`}
        onClick={() => changeTab(TABS.Add)}
      >
        Add
      </button>
      <button
        className={`button ${currentTab === TABS.Retrieve ? "active" : ""}`}
        onClick={() => changeTab(TABS.Retrieve)}
      >
        Retrieve
      </button>
    </div>
  );
};

export default Tabs;
