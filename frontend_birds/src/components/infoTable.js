import { Table } from 'react-bootstrap'

const KnownDrone = ({ drone, time }) => {
  // const now = new Date()
  const lastSavedMinutes = Math.floor((time - new Date(drone.lastSavedAt)) / 1000 / 60)
  const lastSavedSec = Math.floor((time - new Date(drone.lastSavedAt)) / 1000) % 60

  return (
    <tr key={drone.id}>
      <td>
        {drone.pilot.firstName} {drone.pilot.lastName}
      </td>
      <td>
        <a
          href={
            'mailto:' +
            drone.pilot.email +
            '?cc=registry.mmm@gov.fi&subject=Your drone violated NDZ!&body=Friends of Monadikuikka society informs you...'
          }
        >
          {drone.pilot.email}
        </a>
      </td>
      <td>
        <a href={'tel:' + drone.pilot.phoneNumber}>{drone.pilot.phoneNumber} </a>
      </td>
      <td>{(drone.closestDistance / 1000).toFixed(2) + 'm'}</td>
      <td>
        {lastSavedMinutes} minutes {lastSavedSec} seconds ago
      </td>
    </tr>
  )
}

const UnknownDrone = ({ drone, time }) => {
  // const now = new Date()
  const lastSavedMinutes = Math.floor((time - new Date(drone.lastSavedAt)) / 1000 / 60)
  const lastSavedSec = Math.floor((time - new Date(drone.lastSavedAt)) / 1000) % 60

  const styleUknownDrone = {
    backgroundColor: '#FFD4E2',
  }

  return (
    <tr style={styleUknownDrone} key={drone.id}>
      <td colspan="4">
        <p>
          Owner of drone {drone.serialNumber} made by {drone.manufacturer} is not found! Please
          contact us at <a href="monadikuikka@bird.friends">monadikuikka@bird.friends</a> if you
          have any information about the owner.
        </p>
      </td>
      <td>
        {lastSavedMinutes} minutes {lastSavedSec} seconds ago
      </td>
    </tr>
  )
}

const NoPilotKnown = ({}) => {
  return (
    <tr key="noPilotsKnown">
      <td colspan="5">
        No drones with
        <p>
          <b>identified</b>
        </p>
        pilots violated NDZ in the past 10 minutes
      </td>
    </tr>
  )
}

const NoPilotUnknown = ({}) => {
  return (
    <tr key="noPilotsUknown">
      <h3>
        No drones with
        <p>
          <b>identified</b>
        </p>
        pilots violated NDZ in the past 10 minutes
      </h3>
    </tr>
  )
}

const InfoTable = ({ knownDrones, unknownDrones, time }) => {
  const styleTable = {
    marginTop: 10,
  }

  return (
    <div>
      <Table style={styleTable} striped bordered hover>
        <thead>
          <tr>
            <th>Pilot's name</th>
            <th>Pilot's email</th>
            <th>Pilot's phone number</th>
            <th>Closest confirmed distance to the nest</th>
            <th>Last saved</th>
          </tr>
        </thead>
        <tbody>
          {knownDrones ? (
            knownDrones.map((drone) => <KnownDrone drone={drone} time={time} />)
          ) : (
            <NoPilotKnown />
          )}
          {unknownDrones ? (
            unknownDrones.map((drone) => <UnknownDrone drone={drone} time={time} />)
          ) : (
            <NoPilotUnknown />
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default InfoTable
