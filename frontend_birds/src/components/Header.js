import { Navbar, Container } from 'react-bootstrap'

const Header = ({ perpetrators, dev, uptime }) => {
  const device = dev[0]
  const totalDrones = perpetrators.length
  const servUptime = (uptime / 60).toFixed(2)

  return (
    <Navbar bg="light" expand="lg">
      <Container key="deficeInfo">
        <span> Device: {device.deviceId} </span>
        <span> Uptime: {Math.floor(device.uptimeSeconds / 60)} min. </span>
        <span> Listen range: {device.listenRange / 1000} m. </span>
      </Container>
      <Container key="droneInfo">
        <span>{totalDrones} drones spotted in NDZ in the past 10 minutes</span>
      </Container>
      <Container key="serverInfo">
        <span> Server uptime: {servUptime} </span>
      </Container>
    </Navbar>
  )
}

export default Header
