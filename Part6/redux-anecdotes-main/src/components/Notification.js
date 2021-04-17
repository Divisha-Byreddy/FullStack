import React from 'react'
import {  connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.message
    
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification){
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return({
    anecdotes : null,
    message : state.message,
    filter : null
  })
}


export default connect(mapStateToProps)(Notification)