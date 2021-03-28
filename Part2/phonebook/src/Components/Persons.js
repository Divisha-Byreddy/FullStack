import React from 'react';

const Person = ({person, onClick}) =>{
    return(
        <div>
          <li> {person.name} {person.number} <button onClick = {onClick}>delete</button></li>
        </div>
    )
}

export default Person