let timer
const messageReducer = (state = null,action) => {
  switch(action.type){
  case 'SET_MESSAGE':
    return action.data
  case 'REMOVE_MESSAGE':
    return null
  default:
    return state
  }
}

const restartTimer = (dispatch,time) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    dispatch({
      type : 'REMOVE_MESSAGE'
    })
  },time*1000)
}

export const setMessage = ({ message,color },time) => {
  return dispatch => {
    dispatch({
      type : 'SET_MESSAGE',
      data : {
        message,
        color
      }
    })
    restartTimer(dispatch,time)
  }
}

export default messageReducer