import React, { useState } from 'react'

//returns header text
const Header = ({name}) =>{
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = ({handleClick,text}) => {
  return(
    <>
      <button onClick = {handleClick} >{text}</button>
    </>
  )
}

//returns statistics based on feedback
const Statistics = ({good,neutral,bad}) =>{
  
  const average = () =>{
    let avg=0
    if((good+neutral+bad)>0){
       avg = (good + neutral*0 +bad*-1)/(good+neutral+bad)       
    } 
    return avg
  }

  const positivePert = () =>{
    let pert = 0;
    if((good+neutral+bad)>0){
        pert =(good*100)/(good+neutral+bad)     
    }
    return pert + '%'  
  }

  if((good+neutral+bad)>0){
    let averageValue = average()
    let percentage = positivePert() 
    return (
      <table>
        <tbody>
          <Statistic text = 'good' value = {good}/>
          <Statistic text = 'neutral' value = {neutral}/>
          <Statistic text = 'bad' value = {bad}/>
          <Statistic text = 'all' value = {good+bad+neutral}/>
          <Statistic text = 'average' value = {averageValue} />
          <Statistic text = 'positive' value = {percentage} />
        </tbody>
      </table>
    )
  }
  return(
    <div>    
      <p>No feedback given</p>
    </div>
  )

}

//returns each statistic
const Statistic = ({text,value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const name = 'give feedback'
  const [good, setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name = {name}/>
      <Button handleClick = {() => setGood(good+1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral+1)} text = "neutral"/>
      <Button handleClick = {() => setBad(bad +1)} text = "bad"/>
      <Header name = 'Statistics'/>  
      <Statistics good={good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App