import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogService";
import loginService from "../services/loginService";
import {
  displayMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import { setUser, useUserDispatch } from "../contexts/userContext";
import userService from "../services/userService";

const LoginForm = ({ signup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signup) {
        await userService.addUser({ username, password, name });
      }
      const response = await loginService.login({ username, password });
      if (!response) {
        return;
      }
      userDispatch(setUser(response));
      blogService.setToken(response.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(response));
      displayMessage(
        notificationDispatch,
        `Successfully logged in as ${response.name}`,
      );
    } catch (error) {
      console.error(error.message);
      const message = signup
        ? "Error Signing Up. Try Again Later"
        : "Incorrect credentials";
      displayMessage(notificationDispatch, message, true);
    }
    setUsername("");
    setPassword("");
    setName("");
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          className="h-7 rounded-lg border-2 border-purple-950 bg-orange-100 px-4 font-semibold outline-none hover:border-purple-700 focus:border-orange-600"
        />
      </div>
      {signup ? (
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="h-7 rounded-lg border-2 border-purple-950 bg-orange-100 px-4 font-semibold outline-none hover:border-purple-700 focus:border-orange-600"
          />
        </div>
      ) : null}
      <div className="input-container">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="h-7 rounded-lg border-2 border-purple-950 bg-orange-100 px-4 font-semibold outline-none hover:border-purple-700 focus:border-orange-600"
        />
      </div>
      <button
        type="submit"
        className="text-md h-7 rounded-lg bg-purple-600 px-4 text-center font-semibold text-white transition duration-200 hover:scale-105 hover:bg-purple-700 hover:font-bold"
      >
        {signup ? "Sign up" : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
