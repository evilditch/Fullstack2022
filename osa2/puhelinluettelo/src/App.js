import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '...' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <label htmlFor='name'>Name:</label>
        <input id='name'
          type='text'
          value={newName}
          onChange={handleNameChange} />
        <label htmlFor='phone'>Phone:</label>
        <input id='phone'
          type='text'
          value={newPhone}
          onChange={handlePhoneChange} />
        <button type="submit">Add</button>
      </form>
      <h2>Numbers</h2>
          { persons.map(
            (person) =>
            <p key={person.name}>{person.name}: {person.phone}</p>
          )}
    </div>
  )

}

export default App
