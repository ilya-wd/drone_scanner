const WelcomeMsg = () => {
  const pStyle = {
    fontSize: 22,
    padding: 10,
    textAlign: 'center',
  }

  const h1Style = {
    textAlign: 'center',
  }

  return (
    <div className="welcome column">
      <h1 style={h1Style}>Welcome, friends of Monadikuikka!</h1>
      <p style={pStyle}>
        On this website, you can see the most recent information about drone pilots who violate a
        100 meter radius No Drone Zone (NDZ) around Monadikuikka nesting area at a local lake.
      </p>
      <p style={pStyle}>
        You can find information about the most recent violators in the table below. On the map, you
        can see how close some of them get to Monadikuikka's nest, where the nest is a purplish dot
        in the center of an orange circle - the NDZ. Please note that drones' movements are
        unpredictable and extremely fast. One can be in the center of the NDZ and then leave it
        immediately. In that case, the map displays its last known location.
      </p>
      <p style={pStyle}>
        You can take action by contacting pilots and authorities! We made it fairly easy for you.
        Just click pilots' emails or phone numbers.
      </p>
    </div>
  )
}

export default WelcomeMsg
