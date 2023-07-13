import { useState, useEffect, useRef, useContext } from 'react'
import blogService from './services/blogService';
import loginService from './services/loginService';
import sorter from './utils/sorter';
import { setNotification, removeNotification, useNotificationDispatch } from './contexts/notificationContext';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Message from './components/Message';
import Togglable from './components/Togglable';

const App = () => {
  const notificationDispatch = useNotificationDispatch();
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const loginRef = useRef(null);
  const blogRef = useRef(null);
  useEffect(() => {
    blogService.getBlogs().then((response) => {
      setBlogs(sorter(response));
    });
  }, []);
  useEffect(() => {
    const JSONUser = window.localStorage.getItem('loggedUser');
    if (JSONUser) {
      const userObject = JSON.parse(JSONUser)
      setUser(userObject);
      blogService.setToken(userObject.token);
    }
  }, [])
  const displayMessage = (message, error = false) => {
    notificationDispatch(setNotification({
      message,
      error,
    }));
    setTimeout(() => {
      notificationDispatch(removeNotification())
    }, 5000)
  }
  const handleLogin = async (credentials) => {
    try {
      const response = await loginService.login(credentials);
      if (response) {
        setUser(response);
      }
      window.localStorage.setItem('loggedUser', JSON.stringify(response));
      blogService.setToken(response.token);
      displayMessage(`Successfully logged in as ${response.name}`)
    } catch (error) {
      console.error(error.message);
      displayMessage('Incorrect Credentials', true);
    }
  }
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
  }
  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.addBlog(blogObject);
      setBlogs(sorter([...blogs, blog]));
      displayMessage('Successfully created blog');
    } catch (error) {
      displayMessage(error.message, true);
    }
  }
  const addLike = async (blogId) => {
    const correctBlog = blogs.filter((blog) => blog.id === blogId);
    console.log(correctBlog);
    try {
      const updatedBlog = await blogService.updateLikes(correctBlog[0]);
      const changedBlogs = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(sorter([...changedBlogs, updatedBlog]))
      displayMessage(`Blog now has ${updatedBlog.likes} likes`);
    } catch (error) {
      displayMessage(error.message, true);
    }
  }
  const deleteBlog = async (blogId) => {
    const foundBlog = blogs.filter((blog) => blog.id === blogId);
    if( window.confirm(`Are you sure you want to delete ${foundBlog[0].title}`)) {
      try {
        await blogService.deleteBlog(blogId);
        const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
        setBlogs(sorter(updatedBlogs));
        displayMessage(`Successfully deleted ${foundBlog[0].title}`);
      } catch (error)  {
        displayMessage(error.message, error);
      }
    }
  }
  return (
    <>
      {( user === null) ? (
        <div className='login'>
          <Message/>
          <Togglable buttonLabel='login' ref={loginRef}>
            <LoginForm login={handleLogin} />
          </Togglable>
        </div>
      ) : (
        <div>
          <div>
            <h1>Logged In: {user.name}</h1>
            <Message />
            <button onClick={handleLogout}>Logout</button>
          </div>
          <Togglable buttonLabel='New Blog' ref={blogRef}>
            <BlogForm user={user} addBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <BlogList blogs={blogs} addLike={addLike} deleteBlog={deleteBlog} user={user}/>
    </>
  )
}

export default App
