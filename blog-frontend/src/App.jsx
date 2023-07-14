import { useState, useEffect, useRef } from 'react'
import { useQueryClient, useMutation } from 'react-query';
import blogService from './services/blogService';
import loginService from './services/loginService';
import { displayMessage, useNotificationDispatch } from './contexts/notificationContext';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Message from './components/Message';
import Togglable from './components/Togglable';

const App = () => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const JSONUser = window.localStorage.getItem('loggedUser');
    if (JSONUser) {
      const userObject = JSON.parse(JSONUser)
      setUser(userObject);
      blogService.setToken(userObject.token);
    }
  }, [])
  const newBlogMutation = useMutation(blogService.addBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
    }
  });
  const handleLogin = async (credentials) => {
    try {
      const response = await loginService.login(credentials);
      if (response) {
        setUser(response);
      }
      window.localStorage.setItem('loggedUser', JSON.stringify(response));
      blogService.setToken(response.token);
      displayMessage(notificationDispatch, `Successfully logged in as ${response.name}`)
    } catch (error) {
      console.error(error.message);
      displayMessage(notificationDispatch, 'Incorrect Credentials', true);
    }
  }
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
  }
  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject);
    displayMessage(notificationDispatch, 'added new blog');
  }
  return (
    <>
      {( user === null) ? (
        <div className='login'>
          <Message />
          <Togglable buttonLabel='login'>
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
          <Togglable buttonLabel='New Blog'>
            <BlogForm user={user} addBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <BlogList user={user}/>
    </>
  )
}

export default App
