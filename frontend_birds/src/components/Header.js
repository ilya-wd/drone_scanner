import { Navbar, Container } from 'react-bootstrap'

const Header = ({ perpetrators, dev, uptime }) => {
  const device = dev[0]
  const totalDrones = perpetrators.length
  const uptimeFromSeconds = (seconds) => {
    const uptimeHours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0')
    const uptimeMinutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const uptimeSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0')

    return `${uptimeHours}:${uptimeMinutes}:${uptimeSeconds}`
  }
  const serverUptime = uptimeFromSeconds(uptime)
  const deviceUptime = uptimeFromSeconds(device.uptimeSeconds)

  const navbarStyle = {
    width: '100%',
    fontSize: 20,
    justifyContent: 'space-around',
    display: 'flex',
  }

  const content = {
    justifyContent: 'space-evenly',
    margin: 20,
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 20,
  }

  return (
    <Navbar expand="lg" className="navbar" style={navbarStyle}>
      <Container key="deficeInfo" style={navbarStyle}>
        <span style={content}>Scanner name: {device.deviceId}</span>
        <span style={content}>Scanner uptime: {deviceUptime}</span>
        <span style={content}>{totalDrones} drones spotted in NDZ in the past 10 minutes</span>
        <span style={content}>Server uptime: {serverUptime}</span>
      </Container>
    </Navbar>
  )
}

export default Header
