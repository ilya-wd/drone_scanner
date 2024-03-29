import Plot from 'react-plotly.js'
import PropTypes from 'prop-types'

const Map = ({ knownDrones, unknownDrones }) => {
  const dronesInNDZ = {
    type: 'scatter',
    mode: 'markers',
    x: [],
    y: [],
    marker: { color: 'red', size: [] },
    text: [],
    hovertemplate: '%{text}<extra></extra>',
  }

  const windowWidth = window.innerWidth

  const widthText =
    windowWidth < 1150 ? '[please increase your screen width]' : 'Map of drones in NDZ'

  const titleSize = windowWidth < 1140 ? 20 : 28

  const nest = {
    type: 'scatter',
    mode: 'markers',
    x: [250],
    y: [250],
    marker: { color: 'blue', size: [10] },
    hovertemplate: 'The Nest<extra></extra>',
  }

  if (knownDrones || unknownDrones) {
    knownDrones.concat(unknownDrones).forEach((drone) => {
      dronesInNDZ.x.push(drone.positionX)
      dronesInNDZ.y.push(drone.positionY)
      dronesInNDZ.marker.size.push(10)
      const pilotName = drone.pilot
        ? `${drone.pilot.firstName} ${drone.pilot.lastName}`
        : 'Unknown pilot'
      dronesInNDZ.text.push(`${pilotName} ${Math.round(drone.currentDistance)}m`)
    })
  }
  const plotData = [dronesInNDZ, nest]

  const plotLayout = {
    showlegend: false,
    autosize: true,
    width: 600,
    height: 600,
    title: {
      text: widthText,
      font: {
        size: titleSize,
        color: 'black',
      },
    },
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
    responsive: true,
  }

  return <Plot className="map column" data={plotData} layout={plotLayout} config={plotConfig} />
}

Map.propTypes = {
  knownDrones: PropTypes.array.isRequired,
  unknownDrones: PropTypes.array.isRequired,
}

export default Map
