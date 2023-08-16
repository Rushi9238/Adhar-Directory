import React, { useState } from "react";
// import "./retrieve.css";
import { getDataFromLS } from "../../utils/helpers";

const Retrieve = () => {
  const [inputValue, setInputValue] = useState("");
  const [personData, setPersonData] = useState([]);
  const [isFindClicked, setIsFindClicked] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsFindClicked(false);
  };

  const handleFindClick = () => {
    const data = getDataFromLS();

    const updatedData = data.filter(
      (item) => item["Aadhar Number"] === inputValue
    );
    setIsFindClicked(true);
    setPersonData(updatedData);
  };

  const deleteDataFromLS = () => {
    console.log("isme");
    const aadharNumber = personData[0]["Aadhar Number"];
    const data = getDataFromLS();

    const updatedData = data.filter(
      (item) => item["Aadhar Number"] !== aadharNumber
    );

    localStorage.setItem("person-data", JSON.stringify(updatedData));
    setInputValue("");
    setPersonData([]);
    setIsFindClicked(false);
  };

  return (
    <div>
      <h3>Retrieve information</h3>
      <input
        value={inputValue}
        onChange={handleInputChange}
        className="search-input"
        placeholder="Please enter Aadhar Number"
      />

      <button className="button" onClick={handleFindClick}>
        Find
      </button>

      {isFindClicked &&
        (personData.length > 0 ? (
          <div className="person-card">
            <div className="card-row">
              <span className="card-row-key">Name:</span>
              <span>{personData[0].Name}</span>
            </div>
            <div className="card-row">
              <span className="card-row-key"> Date of Birth:</span>
              <span>{personData[0]["Date of Birth"]}</span>
            </div>
            <div className="card-row">
              <span className="card-row-key">Aadhar Number:</span>
              <span>{personData[0]["Aadhar Number"]}</span>
            </div>
            <div className="card-row">
              <span className="card-row-key">Mobile Number:</span>
              <span>{personData[0]["Mobile Number"]}</span>
            </div>
            <div className="card-row">
              <span className="card-row-key">Age:</span>
              <span>{personData[0]["Age"]}</span>
            </div>
            <button
              className="button card-button"
              onClick={() => deleteDataFromLS()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-trash"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="#000000"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="delete-btn cur-po"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            <h4>User not found, please check Aadhar Number</h4>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png"
              alt="user not found"
            />
          </div>
        ))}
    </div>
  );
};

export default Retrieve;
