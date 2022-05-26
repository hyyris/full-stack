import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
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
      <Persons persons={personsToShow} />
    </div>
  )
}

const Persons = ({persons}) => {
  return (
    <>
      {persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
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