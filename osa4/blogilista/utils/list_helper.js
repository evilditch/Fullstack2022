const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((value, blog) => {
    return value + blog.likes
  }, 0)
  console.log(sum)
  return sum
}

module.exports = {
  dummy,
  totalLikes,
}
