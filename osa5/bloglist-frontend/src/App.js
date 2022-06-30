import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
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
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      console.log('kirjautuminen onnistui')
    } catch(exception) {
      console.log(exception)
      setMessage('Username or password incorrect')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  
  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      title, author, url
    }
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(exception) {
      console.log('lisäys ei onnistunutkaan', exception)
    }
  }
  
  const logOut = (event) => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }
  
  if (user === null) {
    return (
      <>
      <Notification message={message} />
      <h2>Login to bloglist</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' value={username} onChange={({ target }) => setUsername(target.value)} />
        <label htmlFor='password'>Password</label>
      <input type='password' id='password' value={password} onChange={({ target }) => setPassword(target.value)} />
      <button type='submit'>Login</button>
      </form>
      </>
    )
  }

  return (
    <div>
    <Notification message={message} />
    <p>{user.username} logged in <button onClick={logOut}>Log out</button></p>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>Add new blog</h2>
      <form onSubmit={handleCreate}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        <label htmlFor='author'>Author</label>
        <input type='text' id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        <label htmlFor='url'>Url</label>
        <input type='text' id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default App
