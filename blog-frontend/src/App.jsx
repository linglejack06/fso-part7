import { useEffect } from "react";
import { setUser, useUserDispatch, useUserValue } from "./contexts/userContext";
import blogService from "./services/blogService";
import NavBar from "./components/NavBar";
import Users from "./components/Users";
import User from "./components/User";
import BlogList from "./components/BlogList";
import ExpandedBlog from "./components/ExpandedBlog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Message from "./components/Message";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();
  useEffect(() => {
    const JSONUser = window.localStorage.getItem("loggedUser");
    if (JSONUser) {
      const userObject = JSON.parse(JSONUser);
      userDispatch(setUser(userObject));
      blogService.setToken(userObject.token);
    }
  }, []);
  return (
    <div className="min-w-screen min-h-screen text-purple-950">
      <NavBar />
      <Message />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<ExpandedBlog />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/create"
          element={user ? <BlogForm /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<LoginForm signup={true} />} />
      </Routes>
    </div>
  );
};

export default App;
