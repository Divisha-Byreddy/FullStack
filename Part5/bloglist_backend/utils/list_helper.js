const  dummy = (blogs) =>{
  return 1
}

const totalLikes = (blogs) =>{
  const reducer = (sum,initialValue) =>{
    return sum + initialValue
  }  
  const likes = blogs.map(x => x.likes)
  return likes.reduce(reducer,0)
}

const favoriteBlog = (blogs) =>{
  let maxLikes = 0
  let id = 0
  blogs.map(x =>{
    if(x.likes >maxLikes){
      maxLikes = x.likes
      id = x.id
    }
  })
  return blogs.length === 0 ? 0 : blogs.find(x => x.id == id)
}

const mostBlogs = (blogs) =>{
  var authors = blogs.map(x => x.author)
  if(blogs.length === 0)
    return 0

  let result = []
  var maxBlogAuthor = authors[0]
  var maxBlogs = 1
  authors.forEach(author => {
    if(!Object.prototype.hasOwnProperty.call(result,author))
      result[author] = 1
    else
      result[author]++
    if(result[author]>maxBlogs)
    {
      maxBlogs = result[author]
      maxBlogAuthor = author
    }
  })

  result = {
    author: maxBlogAuthor,
    blogs: maxBlogs
  }
  return  result
}

const mostLikes = (blogs) =>{
  if(blogs.length === 0)
    return 0
  
  let result = {}
  var maxLikesAuthor = blogs[0].author
  var maxLikes = 1
  blogs.forEach(blog => {
    var author = blog.author
    var likes = blog.likes
    if(!Object.prototype.hasOwnProperty.call(result,author))
      result[author] = Number(likes)
    else
      result[author] = result[author] + Number(likes)
    if(result[author]>maxLikes)
    {
      maxLikes = result[author]
      maxLikesAuthor = author
    }
  })
  
  result = {
    author: maxLikesAuthor,
    likes: maxLikes
  }
  return  result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}