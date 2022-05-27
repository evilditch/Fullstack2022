import { useState } from 'react'

const Button = ({ handleClick, text }) => {
    return(
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistics = (props) => {
    const total = props.good + props.neutral + props.bad

    if (total > 0) {
        return (
            <div>
                <p>Annettuja palautteita yhteensä: {total}</p>
                <p>Palautteiden keskiarvo: {(1*props.good+-1*props.bad)/total}</p>
                <p>Positiivisia palautteita: {100*props.good/total} %</p>
                <p>Hyvä {props.good}</p>
                <p>Neutraali {props.neutral}</p>
                <p>Huono {props.bad}</p>
                </div> 
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Unicafe: palautekysely</h1>
            <Button handleClick={() => setGood(good+1)}
                text={'Hyvä'} />
            <Button handleClick={() => setNeutral(neutral+1)}
                text={'Neutraali'} />
            <Button handleClick={() => setBad(bad+1)}
                text={'Huono'} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App