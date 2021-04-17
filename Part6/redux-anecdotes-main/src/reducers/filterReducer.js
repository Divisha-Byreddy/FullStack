const filterReducer = (state = null, action) => {
  switch(action.type){
    case 'FILTER_ANECDOTES':
      return action.value
  }
  return state
}

export const setFilter = (value) =>{
  return {
    type : 'FILTER_ANECDOTES',
    value
  }
}

export default filterReducer