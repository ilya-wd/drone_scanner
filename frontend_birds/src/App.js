import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import droneService from './services/droneService'
import pilotService from './services/pilotService'
import InfoTable from './components/InfoTable'
import { Stage, Layer, Rect, Text, Circle } from 'react-konva'
import Konva from 'konva'
import Map from './components/Map'
import useSWR from 'swr'

// "scripts": {
//   "start": "set PORT=3030 && react-scripts start",
//   "build": "react-scripts build",
//   "test": "react-scripts test",
//   "eject": "react-scripts eject"
// },
// "proxy": "http://localhost:3030",

function App() {
  // const [drones, setDrones] = useState([])
  // const [pilots, setPilots] = useState([])
  // const [perpetrators, setPerpetrators] = useState([])
  // const [unidentifiedPerpetrators, setUnidentifiedPerpetrators] = useState([])

  // useEffect(() => {
  //   droneService.getAllDrones().then((drones) => {
  //     setDrones(drones)
  //   })
  // }, [])

  // useEffect(() => {
  //   pilotService.getAllPilots().then((pilots) => {
  //     setPilots(pilots)
  //   })
  // }, [])

  const timeNow = new Date()

  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, error, isLoading } = useSWR(
    'http://localhost:3030/api/drones/get_perpetrators',
    fetcher,
    { refreshInterval: 1000 }
  )
  let unidentifiedPerpetrators, perpetrators

  if (error) return <div>failed to load</div>
  if (!data) {
    return <div>loading...</div>
  } else {
    perpetrators = data.filter((p) => p.pilot !== undefined)
    unidentifiedPerpetrators = data.filter((p) => p.pilot === undefined)
  }

  // useEffect(() => {
  //   droneService.getPerpetrators().then((perpetrators) => {
  //     setPerpetrators(perpetrators.filter((p) => p.pilot !== undefined))
  //     setUnidentifiedPerpetrators(perpetrators.filter((p) => p.pilot === undefined))
  //   })
  // }, [data])

  // const totalDrones = drones.length
  // const totalUnknown = drones.filter((drone) => drone.pilot === undefined).length

  return (
    <div className="App">
      <div>
        <InfoTable
          knownDrones={perpetrators}
          unknownDrones={unidentifiedPerpetrators}
          time={timeNow}
        />
      </div>

      <Map drones={perpetrators} />
      <div>Current time: {new Date(Date.now()).toISOString()}</div>
    </div>
  )
}

export default App
