const Notification = ({message}) => {
  const style = {
    border: 'solid',
    borderColor : 'green',
    padding: 5,
    borderWidth: 3
  }
  if(message){
    return(
      <div style = {style}>
        {message}
      </div>
    )
  }
  return null  
}

export default Notification