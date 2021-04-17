import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initialiseAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdote'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(initialiseAnecdotes())  
  },[])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App