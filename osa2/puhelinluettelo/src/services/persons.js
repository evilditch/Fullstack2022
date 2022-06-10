import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObj) => {
  return axios.post(baseUrl, newObj)
}

const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, deletePerson }