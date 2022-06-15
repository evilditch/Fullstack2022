import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObj) => {
  return axios.post(baseUrl, newObj)
}

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj)
  return request.then(res => res.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deletePerson }