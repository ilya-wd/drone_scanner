import Plot from 'react-plotly.js'

const Map = ({ knownDrones, unknownDrones }) => {
  const dronesInNDZ = {
    type: 'scatter',
    mode: 'markers',
    x: [],
    y: [],
    marker: { color: 'red', size: [] },
    text: [],
    hovertemplate: '%{text}' + '<extra></extra>',
  }

  const nest = {
    type: 'scatter',
    mode: 'markers',
    x: [250],
    y: [250],
    marker: { color: 'blue', size: [10] },
    hovertemplate: 'The Nest' + '<extra></extra>',
  }

  if (knownDrones || unknownDrones) {
    knownDrones.concat(unknownDrones).map((drone) => {
      const xCoord = Math.round(drone.positionX / 1000)
      const yCoord = Math.round(drone.positionY / 1000)
      dronesInNDZ.x.push(xCoord)
      dronesInNDZ.y.push(yCoord)
      dronesInNDZ.marker.size.push(10)
      const pilotName = drone.pilot
        ? `${drone.pilot.firstName} ${drone.pilot.lastName}`
        : 'Unknown pilot'
      dronesInNDZ.text.push(`${pilotName} ${Math.round(drone.currentDistance / 1000)}m`)
    })
  }

  const plotData = [dronesInNDZ, nest]

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
    xaxis: {
      visible: false,
    },
    yaxis: {
      visible: false,
    },
  }

  const plotConfig = {
    displayModeBar: false,
    staticPlot: false,
  }

  return <Plot className="map column" data={plotData} layout={plotLayout} config={plotConfig} />
}

export default Map
