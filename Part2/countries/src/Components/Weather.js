const Weather = ({weather,capital}) =>{
  if(weather == undefined)
    {return null}
  else{
    return(
      <div>
         <h3>Weather in {capital}</h3>
         <div><strong>temperature:</strong> {weather.temperature} celcius</div>
         <img src = {weather.weather_icons} alt = {weather.weather_descriptions}></img>
         <div><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</div>
      </div>
    )
  }
   
}

export default Weather