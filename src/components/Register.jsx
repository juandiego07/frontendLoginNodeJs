import axios from "axios";
import showMessage from "../showMessage";
import { BASE_URL } from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmation: "",
  });

  const Navigate = useNavigate();

  const { name, lastName, email, password, confirmation } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      confirmation !== ""
    ) {
      const user = { name, lastName, email, password };
      if (password === confirmation) {
        axios
          .post(BASE_URL + "/register", user)
          .then(({ data }) => {
            if (data.status) {
              showMessage(data.status, data.message);
              setTimeout(() => {
                Navigate("/login");
              }, 3000);
              setInputs("");
            } else {
              showMessage(data.status, data.message);
            }
          })
          .catch((error) => showMessage(false, error));
      } else {
        showMessage(false, "Password and confirmation don't mach");
      }
    } else {
      showMessage(false, "All fields are requiered");
    }
  };

  return (
    <section>
      <div className="form-box form-box-r">
        <form autoComplete="off" onSubmit={(e) => handlerSubmit(e)}>
          <h2>Register</h2>
          <div className="input-box">
            <ion-icon name="person-outline"></ion-icon>
            <input
              onChange={(e) => handleChange(e)}
              value={name}
              className="input-box-r"
              type="text"
              id="name"
              name="name"
              required
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-box">
            <ion-icon name="person-add-outline"></ion-icon>
            <input
              onChange={(e) => handleChange(e)}
              value={lastName}
              className="input-box-r"
              type="text"
              id="lastName"
              name="lastName"
              required
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className="input-box">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              onChange={(e) => handleChange(e)}
              value={email}
              className="input-box-r"
              type="email"
              id="email"
              name="email"
              required
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="input-box">
            <ion-icon name="key-outline"></ion-icon>
            <input
              onChange={(e) => handleChange(e)}
              value={password}
              className="input-box-r"
              type="password"
              id="password"
              name="password"
              required
            />
            <label htmlFor="Password">Password</label>
          </div>
          <div className="input-box">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              onChange={(e) => handleChange(e)}
              value={confirmation}
              className="input-box-r"
              type="password"
              id="confirmation"
              name="confirmation"
              required
            />
            <label htmlFor="confirmation">Confirmation</label>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="textBotton">
        You have an accuont?{" "}
        <span onClick={() => Navigate("/login")}>Login</span>
      </div>
    </section>
  );
};
