import { useState } from 'react';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    await login({
      username, password,
    })
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