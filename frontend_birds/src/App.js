import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import droneService from './services/droneService'
import pilotService from './services/pilotService'
import InfoTable from './components/InfoTable'
import { Stage, Layer, Rect, Text, Circle } from 'react-konva'
import Konva from 'konva'
import Map from './components/Map'

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
  const [perpetrators, setPerpetrators] = useState([])
  const [unidentifiedPerpetrators, setUnidentifiedPerpetrators] = useState([])

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

  useEffect(() => {
    droneService.getPerpetrators().then((perpetrators) => {
      setPerpetrators(perpetrators.filter((p) => p.pilot !== undefined))
      setUnidentifiedPerpetrators(perpetrators.filter((p) => p.pilot === undefined))
    })
  }, [])

  // const totalDrones = drones.length
  // const totalUnknown = drones.filter((drone) => drone.pilot === undefined).length

  return (
    <div className="App">
      <div>
        <InfoTable knownDrones={perpetrators} unknownDrones={unidentifiedPerpetrators} />
      </div>

      <Map drones={perpetrators} />
      <div>Current time: {new Date(Date.now()).toISOString()}</div>
    </div>
  )
}

export default App
