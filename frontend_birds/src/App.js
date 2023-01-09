import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import droneService from './services/droneService'
import pilotService from './services/pilotService'
import Drone from './components/Drone'

function App() {
  const [drones, setDrones] = useState([])
  const [pilots, setPilots] = useState([])

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

  return (
    <div className="App">
      <div>
        <h3>Pilots</h3>
        {pilots.map((pilot) => (
          <div key={pilot.id}>
            {pilot.id} | {pilot.email} | {pilot.droneId}
          </div>
        ))}
      </div>
      <div>
        <h3>Drones</h3>
        {drones.map((drone) => (
          <div key={drone.id}>
            {drone.id} | {drone.serialNumber} | {drone.lastSavedAt}{' '}
          </div>
        ))}
      </div>

      <div>Current time: {new Date(Date.now()).toISOString()}</div>
    </div>
  )
}

export default App
