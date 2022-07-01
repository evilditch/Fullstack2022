import { useState } from 'react'

const Blog = ({blog, like}) => {
  const [expanded, setExpanded] = useState(false)
  
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const expand = (event) => {
    setExpanded(!expanded)
  }
  
  const handleLike = (event) => {
    event.preventDefault()
    like(blog)
  }

  return (
    <div>
      <button onClick={expand} aria-expanded={expanded}>{blog.title} {blog.author} { expanded ? '-' : '+' }</button>
      <div style={showWhenExpanded}>
        <dl>
          <dt>Url</dt><dd>{blog.url}</dd>
          <dt>Likes</dt><dd>{blog.likes}</dd>
      <dt>User</dt><dd>{blog.user.username}</dd>
        </dl>
        <button onClick={handleLike}>Like</button>
      <button onClick={expand}>Hide</button>
      </div>
    </div>  
  )
}

export default Blog