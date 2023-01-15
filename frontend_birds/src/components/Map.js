import Plot from 'react-plotly.js'

const Map = ({ perpetrators, nonPerpetrators }) => {
  const dronesInNDZ = {
    type: 'scatter',
    mode: 'markers',
    x: [],
    y: [],
    marker: { color: 'red', size: [] },
  }

  const dronesOutsideNDZ = {
    type: 'scatter',
    mode: 'markers',
    x: [],
    y: [],
    marker: { color: 'green', size: [] },
  }

  // const nestArea = {
  //   type: 'scatter',
  //   mode: 'markers',
  //   x: [250],
  //   y: [250],
  //   marker: { color: 'blue', size: [200] },
  // }

  const nest = {
    type: 'scatter',
    mode: 'markers',
    x: [250],
    y: [250],
    marker: { color: 'blue', size: [10] },
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

  if (perpetrators) {
    perpetrators.map((drone) => {
      const xCoord = Math.round(drone.positionX / 1000)
      const yCoord = Math.round(drone.positionY / 1000)
      dronesInNDZ.x.push(xCoord)
      dronesInNDZ.y.push(yCoord)
      dronesInNDZ.marker.size.push(10)
    })
  }

  if (nonPerpetrators) {
    nonPerpetrators.map((drone) => {
      const xCoord = Math.round(drone.positionX / 1000)
      const yCoord = Math.round(drone.positionY / 1000)
      dronesOutsideNDZ.x.push(xCoord)
      dronesOutsideNDZ.y.push(yCoord)
      dronesOutsideNDZ.marker.size.push(10)
    })
  }

  const plotData = [
    // nestArea,
    dronesInNDZ,
    dronesOutsideNDZ,
    nest,
    furthermostCorner,
    coordinatesOrigin,
  ]

  const plotLayout = {
    showlegend: false,
    autosize: false,
    width: 700,
    height: 700,
    title: 'Map of drones in NDZ',
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4,
    },
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    shapes: [
      {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        x0: 150,
        y0: 150,
        x1: 350,
        y1: 350,
        opacity: 0.2,

        fillcolor: 'orange',

        line: {
          color: 'orange',
        },
      },
    ],
  }

  const plotConfig = {
    displayModeBar: false,
    staticPlot: true,
  }

  return <Plot class="map column" data={plotData} layout={plotLayout} config={plotConfig} />
}

export default Map
