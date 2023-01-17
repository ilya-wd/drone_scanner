import PropTypes from 'prop-types'

const UnknownDrone = ({ drone, time }) => {
  const lastSavedMinutes = Math.floor((time - new Date(drone.lastSavedAt)) / 1000 / 60)
  const lastSavedSec = Math.floor((time - new Date(drone.lastSavedAt)) / 1000) % 60

  const styleUnknownDrone = {
    backgroundColor: '#FFD4E2',
  }

  return (
    <tr style={styleUnknownDrone} class="text-center">
      <td colSpan="3">
        <p data-testid={drone.serialNumber + ' unknown'}>
          Owner of drone <b>{drone.serialNumber}</b> made by <b>{drone.manufacturer}</b> is not
          found! Please contact us at{' '}
          <a
            href={
              'mailto:monadikuikka@bird.friends&subject=Drone' +
              drone.serialNumber +
              'identified &body=I know who is the owner of a drone'
            }
          >
            monadikuikka@bird.friends
          </a>{' '}
          if you have any information about the owner.
        </p>
      </td>
      <td>{drone.closestDistance.toFixed(2) + 'm'}</td>
      <td>{drone.currentDistance.toFixed(2) + 'm'}</td>
      <td>
        {lastSavedMinutes} min. {lastSavedSec} sec. ago
      </td>
    </tr>
  )
}

UnknownDrone.propTypes = {
  drone: PropTypes.shape({
    serialNumber: PropTypes.string.isRequired,
    manufacturer: PropTypes.string.isRequired,
    lastSavedAt: PropTypes.string.isRequired,
  }),
  time: PropTypes.instanceOf(Date),
}

export default UnknownDrone
