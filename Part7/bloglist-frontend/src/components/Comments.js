import React from 'react'
import { addComment } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

const Comments = ({ blog }) => {
  const comments = blog.comments
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    console.log('in')
    const comment = event.target.comment.value
    const updatedComments = [...comments,comment]
    blog.comments = updatedComments
    const response = await blogService.updateComments(blog.id, blog)
    dispatch(addComment(response))
  }

  return(
    <div>
      <h4>Comments</h4>
      <form onSubmit = {handleSubmit}>
        <input name = "comment"/> <Button type = 'submit'>addComment</Button>
      </form>
      <ul>
        {comments.map(comment =>
          <li key = {comment}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Comments