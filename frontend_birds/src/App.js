import './App.css'
import InfoTable from './components/InfoTable'
import Map from './components/Map'
import WelcomeMsg from './components/WelcomeMsg'

import useSWR from 'swr'

function App() {
  const timeNow = new Date()

  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, error, isLoading } = useSWR('/api/drones/get_perpetrators', fetcher, {
    refreshInterval: 1000,
  })
  let unidentifiedPerpetrators, perpetrators

  if (error) return <h1>failed to load</h1>
  if (!data) {
    return <h1>loading...</h1>
  } else {
    perpetrators = data.filter((p) => p.pilot !== undefined)
    unidentifiedPerpetrators = data.filter((p) => p.pilot === undefined)
  }

  return (
    <div className="App">
      <div>
        <h1>HELLO WORLD AGAIN #3 </h1>
        <WelcomeMsg />
        <Map drones={perpetrators} />
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
