import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

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

  const newMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const login = async (userObject) => {
    try {
      const loggedUser = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      console.log('kirjautuminen onnistui')
    } catch(exception) {
      console.log(exception)
      newMessage('Username or password incorrect')
    }
  }
  
  const handleCreate = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
    
      newMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch(exception) {
      console.log('lisäys ei onnistunutkaan', exception)
    }
  }
  
  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.updateLikes(blog)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    } catch(exception) {
      console.log(exception)
    }
  }
  
  const handleDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to delete blog '${blog.title}'?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        newMessage(`Blog '${blog.title}' deleted`)
      } catch(exception) {
        console.log(exception)
      }
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
        <LoginForm login={login} />
      </>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <p>{user.username} logged in <button onClick={logOut}>Log out</button></p>
      <h2>blogs</h2>
    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} like={handleLike} deleteBlog={blog.user.username === user.username ? handleDelete : null} />
      )}
      <Togglable buttonLabel='Add a blog' ref={blogFormRef}>
        <BlogForm create={handleCreate} />
      </Togglable>
    </div>
  )
}

export default App
