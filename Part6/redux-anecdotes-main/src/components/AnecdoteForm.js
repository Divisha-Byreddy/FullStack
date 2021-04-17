import {createAnecdote} from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'

const AnecdoteForm = (props) =>{

  const addAnecdote = async (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setMessage(`you have added ${content}`,5)
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

const mapDispatchToProps = {
  createAnecdote,
  setMessage
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)