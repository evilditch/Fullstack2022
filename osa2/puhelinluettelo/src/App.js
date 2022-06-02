import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtertext, setFiltertext] = useState('')
  
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('suoritettu', response.data)
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    
    if (typeof persons.find(({ name }) => name === newName) === 'object') {
      console.log('nimi on jo')
      alert(` ${ newName } is already added to the phonebook `)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNewNumber('')
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setFiltertext(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm handleSubmit={addPerson} 
        nameValue={newName}
        handleChangeName={handleNameChange}
        phoneValue={newNumber}
        handleChangePhone={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Filter filtertext={filtertext} handleChange={handleFilterChange} />
      <Persons persons={persons.filter(({ name }) =>
          name.toLowerCase().includes(filtertext.toLowerCase())
        )} />
    </div>
  )

}

export default App
