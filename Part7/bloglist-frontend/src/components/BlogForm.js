import React from 'react'
import { Button, Form } from 'react-bootstrap'
import useField from '../hooks/blogForm'
import _ from 'lodash'

const BlogForm = ({ createBlog }) => {
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const handleCreate = (event) => {
    event.preventDefault()
    const blog = {
      title : title.value,
      author : author.value,
      url : url.value
    }
    createBlog(blog)
    title.reset()
    author.reset()
    url.reset()
  }

  return(
    <div className = 'formDiv' >
      <h2>create new</h2>
      <Form onSubmit = { handleCreate }>
        <Form.Group>
          <Form.Label>title :</Form.Label>
          <Form.Control {...(_.omit(title, ['reset']))}/>
          <Form.Label>author :</Form.Label>
          <Form.Control {...(_.omit(author, ['reset']))}/>
          <Form.Label>url :</Form.Label>
          <Form.Control id = 'url' type = "text" value = {url.value}
            onChange = {url.onChange}/>
          <Button id = 'create-submit' type = "submit" >create</Button>
        </Form.Group>
      </Form>
    </div>
  )

}

export default BlogForm