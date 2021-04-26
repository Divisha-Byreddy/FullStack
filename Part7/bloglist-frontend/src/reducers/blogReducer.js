const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'CREATE_NEW':
    return [action.data, ...state]
  case 'INIT_BLOGS':
    return action.data
  case 'INCREMENT_VOTE':
    return state.map(x => x.id === action.data.id ? action.data : x)
  case 'REMOVE' :
    return state.filter(x => x.id !== action.id)
  case 'ADD_COMMENT':
    return state.map(x => x.id === action.blog.id ? action.blog : x)
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return{
    type : 'CREATE_NEW',
    data : blog
  }
}

export const initialiseBlogs = (blogs) => {
  return{
    type : 'INIT_BLOGS',
    data : blogs
  }
}

export const voteBlog = (updatedBlog) => {
  return{
    type : 'INCREMENT_VOTE',
    data : updatedBlog
  }
}

export const deleteBlog = (id) => {
  return{
    type : 'REMOVE',
    id
  }
}

export const addComment = (blog) => {
  return{
    type : 'ADD_COMMENT',
    blog
  }
}

export default blogReducer