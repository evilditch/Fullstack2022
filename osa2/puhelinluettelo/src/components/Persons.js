const Person = ({ name, number }) => {
  return (
    <p>{name}: {number}</p>
  )
}

const Persons = ({ persons }) => {
  return (
    <>
      { persons.map((person) =>
        <Person key={person.name}
          name={person.name}
          number={person.number} />
      )}
    </>
  )
}

export default Persons
