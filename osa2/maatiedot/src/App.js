import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('countries', countries.length)

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }
  
  const filterCountries = () => {
    return countries.filter((value) => {
      value.name.official.toLowerCase().includes(filterText.toLowerCase())
      // checkValue(value)
    })
  }
  
  const checkValue = (value) => {
    if (typeof value === 'string') {
      return value.toLowerCase().includes(filterText.toLowerCase())
    } else if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
      if (Array.isArray(value)) {
        return value.some((v) => checkValue(v))
      } else {
        return Object.values(value).some((v) => checkValue(v))
      }
    } else {
      return false
    }
  }
  
  // console.log(filterCountries())

  return (
    <div>
      <h1>Maiden tiedot</h1>
    <Filter handleChange={handleFilterChange}
      value={filterText}
      countries={countries.filter(( { name }) =>
    name.official.toLowerCase().includes(filterText.toLowerCase()))} />
    </div>
  )
}

export default App
