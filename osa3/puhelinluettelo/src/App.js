import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtertext, setFiltertext] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  
  
  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setNewName('')
    setNewNumber('')

    const existingPerson = persons.find(p => p.name === newPerson.name)

    if (existingPerson) {
      const ok = window.confirm(`${existingPerson.name} is already added to the phonebook, update the number?`)
      if (ok) {
        personService.update(existingPerson.id, {...existingPerson, number: newPerson.number}).then(updatedPerson => {
          setPersons(persons.map(p => p.id === existingPerson.id ? updatedPerson : p))
          newMessage(`Updated info of ${updatedPerson.name}`)
        })
        .catch(error => {
          if (error.response.status === 404) {
            newMessage(`The person '${existingPerson.name}' was already removed from server`)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            return
          }
          newMessage(error.response.data.error)
        })
        
        return
      }
    }

    personService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data))
        newMessage(`${response.data.name} was added succesfully `)
      })
      .catch(error => {
        console.log(error.response.data)
        newMessage(error.response.data.error)
      })

  }

  const newMessage = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 6000)
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
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Are you sure you want to delete ${name} from phonebook? `)) {
      personService.deletePerson(id)
      setPersons(persons.filter((person) => person.id !== id))
      newMessage(`${name} deleted`)
    }
    
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
    <Notification message={notificationMessage} />
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
