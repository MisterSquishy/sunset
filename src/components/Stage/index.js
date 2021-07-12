import React, { useEffect, useState } from 'react';
import spacetime from 'spacetime'
import DebugBar from '../DebugBar'
import { useSunsetTime } from '../../hooks/useSunsetTime';
import { useDebug } from '../../hooks/useDebug'

import "./style.css"
import { useTimeOverride } from '../../hooks/useTimeOverride';

const Stage = () => {
  const debug = useDebug()

  const timeOverride = useTimeOverride()
  const [now, setNow] = useState(spacetime())
  setInterval(() => {
    if(!timeOverride) {
      setNow(spacetime());
    }
  }, 60000);
  useEffect(() => {
    if(timeOverride) {
      setNow(spacetime(+timeOverride))
    }
  }, [timeOverride])

  const [sunsetTiming, setSunsetTiming] = useState()
  useSunsetTime().then(setSunsetTiming)

  if(!sunsetTiming) {
    return <div></div> // todo loader
  }

  let sunAngle = 270
  let useGradient = false
  let daytime = true
  console.log(`current time ${now.format('nice')}`)
  if (now.diff(sunsetTiming.sunset).hours === 0) {
    // it's within an hour of sunset!
    sunAngle = 270
    useGradient = true
  } else if (now.diff(sunsetTiming.sunrise).hours === 0) {
    // it's within an hour of sunrise!
    sunAngle = 90
    useGradient = true
  } else if (now.isAfter(sunsetTiming.sunset) || now.isBefore(sunsetTiming.sunrise)) {
    // it's night!
    daytime = false
  } else {
    // it's day!
  }

  let background = 'blue'
  if(useGradient) {
    background = `linear-gradient(${sunAngle}deg, #E8912A 1.06%, #E36464 20.6%, #C44C8C 35.92%, #95569F 54.1%, #6A557F 79.48%, #46557D 97.28%)`
  } else if (!daytime) {
    background = 'black'
  }
  
  return <div className="container" >
    {debug && (
      <DebugBar />
    )}
    <div className='gradient' style={{ background }} />
  </div>
}

export default Stage