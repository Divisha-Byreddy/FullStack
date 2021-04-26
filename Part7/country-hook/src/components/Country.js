import { useEffect, useState } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`).then(response => {
    setCountry(response.data[0])
    }).catch(error =>{
      setCountry('not found')
    })
      
  },[name])
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }
  if (country === 'not found') {
    return (
      <div>
        not found...
      </div>
    )
  }
  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

export default Country