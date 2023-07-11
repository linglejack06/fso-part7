import {
  browserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom';

function App() {
  const padding = {
    padding: 5,
  };
  return (
    <Router>
      <div>
        <Link style={padding} to='/'>Home</Link>
        <Link style={padding} to='/notes'>Notes</Link>
        <Link style={padding} to='/users'>Users</Link>
      </div>
      <Routes>
        <Route path='/notes' element={<Notes />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2023</i>
      </div>
    </Router>
  )
}

export default App
