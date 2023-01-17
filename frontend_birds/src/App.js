import './App.css'
import InfoTable from './components/InfoTable'
import Map from './components/Map'
import WelcomeMsg from './components/WelcomeMsg'
import Header from './components/Header'

import useSWR from 'swr'

function App() {
  const timeNow = new Date()
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error } = useSWR('/api/drones/get_data', fetcher, {
    refreshInterval: 1000,
  })

  let unidentifiedPerpetrators, perpetrators, badDrones, device, uptime

  if (error) return <h1>failed to load</h1>
  if (!data) {
    return <h1>loading...</h1>
  } else {
    badDrones = data[0]
    device = data[1]
    uptime = data[2]
    perpetrators = badDrones.filter((p) => p.pilot !== undefined)
    unidentifiedPerpetrators = badDrones.filter((p) => p.pilot === undefined)
  }

  return (
    <div className="App">
      <Header perpetrators={perpetrators} dev={device} uptime={uptime} />
      <WelcomeMsg />
      <Map knownDrones={perpetrators} unknownDrones={unidentifiedPerpetrators} />
      <InfoTable
        knownDrones={perpetrators}
        unknownDrones={unidentifiedPerpetrators}
        time={timeNow}
      />
    </div>
  )
}

export default App
