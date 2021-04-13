import React, { useState } from 'react'

const Blog = ({ blog , incrementVote, removeBlog }) => {
  const [show, setShow] = useState(false)
  const blogStyle = {
    borderStyle : 'solid',
    borderRadius : 5,
    padding : 5,
    marginBottom : 5,
    marginTop : 1,
    borderWidth : 1
  }

  const updateVotes = () => {
    const blogToUpdate = {
      title : blog.title,
      author : blog.author,
      url : blog.url,
      likes : Number(blog.likes + 1)
    }
    incrementVote(blog.id, blogToUpdate)
  }

  const handleClick = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog.id)
    }
  }

  const deleteBlogOption = () => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser && blog.user){
      const user = JSON.parse(loggedUser)
      if(user.username === blog.user.username){
        return(
          <div>
            <button id = 'remove-button' onClick = {handleClick}>remove</button>
          </div>
        )
      }
    }
  }

  if(!show){
    return(
      <div style = {blogStyle} className = 'blogs'>
        {blog.title} {blog.author} <button onClick = {() => setShow(!show)}>view</button>
      </div>
    )
  }

  return(
    <div style = {blogStyle} className = "blog">
      <div>{blog.title} <button onClick = {() => setShow(!show)}>hide</button></div>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick = {updateVotes}>like</button></div>
      <div>{blog.author}</div>
      {deleteBlogOption()}
    </div>
  )

}

export default Blog