import { incrementVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { setMessage} from '../reducers/messageReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    const filter = state.filter
    if(filter){
      return state.anecdotes.filter(anecdote => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
      })
    }
    return state.anecdotes
  })

  const vote = (anecdote) => {
    dispatch(incrementVote(anecdote))
    dispatch(setMessage(`you voted ${anecdote.content}`,5))
  }

  return(
    <div>
      {_.sortBy(anecdotes, ['votes']).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}   
    </div>
  )
}

export default AnecdoteList