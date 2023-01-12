import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import droneService from './services/droneService'
import pilotService from './services/pilotService'
import Drone from './components/Drone'
import { Stage, Layer, Rect, Text, Circle } from 'react-konva'
import Konva from 'konva'

// "scripts": {
//   "start": "set PORT=3030 && react-scripts start",
//   "build": "react-scripts build",
//   "test": "react-scripts test",
//   "eject": "react-scripts eject"
// },
// "proxy": "http://localhost:3030",

const CircleS = ({ drones }) => {
  const style = {
    margin: 3,
  }

  // var stage = new Konva.Stage({
  //   container: 'container', // id of container <div>
  //   width: 500,
  //   height: 500,
  // })

  // // then create layer
  // var layer = new Konva.Layer()

  // // create our shape
  // var circle = new Konva.Circle({
  //   x: stage.width() / 2,
  //   y: stage.height() / 2,
  //   radius: 70,
  //   fill: 'red',
  //   stroke: 'black',
  //   strokeWidth: 4,
  // })

  // // add the shape to the layer
  // layer.add(circle)

  // // add the layer to the stage
  // stage.add(layer)

  // // draw the image
  // layer.draw()

  // state = {
  //   color: 'green',
  // // };
  // handleClick = () => {
  //   this.setState({
  //     color: Konva.Util.getRandomColor(),
  //   });
  // };

  // return <Circle x={250} y={250} width={50} height={50} fill={'red'} radius={70} />
  const [circles, setCircles] = useState([{ x: 100, y: 100 }])
  // #75bf83 - NDZ
  // #3d036b - Drones
  return (
    <Stage width={1000} height={1000}>
      <Layer>
        <Circle x={500} y={500} radius={70} fill={'#BD9FF9'} stroke={'#5707F5'} strokeWidth={4} />
        <Circle x={100} y={100} radius={20} fill={'#75bf83'} stroke={'#3d036b'} strokeWidth={4} />
      </Layer>
    </Stage>
  )
}

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
        <h3>Pilots TOTAL NOW: {pilots.length}</h3>
        {pilots.map((pilot) => (
          <div key={pilot.id}>
            {pilot.id} | {pilot.email} | {pilot.droneId}
          </div>
        ))}
      </div>
      <div>
        <h3>Drones TOTAL NOW: {drones.length}</h3>
        {drones.map((drone) => (
          <div key={drone.id}>
            {drone.id} | {drone.serialNumber} | {drone.lastSavedAt} | {drone.currentDistance} | {drone.closestDistance}
          </div>
        ))}
      </div>

      <div>Current time: {new Date(Date.now()).toISOString()}</div>
      <div>
        <CircleS />
      </div>
    </div>
  )
}

export default App
