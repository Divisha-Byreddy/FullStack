import axios from 'axios';
import { useEffect, useState } from 'react';
import Weather from './Weather'

const Languages = ({languages}) =>{
    return(
      <div>
        <h3>spoken languages</h3>
        <ul>
        {languages.map(language => <li key={language.nativeName}>{language.name}</li> )}
        </ul>
      </div>
  )
}


const CountryDetails = ({country}) => {
    const [weather,setWeather] = useState(null)
    const accessKey = process.env.REACT_APP_API_KEY
    const hook = () =>{
      axios.get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${country.capital}`).then(response =>{
        console.log(response);
        setWeather(response.data.current)
    })
    }

    useEffect(hook,[])

    return(
     <div>
       <h2>{country.name}</h2>
       <div>capital {country.capital}</div>
       <div>population {country.population}</div>
       <Languages languages={country.languages} />
       <img src = {country.flag} alt = 'Country Flag' width = '110' height = '100'></img>
       <Weather weather = {weather} capital = {country.capital} />
     </div>
    )
}

export default CountryDetails