import React, { useEffect, useState } from 'react';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Person from './Components/Persons';
import personService from './services/person'
import Notification from './Components/Notification'

const App = () => {
  const [persons , setPersons] = useState([])
  const [newName , setNewName] = useState('')
  const [newNumber , setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [errorMessage, setErrorMessage] = useState([])

  const hook = () => {
    personService.getPersons().then(data => {
        setPersons(data)
        setFilteredPersons(data)
      })
  }
  
  useEffect(hook, [])

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const savePerson = (event) =>{
    event.preventDefault()
    console.log(newName);
    if(newName === '' || newNumber === '')
      return window.alert(`please enter valid data`)
    var newPerson = {name : newName , number : newNumber,id: persons.length + 1}
    var existingPerson = persons.find(person =>person.name.toLowerCase().includes(newName.toLowerCase()))
    if(existingPerson)
    {
      if(existingPerson.number !== newNumber)
      {
        if(window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)){
          newPerson.id = existingPerson.id
          personService.updatePerson(existingPerson.id,newPerson).then(updatedPerson => {
            setPersons(persons.map(x => x.id !== existingPerson.id ? x : newPerson))
            setFilteredPersons(filteredPersons.map(x => x.id !== existingPerson.id ? x : newPerson))
            setErrorMessage({message :`Added ${newName}`,color : 'green'})
            setTimeout(() => {setErrorMessage(null)}, 5000)
          }).catch(error =>{
            setErrorMessage({message :`Information of ${newName} has already been removed from server`,color : 'red'})
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
        }
      }
      else 
      window.alert(`${newName} is already added to the phonebook`)
    }
    else{
      personService.addPerson(newPerson).then(data =>{
        setPersons(persons.concat(data))
        setFilteredPersons(filteredPersons.concat(data))
        setErrorMessage({message :`Added ${newName}`,color : 'green'})
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })
      
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) =>{
    var id = person.id
    if(window.confirm(`Delete ${person.name} ?`)){
      personService.removePerson(id).then(data => {
        setPersons(persons.filter(x => x.id !== id))
        setFilteredPersons(filteredPersons.filter(x => x.id !== id))
      }).catch(error =>{
        alert( `Invalid person`)
        setPersons(persons.filter(x => x.id !== id))
        setFilteredPersons(filteredPersons.filter(x => x.id !== id))
      }
      )
    }
  }

  const searchNames = (event) =>{
     var value = event.target.value
     var searchResult = persons.filter(person =>{
       return person.name.toLowerCase().includes(value.toLowerCase())
     })
    setFilteredPersons(searchResult)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification messageInfo = {errorMessage}/>
      <Filter searchNames={searchNames}/>
      <h2>add a new</h2>
      <PersonForm newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange={handleNumberChange} savePerson = {savePerson}/>
      <h2>Numbers</h2>
      {filteredPersons.map(person => 
        <Person key={person.id} person = {person} onClick = {() => removePerson(person)} />
      )}
    </div>
  )
}

export default App