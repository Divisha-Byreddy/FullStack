import {createAnecdote} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'

const AnecdoteForm = () =>{
  const dispatch = useDispatch()

  const addAnecdote = async (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setMessage(`you have added ${content}`),5)
  }
  return(
      <div>
        <h2>create new</h2>
        <form onSubmit = {addAnecdote}>
        <div><input name= 'anecdote'/></div>
        <button type = 'submit'>create</button>
      </form>
      </div>
  )
}

export default AnecdoteForm