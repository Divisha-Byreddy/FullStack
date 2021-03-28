import React from 'react';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((total,part)=> total+part.exercises,0)
    return(
      <h4>total of {sum} exercises</h4>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    var parts = course.parts
    console.log(parts);
    return (
      <div>
        {parts.map(part => <Part key = {part.id} part ={part}/>)}
      </div>
    )
  }
  
  const Course = ({course}) =>{
    return(
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course