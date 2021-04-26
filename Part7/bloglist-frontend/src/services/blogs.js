import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async newBlog => {
  const config = {
    headers : { Authorization : token },
  }
  const response = await axios.post(baseUrl,newBlog,config)
  return response.data
}

const updateBlog = async ( id, blog ) => {
  const config = {
    headers : { Authorization : token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, blog,config)
  return response.data
}

const updateComments = async (id,blog) => {
  const response = await axios.put(`${baseUrl}/${id}/comments`,blog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers : { Authorization : token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}

export default { getAll , setToken , createNew , updateBlog , deleteBlog, updateComments }