import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
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
  
  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data)
      })
  }, [])
  
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

      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }

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
  
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete ${persons.find(person => person.id === id).name} from phonebook? `)) {
      personService.deletePerson(id)
      setPersons(persons.filter((person) => person.id !== id))
    }
    
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
        )}
        handleDelete={handleDelete} />
    </div>
  )

}

export default App
