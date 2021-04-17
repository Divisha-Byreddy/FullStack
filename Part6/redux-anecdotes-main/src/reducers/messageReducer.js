const messageReducer = (state = null,action) =>{
  switch(action.type){
    case 'SET_MESSAGE' :
      return action.message
    case 'REMOVE_MESSAGE' :
      return null
  }
  return state
}

export const setMessage = (message,time) =>{
  return dispatch => {
    dispatch({
      type : 'SET_MESSAGE',
      message
    })
    setTimeout(() =>{
      dispatch({
        type : 'REMOVE_MESSAGE'
      })
    },time*1000)
  }
}

export const clearMessage = () =>{
  return{
    type : 'REMOVE_MESSAGE' 
  }
}

export default messageReducer