import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Countries from './Components/Countries'


function App() {
  const [countries , setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  
  const hook = () =>{
    axios.get('https://restcountries.eu/rest/v2/all').then(response =>{
    setCountries(response.data)
  })
  }
  console.log(filteredCountries);
  
  useEffect(hook,[])

  const handleOnChange = (event) => {
    var value = event.target.value
    var result = countries.filter(country =>
      country.name.toLowerCase().includes(value.toLowerCase()))
    setFilteredCountries(result)
  }

  return (
    <div >
      <form>
        <div>
          find countries <input onChange = {handleOnChange}></input>
        </div>
      </form>
      <Countries countries = {filteredCountries} setFilteredCountries = {setFilteredCountries}/>
    </div>
  );
}

export default App;
