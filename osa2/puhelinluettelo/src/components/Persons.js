const Person = ({ name, phone }) => {
  return (
    <p>{name}: {phone}</p>
  )
}

const Persons = ({ persons }) => {
  return (
    <>
      { persons.map((person) =>
        <Person key={person.name}
          name={person.name}
          phone={person.phone} />
      )}
    </>
  )
}

export default Persons
