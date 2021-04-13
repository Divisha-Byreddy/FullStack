import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    const blog = {
      title : title,
      author : author,
      url : url
    }
    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div className = 'formDiv' >
      <h2>create new</h2>
      <form onSubmit = { handleCreate }>
        <div>
          title :
          <input id = 'title' type = "text" value = {title}
            onChange = {({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author :
          <input id='author' type = "text" value = {author}
            onChange = {({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url :
          <input id = 'url' type = "text" value = {url}
            onChange = {({ target }) => setUrl(target.value)}/>
        </div>
        <button id = 'create-submit' type = "submit">create</button>
      </form>
    </div>
  )

}

export default BlogForm