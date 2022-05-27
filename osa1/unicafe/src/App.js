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
            <StatisticLine text='Palautteita yhteensä' value={total} />
            <StatisticLine text='Palautteiden keskiarvo:' value={(1*props.good+-1*props.bad)/total} />
            <StatisticLine text='Positiivisia palautteita (prosentteina):' value={100*props.good/total} />
            <StatisticLine text='Hyvä' value={props.good} />
                <StatisticLine text='Neutraali' value={props.neutral} />
                <StatisticLine text='Huono' value={props.bad} />
                </div> 
        )
    }
}

const StatisticLine = (props) => {
    return (
        <p>{props.text} {props.value}</p>
    )
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