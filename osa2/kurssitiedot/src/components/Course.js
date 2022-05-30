const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const Header = ({ course }) => <h2>{course}</h2>


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const sum = parts.reduce(
      (prevValue, curPart) => prevValue + curPart.exercises,
      0)

  return (
    <>
      { parts.map(part => 
        <Part key={part.id}
          part={part} 
        />
      )}
      <p>Number of exercises {sum} </p>
    </>
  )
}

export default Course
