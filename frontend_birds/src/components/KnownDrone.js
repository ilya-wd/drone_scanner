import PropTypes from 'prop-types'

const KnownDrone = ({ drone, time }) => {
  const lastSavedMinutes = Math.floor((time - new Date(drone.lastSavedAt)) / 1000 / 60)
  const lastSavedSec = Math.floor((time - new Date(drone.lastSavedAt)) / 1000) % 60

  return (
    <tr class="text-center">
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
      <td>{drone.closestDistance.toFixed(2) + 'm'}</td>
      <td>{drone.currentDistance.toFixed(2) + 'm'}</td>
      <td>
        {lastSavedMinutes} min. {lastSavedSec} sec. ago
      </td>
    </tr>
  )
}

KnownDrone.propTypes = {
  drone: PropTypes.shape({
    closestDistance: PropTypes.number.isRequired,
    currentDistance: PropTypes.number.isRequired,
    lastSavedAt: PropTypes.string.isRequired,
    pilot: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }),
  }),
  time: PropTypes.instanceOf(Date),
}

export default KnownDrone
