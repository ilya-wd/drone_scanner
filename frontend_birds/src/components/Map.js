import Plot from 'react-plotly.js'

const Map = ({ knownDrones, unknownDrones }) => {
  const dronesInNDZ = {
    type: 'scatter',
    mode: 'markers',
    x: [],
    y: [],
    marker: { color: 'red', size: [] },
    text: [],
    hovertemplate: '(%{y}, %{x}) <br>' + ' %{text}' + '<extra></extra>',
  }

  const nest = {
    type: 'scatter',
    mode: 'markers',
    x: [250],
    y: [250],
    marker: { color: 'blue', size: [10] },
    hovertemplate: '(%{y}, %{x}) <br>' + ' The Nest' + '<extra></extra>',
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

  if (knownDrones || unknownDrones) {
    knownDrones.concat(unknownDrones).map((drone) => {
      const xCoord = Math.round(drone.positionX / 1000)
      const yCoord = Math.round(drone.positionY / 1000)
      dronesInNDZ.x.push(xCoord)
      dronesInNDZ.y.push(yCoord)
      dronesInNDZ.marker.size.push(10)
      dronesInNDZ.text.push(`${drone.pilot.firstName} ${drone.pilot.lastName} `)
    })
  }

  const plotData = [dronesInNDZ, nest, furthermostCorner, coordinatesOrigin]

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
    staticPlot: false,
  }

  return <Plot class="map column" data={plotData} layout={plotLayout} config={plotConfig} />
}

export default Map
