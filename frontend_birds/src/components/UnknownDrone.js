const UnknownDrone = ({ drone, time }) => {
  const lastSavedMinutes = Math.floor((time - new Date(drone.lastSavedAt)) / 1000 / 60)
  const lastSavedSec = Math.floor((time - new Date(drone.lastSavedAt)) / 1000) % 60

  const styleUknownDrone = {
    backgroundColor: '#FFD4E2',
  }

  return (
    <tr style={styleUknownDrone}>
      <td colSpan="4">
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

export default UnknownDrone
