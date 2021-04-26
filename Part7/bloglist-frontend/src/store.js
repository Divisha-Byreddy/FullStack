import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'
import usersReducer from './reducers/usersReducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'

const reducer = combineReducers({
  errorMessage : messageReducer,
  blogs : blogReducer,
  user : userReducer,
  users : usersReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store