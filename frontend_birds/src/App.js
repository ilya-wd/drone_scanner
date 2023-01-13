import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import droneService from './services/droneService'
import pilotService from './services/pilotService'
import InfoTable from './components/infoTable'
import { Stage, Layer, Rect, Text, Circle } from 'react-konva'
import Konva from 'konva'

// "scripts": {
//   "start": "set PORT=3030 && react-scripts start",
//   "build": "react-scripts build",
//   "test": "react-scripts test",
//   "eject": "react-scripts eject"
// },
// "proxy": "http://localhost:3030",

function App() {
  const [drones, setDrones] = useState([])
  const [pilots, setPilots] = useState([])
  const [perpetrators, setPerpetrators] = useState([])
  const [unidentifiedPerpetrators, setUnidentifiedPerpetrators] = useState([])

  useEffect(() => {
    droneService.getAllDrones().then((drones) => {
      setDrones(drones)
    })
  }, [])

  useEffect(() => {
    pilotService.getAllPilots().then((pilots) => {
      setPilots(pilots)
    })
  }, [])

  useEffect(() => {
    droneService.getPerpetrators().then((perpetrators) => {
      setPerpetrators(perpetrators.filter((p) => p.pilot !== undefined))
      setUnidentifiedPerpetrators(perpetrators.filter((p) => p.pilot === undefined))
    })
  }, [])

  const totalDrones = drones.length
  const totalUnknown = drones.filter((drone) => drone.pilot === undefined).length

  return (
    <div className="App">
      <div>
        <InfoTable knownDrones={perpetrators} unknownDrones={unidentifiedPerpetrators} />
      </div>

      <div>Current time: {new Date(Date.now()).toISOString()}</div>
    </div>
  )
}

export default App

{
  /* <h3>Unknown Perpetrators TOTAL NOW: {unidentifiedPerpetrators.length}</h3>
{unidentifiedPerpetrators.map((perpetrator) => (
  <div key={perpetrator.serialNumber}>
    {perpetrator.serialNumber} | Name of the pilot is unknown
  </div>
))} */
}

{
  /* <h3>Perps TOTAL NOW: {perpetrators.length}</h3>
{perpetrators.map((perpetrator) => (
  <div key={perpetrator.pilot.id}>
    {perpetrator.pilot.name} | {perpetrator.pilot.email} |{perpetrator.pilot.phoneNumber} |
    {(perpetrator.closestDistance / 1000).toFixed(2) + 'm'}
  </div>
))} */
}
