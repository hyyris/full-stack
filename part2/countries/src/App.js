import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newSearch, setNewSearch] = useState('')
  //const [newName, setNewName] = useState('')
  //const [newNumber, setNewNumber] = useState('')
  
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  
  const countriesToShow = newSearch.length > 0
    ? countries.filter(person => person.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    : countries
/*
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }*/
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
/*
  const addName = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1, // toimii kunnes ruvetaan poistamaan
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
*/
  return (
    <div>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

const Countries = ({countries}) => {
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  } else if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else {
    return (
      <>
        {countries.map(c => <p key={c.name.common}>{c.name.common}</p>)}
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


/*
const PersonForm = (params) => {
  return (
    <form onSubmit={params.onSubmit}>
      <div>
        name: 
        <input
          value={params.nameValue}
          onChange={params.nameOnChange}
        />
      </div>
      <div>
        number:
        <input
          value={params.numberValue}
          onChange={params.numberOnChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}*/


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