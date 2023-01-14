import './App.css'
import InfoTable from './components/InfoTable'
import Map from './components/Map'
import WelcomeMsg from './components/WelcomeMsg'

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

  if (error) return <h1>failed to load</h1>
  if (!data) {
    return <h1>loading...</h1>
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

  return (
    <div className="App">
      <div>
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
