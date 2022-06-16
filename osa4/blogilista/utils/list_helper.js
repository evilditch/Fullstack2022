const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((value, blog) => {
    return value + blog.likes
  }, 0)
  return sum
}

const favoriteBlogs = (blogs) => {
  const favorite = blogs.reduce((prev, current) => {
    // console.log(prev)
    return prev.likes > current.likes ? prev : current
  }, { title: '', author: '', likes: 0 })
  return { title: favorite.title, author: favorite.author, likes: favorite.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
}
