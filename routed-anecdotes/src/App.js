import { useState } from 'react';
import { useField } from './hooks';
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate,
} from 'react-router-dom';
import { Container, TableContainer, Table, TableBody, TableRow, TableCell, Paper, TextField, Button , Alert, AppBar, Toolbar } from '@mui/material';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`
const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const StyledFooter = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          Home
        </Button>
        <Button color='inherit' component={Link} to='/create'>
          Create New
        </Button>
        <Button color='inherit' component={Link} to='/about'>
          About
        </Button>
      </Toolbar>
    </AppBar>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {anecdotes.map((anecdote) => (
            <TableRow key={anecdote.id}>
              <TableCell>
                <Link to={`/anecdotes/${anecdote.id}`}>
                  {anecdote.content}
                </Link>
              </TableCell>
              <TableCell>
                {anecdote.author}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
  <StyledFooter>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </StyledFooter>
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
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label='Content' {...content} />
        </div>
        <div>
          <TextField label='Author: ' {...author} />
        </div>
        <div>
          <TextField label='Info: ' placeholder='https://example.org' {...info} />
        </div>
        <div>
          <Button variant='contained' type='submit' color='primary'>Add Anecdote</Button>
        </div>
        <div>
          <StyledButton type='button' primary='' onClick={handleReset}>Reset</StyledButton>
        </div>
      </form>
    </div>
  )

}

const Notification = ({ notification }) => {
  if (!notification) return;
  return (
    <Alert severity='success'>
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
    <Container>
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
    </Container>
  )
}

export default App
