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
    if (password.length <= 3 || username.length <= 3) {
      displayMessage(
        notificationDispatch,
        "Username and password must be at least 4 characters",
        true,
      );
      return;
    }
    if (signup && name.length <= 3) {
      displayMessage(
        notificationDispatch,
        "Name must be at least 4 characters",
        true,
      );
      return;
    }
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
    <div className="mx-auto w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mb-4 h-full rounded-lg bg-orange-100 px-8 pb-8 pt-6 shadow-lg ring-2 ring-orange-200"
      >
        <h2 className="mb-2 text-center text-xl font-bold">
          Login to Blog-it!
        </h2>
        <div className="mb-2">
          <label
            htmlFor="username"
            className="text-md mb-2 block font-semibold text-orange-600"
          >
            Username{" "}
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            required
            onChange={handleChange}
            className="h-7 rounded-lg border-2 border-purple-950 bg-orange-100 px-4 font-semibold outline-none hover:border-purple-700 focus:border-orange-600"
          />
        </div>
        {signup ? (
          <div className="mb-2">
            <label
              htmlFor="name"
              className="text-md block font-semibold text-orange-600"
            >
              Name{" "}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={handleChange}
              className="mb-2 h-7 rounded-lg border-2 border-purple-950 bg-orange-100 px-4 font-semibold outline-none hover:border-purple-700 focus:border-orange-600"
            />
          </div>
        ) : null}
        <div className="mb-2">
          <label
            htmlFor="password"
            className="text-md block font-semibold text-orange-600"
          >
            Password{" "}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={handleChange}
            className="mb-2 h-7 rounded-lg border-2 border-purple-950 bg-orange-100 px-4 font-semibold outline-none hover:border-purple-700 focus:border-orange-600"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="text-md h-7 w-1/2 rounded-lg bg-purple-600 px-4 text-center font-semibold text-white transition duration-200 hover:scale-105 hover:bg-purple-700 hover:font-bold"
            type="submit"
          >
            {signup ? "Sign up" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
