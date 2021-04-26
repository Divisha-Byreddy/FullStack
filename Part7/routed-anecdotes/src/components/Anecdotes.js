import { Link } from "react-router-dom"

export const Anecdote = ({anecdote}) => {
  const padding = {
    paddingBottom: 10
  }
  return(
    <div>
      <h2>{anecdote.content}</h2>
      <div style = {padding}>has {anecdote.votes} votes</div>
      <div style = {padding}>
        for more info see <a href = {anecdote.info}> {anecdote.info}</a>
      </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return(
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id} >
            <Link to = {`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>)
        }
      </ul>
    </div>
  )
}

export default AnecdoteList