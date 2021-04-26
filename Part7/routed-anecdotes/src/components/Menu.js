import { 
    BrowserRouter as Router,
    Switch, Route,Link, useRouteMatch
  } from 'react-router-dom'
import CreateNew from "./AnecdoteForm"
import AnecdoteList, { Anecdote } from "./Anecdotes"
import About, { Footer } from "./Info"
import Notification from "./Notification"

const Menu = ({anecdotes, addNew, message}) => {
  const padding = {
    paddingRight: 5
  }
  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(x => x.id === match.params.id) : null
  
  return (
    <Router>
      <div>
        <Link style = {padding} to ='/'>anecdotes</Link>
        <Link style = {padding} to = '/create'>create new</Link>
        <Link style = {padding} to = '/about'>about</Link>
      </div>
      <div>
        <Notification message = {message}/>
      </div>

      <Switch>
        <Route path = '/create'>
          <CreateNew addNew = {addNew}/>
        </Route>
        <Route path = '/about'>
          <About />
        </Route>
        <Route path = '/anecdotes/:id'>
          <Anecdote anecdote = {anecdote}/>
        </Route>
        <Route to = '/'>
          <AnecdoteList anecdotes = {anecdotes}/>
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default Menu