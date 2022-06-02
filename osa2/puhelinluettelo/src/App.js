import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filtertext, setFiltertext] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    
    if (typeof persons.find(({ name }) => name === newName) === 'object') {
      console.log('nimi on jo')
      alert(` ${ newName } is already added to the phonebook `)
    } else {
      const newPerson = {
        name: newName,
        phone: newPhone
      }

      setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNewPhone('')
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
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
        phoneValue={newPhone}
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
