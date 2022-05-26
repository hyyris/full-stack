const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


const Content = ({ parts }) => 
  <>
    {parts.map(p => <Part key={p.id} part={p} />)}
  </>

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

export default Course