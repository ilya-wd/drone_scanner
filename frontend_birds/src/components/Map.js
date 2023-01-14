import Plot from 'react-plotly.js'

// const Map = ({ drones }) => {
const Map = ({ drones }) => {
  const dronesInNDZ = {
    type: 'scatter',
    mode: 'markers',
    x: [],
    y: [],
    marker: { color: 'red', size: [] },
  }

  // const dronesOutsideNDZ = {
  //   type: 'scatter',
  //   mode: 'markers',
  //   x: [],
  //   y: [],
  //   marker: { color: 'green', size: [10] },
  // }

  const nestArea = {
    type: 'scatter',
    mode: 'markers',
    x: [250],
    y: [250],
    marker: { color: 'blue', size: [300] },
  }

  const nest = {
    type: 'scatter',
    mode: 'markers',
    x: [250],
    y: [250],
    marker: { color: 'white', size: [10] },
  }

  const furthermostCorner = {
    type: 'scatter',
    mode: 'markers',
    x: [500],
    y: [500],
    marker: { color: 'white', size: [0.5] },
  }

  const coordinatesOrigin = {
    type: 'scatter',
    mode: 'markers',
    x: [0],
    y: [0],
    marker: { color: 'white', size: [0.5] },
  }

  if (drones.length > 0) {
    drones.map((drone) => {
      const xCoord = Math.round(drone.positionX / 1000)
      const yCoord = Math.round(drone.positionY / 1000)
      dronesInNDZ.x.push(xCoord)
      dronesInNDZ.y.push(yCoord)
      dronesInNDZ.marker.size.push(30)
    })
  }

  const plotData = [nestArea, dronesInNDZ, nest, furthermostCorner, coordinatesOrigin]

  // TODO: width: 100%, height: 100%

  const plotLayout = {
    showlegend: false,
    autosize: false,
    width: 1000,
    height: 1000,
    title: 'Map of drones in NDZ',
    margin: {
      l: 100,
      r: 100,
      b: 100,
      t: 100,
      pad: 4,
    },
  }

  const plotConfig = {
    displayModeBar: false,
    staticPlot: true,
  }

  return <Plot data={plotData} layout={plotLayout} config={plotConfig} />
}

export default Map
