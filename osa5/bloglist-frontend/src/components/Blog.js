import { useState } from 'react'

const Blog = ({ blog, like, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const expand = () => {
    setExpanded(!expanded)
  }

  const handleLike = (event) => {
    event.preventDefault()
    like(blog)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  return (
    <div className='blog'>
      <button onClick={expand} aria-expanded={expanded}>{blog.title} {blog.author} { expanded ? '-' : '+' }</button>
      { expanded &&
      <div className='blog-meta' style={showWhenExpanded}>
        <dl>
          <dt>Url</dt><dd>{blog.url}</dd>
          <dt>Likes</dt><dd>{blog.likes}</dd>
          <dt>User</dt><dd>{blog.user.username}</dd>
        </dl>
        <button onClick={handleLike}>Like</button>
        { deleteBlog && <button onClick={handleDelete}>Delete</button>}
        <button onClick={expand}>Hide</button>
      </div> }
    </div>
  )
}

export default Blog