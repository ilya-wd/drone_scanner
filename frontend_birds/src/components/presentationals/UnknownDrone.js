import PropTypes from 'prop-types'

const UnknownDrone = ({ drone, time }) => {
  const lastSavedMinutes = Math.floor((time - new Date(drone.lastSavedAt)) / 1000 / 60)
  const lastSavedSec = Math.floor((time - new Date(drone.lastSavedAt)) / 1000) % 60

  const styleUknownDrone = {
    backgroundColor: '#FFD4E2',
  }

  return (
    <tr style={styleUknownDrone}>
      <td colSpan="5">
        <p data-testid={drone.serialNumber + ' unknown'}>
          Owner of drone {drone.serialNumber} made by {drone.manufacturer} is not found! Please
          contact us at
          <a
            href={
              'mailto:monadikuikka@bird.friends&subject=Drone' +
              drone.serialNumber +
              'identified &body=I know who is the owner of a drone'
            }
          >
            monadikuikka@bird.friends
          </a>
          if you have any information about the owner.
        </p>
      </td>
      <td>
        {lastSavedMinutes} minutes {lastSavedSec} seconds ago
      </td>
    </tr>
  )
}

UnknownDrone.propTypes = {
  drone: PropTypes.shape({
    serialNumber: PropTypes.number.isRequired,
    manufacturer: PropTypes.number.isRequired,
    lastSavedAt: PropTypes.instanceOf(Date),
  }),
  time: PropTypes.instanceOf(Date),
}

export default UnknownDrone