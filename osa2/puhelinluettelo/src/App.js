import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    
    if (typeof persons.find(({ name }) => name === newName) === 'object') {
      console.log('nimi on jo')
      alert(` ${ newName } is already added to the phonebook `)
    } else {
      const newPerson = {
        name: newName
      }

      setPersons(persons.concat(newPerson))
    }

    setNewName('')
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <label htmlFor='name'>name:</label>
        <input id='name'
          type='text'
          value={newName}
          onChange={handleNameChange} />
        <button type="submit">Add</button>
      </form>
      <h2>Numbers</h2>
          { persons.map(
            (person) =>
            <p key={person.name}>{person.name}</p>
          )}
    </div>
  )

}

export default App
