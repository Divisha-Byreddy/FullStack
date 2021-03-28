import CountryDetails from './CountryDetails'

const CountryNames = ({country,setFilteredCountries}) =>{
    const handleOnClick = () =>{
      setFilteredCountries([country])
    }
   return(
     <div>{country.name}  <button onClick = {handleOnClick}> show </button></div>
   )
}
  
  
const Countries = ({countries,setFilteredCountries}) =>{
    
    if(countries.length === 1){
       return(
         <div>
           <CountryDetails country = {countries[0]}/>
         </div>
       )
    }
    else if(countries.length <= 10){
      return(
        <div>
          {countries.map(country => <CountryNames key = {country.capital} country= {country} setFilteredCountries = {setFilteredCountries}/>)}  
        </div>
      )
    }
    else{
      return(
        <p>Too many matches,specify another filter</p>
      )
    }
}

export default Countries