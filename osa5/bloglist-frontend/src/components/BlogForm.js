import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      await props.create({
        title, author, url
      })

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      console.log(exception.message)
    }
  }

  return (
    <>
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
    </>
  )
}

BlogForm.propTypes = {
  create: PropTypes.func.isRequired,
}

export default BlogForm