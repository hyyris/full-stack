import { useState, useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([
    /*{ name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }*/
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const hook = () => {
    personsService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }
  
  useEffect(hook, [])
  const personsToShow = newSearch.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    : persons

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      personsService.remove(id).then(() => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(existingPerson.id, {...existingPerson, number: newNumber})
          .then(data => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : data))
            setNewName('')
            setNewNumber('')
      })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personsService
        .create(nameObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm 
        onSubmit={addName}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={personsToShow} 
        removePerson={removePerson}
      />
    </div>
  )
}

const Persons = ({persons, removePerson}) => {
  return (
    <>
      {persons.map(person => {
        return (
          <div key={person.id}>
            <p>{person.name} {person.number}</p><button onClick={() => removePerson(person.id)}>delete</button>
          </div>
        )
      })}
    </>
  )
}

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
}


const Filter = (params) => {
  return (
    <div>
      filter shown with:
      <input
        value={params.newSearch}
        onChange={params.onChange}
      />
    </div>
  )
}

export default App