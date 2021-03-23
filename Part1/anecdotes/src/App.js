import React, { useState } from 'react'

const Button = ({handleEvent,text}) =>{
  return(
    <button onClick = {handleEvent}>{text}</button>
  )
}

const Header = ({value}) =>{
  return(
    <div>
      <h2>{value}</h2>
    </div>
  )
}

const Text = ({text}) => {
  return(
    <div>
      <p>{text}</p>
    </div>
  )
}

const Votes = ({votes}) =>{
  return(
    <div>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Why do we never have time to do it right, but always have time to do it over?',
    'Simplicity is prerequisite for reliability',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Good judgment comes from experience, and experience comes from bad judgment'
  ]
 
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(new Uint8Array(anecdotes.length))

  //generates a random number on click and updates the state
  const handleClick = () => {
    var randomnumber = Math.floor(Math.random() * (5 + 1))
    setSelected(randomnumber)
  }

  //saves the votes related to a anecdote
  const saveVote = () => {
     var points = {...votes}
     points[selected] += 1
     setVotes(points)
  }

  const anecdoteWithMostVotes = () =>{     
    var max = 0
    for(var i = 0;i < anecdotes.length ; i++){
      if(votes[i]>votes[max])
        max = i
    }
    return max
  }
  
  var maxVoted = anecdoteWithMostVotes()

  return (
    
    <div>
      <Header value = 'Anecdote of the Day' />
      <Text text = {anecdotes[selected]}/>
      <Votes votes = {votes[selected]}/>
      <Button handleEvent = {saveVote} text = 'vote'/>
      <Button handleEvent = {handleClick}  text = 'next anecdote' />
      <Header value = 'Anecdote with most votes' />
      <Text text = {anecdotes[maxVoted]}/>
      <Votes votes={votes[maxVoted]}/>
    </div>
  )
}

export default App