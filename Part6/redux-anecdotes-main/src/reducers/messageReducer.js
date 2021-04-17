let timer

const messageReducer = (state = null,action) =>{
  switch(action.type){
    case 'SET_MESSAGE' :
      return action.message
    case 'REMOVE_MESSAGE' :
      return null
  }
  return state
}

const restartTimer = (dispatch,time) => {
  clearTimeout(timer)
  timer = setTimeout(() =>{
      dispatch({
        type : 'REMOVE_MESSAGE'
      })
    },time*1000)
}

export const setMessage = (message,time) =>{
  return dispatch => {
    dispatch({
      type : 'SET_MESSAGE',
      message
    })
    restartTimer(dispatch,time)
  }
}

export default messageReducer