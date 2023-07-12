import { useState } from 'react';
import { useField } from './hooks';
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate,
} from 'react-router-dom';
import { Table, Alert, Form, Button, Navbar, Nav } from 'react-bootstrap';

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav.Link href='#' as='span'>
          <Link style={padding} to='/'>Home</Link>
        </Nav.Link>
        <Nav.Link href='#' as='span'>
          <Link style={padding} to='/create'>Create New</Link>
        </Nav.Link>
        <Nav.Link href='#' as='span'>
          <Link style={padding} to='/about'>About</Link>
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map((anecdote) => (
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </td>
            <td>
              {anecdote.author}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)
const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((anecdote) => anecdote.id === Number(id));
  return (
    <div className="anecdote">
      <h2>{anecdote.content}</h2>
      <p>By <i>{anecdote.author}</i></p>
      <p>Information: {anecdote.info}</p>
    </div>
  )
}
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, resetContent] = useField('text');
  const [author, resetAuthor] = useField('text');
  const [info, resetInfo] = useField('url');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    navigate('/');
  }
  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Content:</Form.Label>
          <Form.Control name='content' {...content} />
          <Form.Label>Author:</Form.Label>
          <Form.Control name='author' {...author} />
          <Form.Label>Additional Info: </Form.Label>
          <Form.Control name='info' placeholder='https://www.example.org' {...info} />
          <Button variant='primary' type='submit'>Add Anecdote</Button>
          <Button variant='secondary' type='button' onClick={handleReset}>Reset</Button>
        </Form.Group>
      </Form>
    </div>
  )

}

const Notification = ({ notification }) => {
  if (!notification) return;
  return (
    <Alert variant='success'>
      {notification}
    </Alert>
  )
}
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    console.log(anecdote);
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`New Anecdote Created: ${anecdote.content}`);
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className='container'>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        <Notification notification={notification} />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
