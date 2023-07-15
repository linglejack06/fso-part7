import { useEffect, useRef } from 'react'
import { setUser, removeUser, useUserDispatch, useUserValue } from './contexts/userContext';
import blogService from './services/blogService';
import { useNotificationDispatch } from './contexts/notificationContext';
import BlogList from './components/BlogList';
import User from './components/User';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Message from './components/Message';
import Togglable from './components/Togglable';

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();
  useEffect(() => {
    const JSONUser = window.localStorage.getItem('loggedUser');
    if (JSONUser) {
      const userObject = JSON.parse(JSONUser)
      userDispatch(setUser(userObject));
      blogService.setToken(userObject.token);
    }
  }, [])
  const handleLogout = () => {
    userDispatch(removeUser());
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
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
      <BlogList />
      <User />
    </>
  )
}

export default App
