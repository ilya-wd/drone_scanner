import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import droneService from './services/droneService'
import Drone from './components/Drone'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    droneService.getAll().then((drones) => {
      setData(drones)
    })
  }, [])

  return (
    <div className="App">
      <div>Hi</div>
      {data.map((drone) => (
        <div key={drone.id}>{drone.serialNumber}</div>
      ))}
    </div>
  )
}

export default App
