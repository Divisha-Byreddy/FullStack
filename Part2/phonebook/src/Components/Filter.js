import React from 'react';

const Filter = ({searchNames}) =>{
  return(
      <div>
          filter shown with <input onChange = {searchNames}></input>
      </div>
  )
}

export default Filter