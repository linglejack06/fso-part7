import { useEffect } from 'react'
import { setUser, useUserDispatch, useUserValue } from './contexts/userContext';
import blogService from './services/blogService';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Message from './components/Message';
import { Navigate, Route, Routes } from 'react-router-dom';

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
  return (
    <>
      <NavBar />
      <Message />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={user 
          ? <Users /> 
          : <Navigate replace to='/login' />}
        />
        <Route path='/create' element={<BlogForm />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </>
  )
}

export default App
