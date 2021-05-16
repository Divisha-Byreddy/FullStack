import React from 'react';

interface CoursePartBase{
  name : string,
  exerciseCount : number,
  type : string
}

interface Description extends CoursePartBase{
  description : string
}

interface CourseNormalPart extends Description{
  type : "normal",
}

interface CourseProjectPart extends CoursePartBase{
  type : "groupProject",
  groupProjectCount : number
}

interface CourseSubmissionPart extends Description{
  type : "submission",
  exerciseSubmissionLink : string
}

interface CourseSpecialPart extends Description{
  type : "special",
  requirements : Array<string>
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


const Header = ({name} : {name : string}) => {
  return(
    <h1>{name}</h1>
  );
};

// interface content {
//   name : string,
//   exerciseCount : number
// }

// interface contentProps {
//   content : content[]
// }

interface contentProps {
  content : CoursePart[]
}

interface contentPartProps {
  props : CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ( {props} : contentPartProps) => {
  switch(props.type){
    case "normal":
      return(
      <div key ={props.name}>
        <div><strong>{props.name} {props.exerciseCount}</strong></div>
        <div><i>{props.description}</i></div>
      </div> )
      break;
    case "submission":
      return(<div key ={props.name}>
        <div><strong>{props.name} {props.exerciseCount}</strong></div>
        <div><i>{props.description}</i></div>
        <div>submit to {props.exerciseSubmissionLink}</div>
      </div> )
      break;
      case "groupProject":
        return(<div key ={props.name}>
          <div><strong>{props.name} {props.exerciseCount}</strong></div>
          <div>project exercises {props.groupProjectCount}</div>
        </div> )
        break;
      case "special":
        return(
          <div key = {props.name}>
            <div><strong>{props.name} {props.exerciseCount}</strong></div>
            <div><i>{props.description}</i></div>
            <div>required skilles : {props.requirements.join(',')}</div>
          </div>
        )
        break;
    default:
      return assertNever(props);
  }
};

const Content = ({content} : contentProps) => {
  return(
    <div>
      {
        content.map( p => (
          <div key = {p.name}>
            <Part props = {p}/>
            <br></br>
          </div>
        ))
      }
    </div>
  );
};

const Total = ({total} : {total : number}) => {
  return(
      <div>Number of exercises  {total}</div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name = {courseName}/>
      <Content content = {courseParts}/>
      <Total total = {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}/>
    </div>
  );
};

export default App;
