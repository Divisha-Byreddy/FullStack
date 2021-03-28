import React from 'react';

const Notification = ({messageInfo}) => {
 
  if(messageInfo != null && messageInfo.message != null)
  {
    const errorStyle = {
        color: messageInfo.color,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
      }

      return(
        <div style = {errorStyle}>
            {messageInfo.message}
        </div>
    )
  }  
  return null
}

export default Notification