import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import spacetime from 'spacetime'

const DebugBar = () => {
  const history = useHistory()
  const [hour, setHour] = useState()
  const [minute, setMinute] = useState()
  const [amPm, setAmPm] = useState("AM")

  return <header>
    <input placeholder="hour" type="number" min={1} max={12} onChange={(e) => setHour(e.target.value)} />
    :
    <input placeholder="minute" type="number" min={0} max={60} onChange={(e) => setMinute(e.target.value)} />
    {" "}
    <select onChange={(e) => setAmPm(e.target.value)}>
      <option>AM</option>
      <option>PM</option>
    </select>
    <button onClick={() => {
      if(hour && minute && amPm) {
        const override = spacetime().hour(hour).minute(minute).ampm(amPm)
        history.push(`${window.location.pathname+window.location.search}&time=${override.epoch}`)
      }
    }}>Override time</button>
  </header> 
}

export default DebugBar