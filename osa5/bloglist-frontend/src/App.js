import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])  

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loggedUser)
      )
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      console.log('kirjautuminen onnistui')
    } catch(exception) {
      console.log('ei onnaa')
    }
  }
  
  const logOut = (event) => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }
  
  if (user === null) {
    return (
      <>
      <h2>Login to bloglist</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' onChange={({ target }) => setUsername(target.value)} />
        <label htmlFor='password'>Password</label>
      <input type='password' id='password' onChange={({ target }) => setPassword(target.value)} />
      <button type='submit'>Login</button>
      </form>
      </>
    )
  }

  return (
    <div>
    <p>{user.username} logged in <button onClick={logOut}>Log out</button></p>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
