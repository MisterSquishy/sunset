import { useCallback, useEffect, useState } from 'react'
import { useDebug } from './useDebug'
import spacetime from 'spacetime'

export const useSunsetTime = async () => {
  const debug = useDebug()

  const [timing, setTiming] = useState({
    sunrise: spacetime().hour(6),
    sunset: spacetime().hour(19)
  })

  const getSunsetTiming = useCallback(async (ip) => {
    // please dont steal my api key; i swear im a good guy
    const timing = await fetch(`https://api.ipgeolocation.io/astronomy?apiKey=dc69dacc08074c37bb38c34f9ad8f15d&ip=${ip}`)
      .then(response => response.json())
      .catch(e => console.error(`fetching sunset time failed\n${e}`))

    if(timing) {
      const sunrise = spacetime().hour(+timing.sunrise.split(":")[0]).minute(+timing.sunrise.split(":")[1])
      const sunset = spacetime().hour(+timing.sunset.split(":")[0]).minute(+timing.sunset.split(":")[1])
      console.log(`sunrise time ${sunrise.format('nice')}`)
      console.log(`sunset time ${sunset.format('nice')}`)
      setTiming({ sunrise, sunset })
    }
  }, [])

  const getIP = useCallback(async () => {
    return await fetch("https://checkip.amazonaws.com/", {mode: "no-cors"}).then(res => res.text())
  }, [])

  useEffect(() => {
    if(debug) {
      const hardcodedSunrise = spacetime().hour(7).minute(0)
      const hardcodedSunset = spacetime().hour(20).minute(0)
      console.log(`debug sunrise time ${hardcodedSunrise.format('nice')}`)
      console.log(`debug sunset time ${hardcodedSunset.format('nice')}`)
      setTiming({
        sunrise: hardcodedSunrise,
        sunset: hardcodedSunset,
      })
    } else {
      getIP().then(ip => getSunsetTiming(ip)).catch(e => {
        console.error(`error fetching IP\n${e}`)
        getSunsetTiming('1.1.1.1')
      })
    }
  }, [getIP, getSunsetTiming, debug])

  return timing
}