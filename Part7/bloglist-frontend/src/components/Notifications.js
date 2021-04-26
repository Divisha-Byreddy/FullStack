import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ messageInfo }) => {
  if(messageInfo !== null && messageInfo.message !== null)
  {
    // const errorStyle = {
    //   color: messageInfo.color,
    //   background: 'lightgrey',
    //   fontSize: '20px',
    //   borderStyle: 'solid',
    //   borderRadius: '5px',
    //   padding: '10px',
    //   marginBottom: '10px',
    // }

    return(
      <div className = 'container'>
        {(messageInfo.message &&
          <Alert variant = {messageInfo.color}>{messageInfo.message}</Alert>
        )}
      </div>
    )
  }
  return null
}

export default Notification