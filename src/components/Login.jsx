import axios from "axios";
import showMessage from "../showMessage";
import { BASE_URL } from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserProvider";

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const { setUser } = useUserContext();

  const Navigate = useNavigate();

  const handlerChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const userLogin = { email, password };
    await axios
      .post(BASE_URL + "/login", userLogin)
      .then(({ data }) => {
        if (data.status) {
          localStorage.setItem("token", data?.token);
          showMessage(data.status, data.message);
          setUser(data.token);
          setInputs("");
          setTimeout(() => {
            Navigate("/home");
          }, 3000);
        } else {
          showMessage(data.status, data.message);
          setInputs({ password: "" });
        }
      })
      .catch((error) => showMessage(false, error));
  };

  return (
    <section>
      <div className="form-box form-box-l">
        <form onSubmit={(e) => handlerSubmit(e)} autoComplete="off">
          <h2>Login</h2>
          <div className="input-box">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              value={email}
              onChange={(e) => handlerChange(e)}
              type="email"
              id="email"
              name="email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-box">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              value={password}
              onChange={(e) => handlerChange(e)}
              type="password"
              id="password"
              name="password"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
      <div className="textBotton">
        Don't have an accuont?{" "}
        <span onClick={() => Navigate("/")}>Register</span>
      </div>
    </section>
  );
};
