import React, { useState } from "react";
// import "./add.css";
import { getAgeFromDOB, getDataFromLS } from "../../utils/helpers";
// import Modal from "../Modal";

const initialPersonData = {
  name: "",
  dateOfBirth: "",
  aadharNumber: null,
  mobileNumber: null,
  age: null,
};

const Add = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [personData, setPersonData] = useState(initialPersonData);
  const [invalidField, setInvalidField] = useState([]);
  // const [showSuccess, setShowSuccess] = useState(false);

  const [lSPersonData, setLSPersonData] = useState(() => {
    return getDataFromLS();
  });

  const handleDelete = () => {
    setIsAdding(false);
    setPersonData(initialPersonData);
    setInvalidField([]);
  };

  const checkValidation = () => {
    const res = [];
    if (personData.name === "") {
      res.push("name");
    }
    if (
      personData.aadharNumber === null ||
      personData.aadharNumber.length !== 12
    ) {
      res.push("aadharNumber");
    }
    if (
      personData.mobileNumber === null ||
      personData.mobileNumber.length !== 10
    ) {
      res.push("mobileNumber");
    }
    if (personData.dateOfBirth === "") {
      res.push("dateOfBirth");
    }

    setInvalidField(res);
    return res.length === 0 ? true : false;
  };

  const handleSave = () => {
    const isAllDataValid = checkValidation();

    if (!isAllDataValid) {
      return;
    }

    const personDataFromLS = localStorage.getItem("person-data");

    const person = {
      Name: personData.name,
      "Date of Birth": personData.dateOfBirth,
      "Aadhar Number": personData.aadharNumber,
      "Mobile Number": personData.mobileNumber,
      Age: personData.age,
    };

    if (personDataFromLS) {
      const parsedData = JSON.parse(personDataFromLS);
      const personArray = [...parsedData, person];
      localStorage.setItem("person-data", JSON.stringify(personArray));
      setLSPersonData(personArray);
    } else {
      const newArr = [person];
      localStorage.setItem("person-data", JSON.stringify(newArr));
      setLSPersonData(newArr);
    }

    // setShowSuccess(true);
    setIsAdding(false);
    setPersonData(initialPersonData);
  };

  // const onClose = () => {
  //   setShowSuccess(false);
  // };

  const handleDataInput = (e, field) => {
    const updatedPersonData = {
      ...personData,
    };
    updatedPersonData[field] = e.target.value;

    if (field === "dateOfBirth") {
      const age = getAgeFromDOB(e.target.value);
      updatedPersonData.age = age;
    }

    setPersonData(updatedPersonData);
  };

  const deletDataFromLS = (aadharNumber) => {
    const data = getDataFromLS();

    const updatedData = data.filter(
      (item) => item["Aadhar Number"] !== aadharNumber
    );

    localStorage.setItem("person-data", JSON.stringify(updatedData));
    setLSPersonData(updatedData);
  };

  return (
    <div>
      {/* <Modal showModal={showSuccess} onClose={onClose} /> */}
      <h3>Add new person</h3>
      <div className="table-wrapper">
        <table>
          <tr>
            <th className="name-head">Name</th>
            <th>Date of Birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
          {lSPersonData.map((pr) => {
            return (
              <tr>
                <td>{pr.Name}</td>
                <td>{pr[`Date of Birth`]}</td>
                <td>{pr["Aadhar Number"]}</td>
                <td>{pr["Mobile Number"]}</td>
                <td>{pr.Age}</td>
                <td>
                  <div className="action-btn-wrapper">
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
                      onClick={() => deletDataFromLS(pr["Aadhar Number"])}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </div>
                </td>
              </tr>
            );
          })}
          {isAdding && (
            <tr>
              <td>
                <input
                  value={personData.name}
                  onChange={(e) => handleDataInput(e, "name")}
                />
                {invalidField.includes("name") && (
                  <div className="validation">Enter Name</div>
                )}
              </td>
              <td>
                <input
                  value={personData.dateOfBirth}
                  onChange={(e) => handleDataInput(e, "dateOfBirth")}
                  type="date"
                />
                {invalidField.includes("dateOfBirth") && (
                  <div className="validation">Enter DOB</div>
                )}
              </td>
              <td>
                <input
                  value={personData.aadharNumber}
                  onChange={(e) => handleDataInput(e, "aadharNumber")}
                />
                {invalidField.includes("aadharNumber") && (
                  <div className="validation">Enter Valid Aadhar No.</div>
                )}
              </td>
              <td>
                <input
                  value={personData.mobileNumber}
                  onChange={(e) => handleDataInput(e, "mobileNumber")}
                />
                {invalidField.includes("mobileNumber") && (
                  <div className="validation">Enter Valid Mob No.</div>
                )}
              </td>
              <td>{personData.age ? personData.age : 0}</td>
              <td>
                <div className="action-btn-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-device-floppy"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="#000000"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="save-btn cur-po"
                    onClick={handleSave}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                    <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M14 4l0 4l-6 0l0 -4" />
                  </svg>
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
                    onClick={handleDelete}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </div>
              </td>
            </tr>
          )}
        </table>
      </div>

      <div className="add-btn-wrapper">
        <button
          className="button"
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          Add New Person
        </button>
      </div>
    </div>
  );
};

export default Add;
