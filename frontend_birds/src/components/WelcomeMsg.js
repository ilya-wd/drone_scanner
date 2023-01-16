const WelcomeMsg = () => {
  const pStyle = {
    fontSize: 24,
    padding: 12,
    textAlign: 'center',
  }

  return (
    <div class="welcome column">
      <h1>Welcome, friends of Monadikuikka!</h1>
      <p style={pStyle}>
        On this website you can see the most recent information about drone pilots who violate an
        NDZ around Monadikuikka nesting area.
      </p>
      <p style={pStyle}>
        You can find information about the most recent violators in the table below. On the map you
        can see how close some of them get to Monadikuikka's nest, where nest is a purplish dot in
        the center of an orange circle - NDZ.
      </p>
      <p style={pStyle}>
        You can take action by contacting pilots and authorities! We made it fairly easy for you -
        just click pilots' emails or phone numbers.
      </p>
    </div>
  )
}

export default WelcomeMsg
