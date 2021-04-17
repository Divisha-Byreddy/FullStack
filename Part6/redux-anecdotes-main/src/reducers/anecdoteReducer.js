import anecdoteService from '../services/anecdote'

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE':
      const anecdoteToChange = state.find(x => x.id === action.data.id)
      return state.map(x => x.id === anecdoteToChange.id ? anecdoteToChange : x )
    case 'CREATE' :
      return [ action.data, ...state]
    case 'INIT_ANECDOTES' :
      return action.data
    default :
    return state
  }
}

export const incrementVote = ( anecdote ) =>{
  return async dispatch => {
    const id = anecdote.id
    anecdote.votes = anecdote.votes + 1
    const updatedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type : 'VOTE',
      data : updatedAnecdote 
    })
  }
}

export const createAnecdote = (content) =>{
  return async dispatch =>{
    const anecdote = await anecdoteService.craeteNew(content)
    dispatch({
      type : 'CREATE',
      data : anecdote
    })
  }
}

export const initialiseAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch({
      type : 'INIT_ANECDOTES',
      data : anecdotes
    })
  }
}

export default anecdoteReducer