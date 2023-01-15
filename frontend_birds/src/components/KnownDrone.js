const KnownDrone = ({ drone, time }) => {
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

export default KnownDrone
