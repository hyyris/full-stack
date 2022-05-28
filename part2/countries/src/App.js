import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newSearch, setNewSearch] = useState('')
  const [showCountry, setShowCountry] = useState(null)
  const [weather, setWeather] = useState([])
  
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const weatherHook = (capital, countrycode) => {
    const apikey = process.env.REACT_APP_API_KEY
  
    axios
      .get(`https://pro.openweathermap.org/data/2.5/weather?q=${capital},${countrycode}&units=metric&appid=${apikey}`)
      .then(({data}) => {
        if (!weather.find(w => w.capital === capital)) {
          setWeather(weather.concat({
            capital: capital,
            temp: data.main.temp,
            wind: data.wind.speed,
            imgUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          }))
        }
      })
  }
  
  const countriesToShow = newSearch.length > 0
    ? countries.filter(person => person.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    : countries

  const handleSearchChange = (event) => {
    setShowCountry(null);
    setNewSearch(event.target.value)
    setWeather([])
  }

  const selectedCountry = (showCountry || countriesToShow.length === 1)
    ? showCountry || countriesToShow[0]
    : null;

  if (selectedCountry) {
    if (weather.length < selectedCountry.capital.length) {
      weatherHook(selectedCountry.capital[weather.length], selectedCountry.cca2)
    }
  }

  return (
    <div>
      <Filter value={newSearch} onChange={handleSearchChange} />
      {newSearch.length > 0
        ? <Countries countries={countriesToShow} country={selectedCountry} show={setShowCountry} />
        : <></>}
      {weather
        ? weather.map(w => <Weather key={w.capital} weather={w} />)
        : <></>}
    </div>
  )
}

const Countries = ({countries, country, show}) => {
  if (country) {
    return (
      <Country country={country} />
    )
  } else if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else {
    return (
      <>
        {countries.map(c => <p key={c.name.common}>{c.name.common} <Button handleClick={() => show(c)} /></p>)}
      </>
    )
  }
}

const Country = ({country}) => {
  const capitalTxt = country.capital.length > 1 ? 'capitals' : 'capital'
  const capitals = country.capital.join(', ')
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>{capitalTxt}: {capitals}</p>
      <p>area: {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.entries(country.languages).map(([key, val]) => <li key={key}>{val}</li>)}
      </ul>
      {country.flag}
    </>
  )
}

const Weather = ({weather}) => {
  return (
    <>
      <h3>Weather in {weather.capital}</h3>
      <p>temperature {weather.temp} Celcius</p>
      <img alt="weather icon" src={weather.imgUrl}></img>
      <p>wind {weather.wind} m/s</p>
    </>
  )
}

const Button = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>show</button>
  )
}

const Filter = (params) => {
  return (
    <div>
      find countries:
      <input
        value={params.newSearch}
        onChange={params.onChange}
      />
    </div>
  )
}

export default App