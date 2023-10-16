//imports dependencias, imagenes, componentes, stylos
import { useEffect, useState } from 'react';

import '../styles/App.scss'


function App() {

  const [countryList, setCountryList] = useState([]);
  const [countrySearch, setCountrySearch] = useState('');
  const [continentSearch, setContinentSearch] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag,continents')
    .then((response) => response.json())
    .then((data) => {
      setCountryList(data)
    })
    .catch((error) => {
      console.error('Error al leer la api', error);
    });
  }, [])

  const renderCountry = () => {
    return countryList.filter((eachCountries) =>
      eachCountries.name.common.toLowerCase().includes(countrySearch.toLowerCase()) ||
      eachCountries.continents.includes(continentSearch))
      .map((eachCountries, index) => (
        <li key={index}>
          <p>{eachCountries.flag}</p>
          <p>{eachCountries.name.common}</p>
          <p>{eachCountries.capital}</p>
          <p>{eachCountries.continents}</p>
        </li>
      ))
  }

  const handleCountrySearch = (ev) => {
    setCountrySearch(ev.target.value)
  }

  const handleContinentSearch = (ev) => {
    setContinentSearch(ev.target.value)
  }

  const handleForm = (ev) => {
    ev.preventDefault()
  }


//html
  return (
    <>
      <header>
        <h1>Country Info App</h1>
        <h3>Explore information about countries, capitals, and flags. Add new countries and filter through the list!</h3>
      </header>

      <main>
        <form action="/search" method="get" onSubmit={handleForm}>
          <label htmlFor="country" className="label">By Country</label>
          <input 
          type="text"
          id="country"
          name='country'
          placeholder='Spain...'
          value={countrySearch}
          onChange={handleCountrySearch}
          />
          <label htmlFor="continent">By Continent</label>
          <select 
          name="continent" 
          id="continent"
          value={continentSearch}
          onChange={handleContinentSearch}
          >
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
          </select>
        </form>
        <ul>
          {renderCountry()}
        </ul>
      </main>
    </>
  )
}

export default App
