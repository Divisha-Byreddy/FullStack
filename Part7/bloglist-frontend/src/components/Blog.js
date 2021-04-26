import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import Comments from './Comments'
import _ from 'lodash'
import blogService from '../services/blogs'
import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'

export const Blog = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const dispatch = useDispatch()
  const history = useHistory()

  if(!blog)
    return null

  const updateVotes = async () => {
    const blogToUpdate = {
      title : blog.title,
      author : blog.author,
      url : blog.url,
      likes : Number(blog.likes + 1)
    }
    try{
      const response = await blogService.updateBlog(id, blogToUpdate)
      dispatch(voteBlog(response))
      dispatch(setMessage({ message : `Incremented the likes of ${blogToUpdate.title} by one` , color : 'success' },5))
    }catch(exception){
      dispatch(setMessage({ message : `failed to update ${blogToUpdate.title} likes` , color : 'danger' },5))
    }
  }

  const handleClick = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      try{
        await blogService.deleteBlog(id)
        dispatch(deleteBlog(id))
        dispatch(setMessage({ message : 'deletion of blog is successful' , color : 'success' },5))
      }catch(exception){
        dispatch(setMessage({ message : 'failed to delete blog' , color : 'danger' },5))
      }
    }
    history.push('/')
  }

  const deleteBlogOption = () => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser && blog.user){
      const user = JSON.parse(loggedUser)
      if(user.username === blog.user.username){
        return(
          <div>
            <Button id = 'remove-button' onClick = {handleClick}>remove</Button>
          </div>
        )
      }
    }
  }

  return(
    <div >
      <div> <h1>{blog.title} </h1></div>
      <div>{blog.url}</div>
      <div>{blog.likes} likes<Button onClick = {updateVotes}>like</Button></div>
      <div>added by {blog.author}</div>
      {deleteBlogOption()}
      <Comments blog = {blog}/>
    </div>
  )
}


const BlogList = ({ blogs }) => {

  return(
    <Table striped>
      <tbody>
        {_.sortBy(blogs , ['likes']).reverse().map(blog =>
          <tr key={blog.id}>
            <td>
              <Link to = {`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
            <td>{blog.author}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )

}

export default BlogList