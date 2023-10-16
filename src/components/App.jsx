//imports dependencias, imagenes, componentes, stylos
import { useEffect, useState } from 'react';

import '../styles/App.scss'


function App() {

  const [countryList, setCountryList] = useState([]);
  const [countrySearch, setCountrySearch] = useState('');
  const [continentSearch, setContinentSearch] = useState('All');
  const [newCountry, setNewCountry] = useState ({
    flag: '',
    name: {
      common:  ''
    },
    capital: '',
    continents: '',
  })
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag,continents')
    .then((response) => response.json())
    .then((data) => {
      setCountryList(data)
    })
    .catch((error) => {
      console.error('Error al leer la api', error);
    });
  }, []);

  useEffect(() => {
    if (countryList.length > 0) {
      setCountryList(countryList);
    }
  }, [countryList]);

  const renderCountry = () => {
    return countryList.filter((eachCountries) =>
      eachCountries.name.common.toLowerCase().includes(countrySearch.toLowerCase()) &&
      (continentSearch === 'All' || eachCountries.continents.includes(continentSearch)))
    .map((eachCountries, index) => (
      <li key={index} className='listCountry'>
        <p>{eachCountries.flag}</p>
        <p>{eachCountries.name.common}</p>
        <p>{eachCountries.capital}</p>
        <p>{eachCountries.continents}</p>
      </li>
    ));
  };
  
  const handleCountrySearch = (ev) => {
    setCountrySearch(ev.target.value)
  };

  const handleContinentSearch = (ev) => {
    setContinentSearch(ev.target.value)
  };

  const handleForm = (ev) => {
    ev.preventDefault()
  }

  const handleInputAdd = (ev) => {
    setNewCountry({...newCountry, [ev.target.id]: ev.target.value})
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    if (newCountry.name.common === '') {
      setError('Se le ha olvidado poner el nombre del pais');
    } else if (newCountry.capital === '') {
      setError('Se le ha olvidado poner la capital del pais');
    } else if (newCountry.flag === '') {
      setError('Se le ha olvidado poner la bandera del pais');
    } else if (newCountry.continents === '') {
      setError('Se le ha olvidado poner el continente del pais');
    } else {
      setCountryList([...countryList, newCountry]);
      setError('');
      setNewCountry({
        flag: '',
        name: {
          common: ''
        },
        capital: '',
        continents: ''
      });
    }
  }

//html
  return (
    <>
      <header>
        <h1>Country Info App</h1>
        <h3>Explore information about countries, capitals, and flags. Add new countries and filter through the list!</h3>
      </header>

      <main>
        <div className='filters'>
        <h2>Filters</h2>
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
        </div>
        <div className="add-country-form">
        <form onSubmit={handleForm}>
          <h2>Add Country</h2>
          <input 
          type="text"
          name="name"
          id="name"
          placeholder="Country Name"
          onChange={handleInputAdd}
          value={newCountry.name.common}
          />
          <input 
          type="text"
          name="capital"
          id="capital"
          placeholder="Capital"
          onChange={handleInputAdd}
          value={newCountry.capital}
          />
          <input 
          type="text"
          name="flag"
          id="flag"
          placeholder="Flag Icon"
          onChange={handleInputAdd}
          value={newCountry.flag}
          />
          <select
            name="continents"
            id="continents"
            value={newCountry.continents}
            onChange={handleInputAdd}
          >
              <option value="">Select Continent</option>
              <option value="Africa">Africa</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
          </select>
          <button type='button'
          onClick={handleClick}> Añadir
          </button>
        </form>
        <p>{error}</p>
        </div>
        <ul className='ulList'>
          {renderCountry()}
        </ul>
      </main>
    </>
  )
}

export default App
