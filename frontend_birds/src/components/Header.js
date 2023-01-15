import { Navbar } from 'react-bootstrap'

const Header = ({ perpetrators, nonPerpetrators, dev }) => {
  const device = dev[0]
  const totalDrones = perpetrators.length + nonPerpetrators.length
  const totalPerpetrators = perpetrators.length

  return (
    <Navbar>
      <div key="deficeInfo">
        <span>Device: {device.deviceId}</span>
        <span>Uptime: {device.uptimeSeconds / 60} min.</span>
        <span>Listen range: {Math.floor(device.listenRange / 1000)} m.</span>
      </div>
      <div key="droneInfo">
        <span>{totalDrones} spotted in NDZ in the past 10 minutes</span>
      </div>
      <div key="serverInfo">
        <span></span>
      </div>
    </Navbar>
  )
}

export default Header
