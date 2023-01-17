import { Table } from 'react-bootstrap'
import UnknownDrone from './UnknownDrone'
import KnownDrone from './KnownDrone'
import PropTypes from 'prop-types'

const NoPilotKnown = () => {
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

const NoPilotUnknown = () => {
  return (
    <tr key="noPilotsUnknown">
      <h3>
        No drones with
        <p>
          <b>unidentified</b>
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

  const styleRow = {
    textAlign: 'center',
    justifyContent: 'center',
  }

  return (
    <div>
      <Table style={styleTable} striped bordered hover>
        <thead>
          <tr class="text-center">
            <th>Pilot's name</th>
            <th>Pilot's email</th>
            <th>Pilot's phone number</th>
            <th style={styleRow}>Closest confirmed distance to the nest</th>
            <th>Current distance to the nest</th>
            <th>Last seen</th>
          </tr>
        </thead>
        <tbody>
          {knownDrones ? (
            knownDrones.map((drone) => (
              <KnownDrone drone={drone} time={time} key={drone.serialNumber} />
            ))
          ) : (
            <NoPilotKnown />
          )}
          {unknownDrones ? (
            unknownDrones.map((drone) => (
              <UnknownDrone drone={drone} time={time} key={drone.serialNumber} />
            ))
          ) : (
            <NoPilotUnknown />
          )}
        </tbody>
      </Table>
    </div>
  )
}

InfoTable.propTypes = {
  knownDrones: PropTypes.array.isRequired,
  unknownDrones: PropTypes.array.isRequired,
  time: PropTypes.instanceOf(Date),
}

export default InfoTable
