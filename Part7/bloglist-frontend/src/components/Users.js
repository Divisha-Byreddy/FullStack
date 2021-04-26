import React from 'react'
import { ListGroup, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

export const UserList = ({ users }) => {
  return(
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
          {users.map(user =>
            <tr key = {user.id}>
              <td>
                <Link to = {`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(user => user.id === id)
  if(!user)
    return null
  return(
    <div>
      <h2>{user.username}</h2>
      <div>
        <h4>added blogs</h4>
        <ListGroup as = "ul">
          {user.blogs.map(blog =>
            <ListGroup.Item variant = 'info' key = {blog.id}>
              {blog.title}
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </div>
  )
}

export default User