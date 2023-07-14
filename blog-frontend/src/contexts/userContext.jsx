import { createContext, useContext, useReducer } from 'react';

const userContext = createContext();

const userReducer = (state, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload;
    case 'REMOVE':
      return {
        token: '',
        username: '',
        name: '',
      }
  }
}
export const setUser = (user) => ({
  type: 'SET',
  payload: user,
});
export const removeUser = () => ({
  type: 'REMOVE'
})
export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, {
    token: '',
    username: '',
    name: ''
  });
  return (
    <userContext.Provider value={[user, userDispatch]}>
      {children}
    </userContext.Provider>
  )
}
export const useUserValue = () => {
  const [user, userDispatch] = useContext(userContext);
  return user;
}
export const useUserDispatch = () => {
  const [user, userDispatch] = useContext(userContext);
  return userDispatch;
}