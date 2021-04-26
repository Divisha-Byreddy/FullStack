  
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = () =>[
    setValue('')
  ]

  return {
    type,
    value,
    onChange,
    resetValue
  }
}

const useResource =  (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setResources(response.data)
    })
  },[baseUrl])

  const create = (resource) => {
    console.log(resource);
    if(resource){
      axios.post(baseUrl,resource).then(response => {
        setResources(resources.concat(resource))
      })
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.resetValue()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.resetValue()
    number.resetValue()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...(_.omit(content, ['resetValue']))} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...(_.omit(name, ['resetValue']))} /> <br/>
        number <input {...(_.omit(number, ['resetValue']))} />
        <button>create</button>
      </form>
      {persons.map(n => <li key={n.id}>{n.name} {n.number}</li>)}
    </div>
  )
}

export default App