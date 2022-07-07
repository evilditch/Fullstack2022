import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    props.login({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Login to bloglist</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' value={username} onChange={({ target }) => setUsername(target.value)} />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        <button type='submit' id='loginbutton'>Login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm
