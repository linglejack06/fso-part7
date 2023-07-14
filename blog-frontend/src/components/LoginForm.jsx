import { useState } from 'react';
import blogService from '../services/blogService';
import loginService from '../services/loginService';
import { displayMessage, useNotificationDispatch } from '../contexts/notificationContext';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const notificationDispatch = useNotificationDispatch();
  const handleChange = (e) => {
    switch(e.target.name) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login({username, password});
      if (response) {
        // add user ...
      }
      blogService.setToken(response.token);
      window.localStorage.setItem('loggedUser', JSON.stringify(response));
      displayMessage(notificationDispatch, `Successfully logged in as ${response.name}`);
    } catch (error) {
      console.error(error.message);
      displayMessage(notificationDispatch, 'Incorrect credentials', true);
    }
    setUsername('');
    setPassword('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='input-container'>
        <label htmlFor='username'>Username: </label>
        <input type='text' id='username' name='username' value={username} onChange={handleChange} />
      </div>
      <div className='input-container'>
        <label htmlFor='password'>Password: </label>
        <input type='password' id='password' name='password' value={password} onChange={handleChange} />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm;