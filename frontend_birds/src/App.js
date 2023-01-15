import './App.css'
import InfoTable from './components/InfoTable'
import Map from './components/Map'
import WelcomeMsg from './components/WelcomeMsg'
import Header from './components/Header'

import useSWR from 'swr'
import { useState } from 'react'

function App() {
  const timeNow = new Date()
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR('/api/drones/get_data', fetcher, {
    refreshInterval: 1000,
  })

  let unidentifiedPerpetrators, perpetrators, badDrones, nonPerpetrators, device, uptime

  if (error) return <h1>failed to load</h1>
  if (!data) {
    return <h1>loading...</h1>
  } else {
    badDrones = data[0]
    nonPerpetrators = data[1]
    device = data[2]
    uptime = data[3]
    perpetrators = badDrones.filter((p) => p.pilot !== undefined)
    unidentifiedPerpetrators = badDrones.filter((p) => p.pilot === undefined)
  }

  return (
    <div className="App">
      <div>
        <Header perpetrators={perpetrators} dev={device} uptime={uptime} />
        <WelcomeMsg />
        <Map perpetrators={perpetrators} />
        <InfoTable
          knownDrones={perpetrators}
          unknownDrones={unidentifiedPerpetrators}
          time={timeNow}
        />
      </div>
    </div>
  )
}

export default App
