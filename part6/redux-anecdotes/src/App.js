import { useEffect } from 'react'
import ConnectedFilter from './components/Filter'
import ConnectedNotification from './components/Notification'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedNotification />
      <ConnectedFilter />
      <AnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  )
}

export default App