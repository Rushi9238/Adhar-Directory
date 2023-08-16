import { useState } from "react";
import Header from "./components/Header/Header";
import Add from "./components/Add/Add";
import Retrieve from "./components/Retrieve/Retrieve";
// import "./App.css";
import Tabs from "./components/Tabs/Tabs";

const TABS = {
  Add: "Add",
  Retrieve: "Retrieve",
};

const App = () => {
  const [currentTab, setCurrentTab] = useState(TABS.Add);

  const changeTab = (value) => {
    setCurrentTab(value);
  };

  return (
    <div style={{background: 'linear-gradient(180deg, rgba(65, 95, 255, 0.30) 0%, rgba(0, 200, 255, 0.00) 100%)'}}>
      <Header />
      <div className="wrapper">
        <Tabs changeTab={changeTab} currentTab={currentTab} />
        {currentTab === TABS.Add ? <Add /> : <Retrieve />}
      </div>
    </div>
  );
};

export default App;
