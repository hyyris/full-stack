const App = () => {
  const course = 'Half Stack application development'
  const exercises = {
    part1: 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  }
  
  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} />
      <Total total={exercises.exercises1 + exercises.exercises2 + exercises.exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.exercises.part1} count={props.exercises.exercises1} />
      <Part name={props.exercises.part2} count={props.exercises.exercises2} />
      <Part name={props.exercises.part3} count={props.exercises.exercises3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.count}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

export default App