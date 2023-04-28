import React, { useState, useEffect, useRef } from "react";

function UserInfo(props) {
  const [userData, setUserData] = useState({});
  const nameInput = useRef(null);
  const emailInput = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
      body: JSON.stringify({
        _id: "",
        name: "",
        email: "",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // check that the data is properly received
        setUserData(data);
      })

      .catch((error) => console.log(error));
  }, []);

  const changeInfo = (event, userId) => {
    event.preventDefault();

    const token = localStorage.getItem("authToken");

    fetch("http://localhost:5000/api/auth/updateuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.current.value,
        email: emailInput.current.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container my-5">
      <h1>User Information</h1>
      <p>ID: {userData._id || "Loading..."}</p>
      <p>Name: {userData.name || "Loading..."}</p>
      <p>Email: {userData.email || "Loading..."}</p>
      <h1>Change Information</h1>
      <form onSubmit={changeInfo}>
        <label className="form-label" htmlFor="name">New Name:</label>
        <input
          className="form-control"
          type="text"
          id="name"
          ref={nameInput}
          defaultValue={userData.name}
        />

        <label className="form-label" htmlFor="email">New Email:</label>
        <input
          className="form-control"
          type="email"
          id="email"
          ref={emailInput}
          defaultValue={userData.email}
        />

        <button className="btn btn-primary my-3" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserInfo;
