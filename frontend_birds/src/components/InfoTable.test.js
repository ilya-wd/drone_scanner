import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import InfoTable from './InfoTable.js'
import { time, unknownDrones, knownDrones } from './testingDataForComponents'

describe('<InfoTable />', () => {
  test('renders known drones correctly', () => {
    render(<InfoTable knownDrones={knownDrones} unknownDrones={[]} time={time} />)
    expect(screen.getByText('Pilot One').textContent).toBe('Pilot One ')
    expect(screen.getByText('Pilot Three').textContent).toBe('Pilot Three ')
    expect(screen.queryAllByText('SN-unknown2')).toStrictEqual([])
  })
  test('renders unknown drones correctly', () => {
    render(<InfoTable knownDrones={[]} unknownDrones={unknownDrones} time={time} />)
    expect(screen.queryAllByText('Pilot One')).toStrictEqual([])
    expect(screen.queryAllByText('Pilot Three')).toStrictEqual([])
    expect(screen.queryByTestId('SN-unknown2 unknown').textContent).toContain('SN-unknown2')
  })

  test('renders the whole table correctly', () => {
    render(<InfoTable knownDrones={knownDrones} unknownDrones={unknownDrones} time={time} />)
    expect(screen.getByText('Pilot One').textContent).toBe('Pilot One ')
    expect(screen.getByText('Pilot Two').textContent).toBe('Pilot Two ')
    expect(screen.getByText('Pilot Three').textContent).toBe('Pilot Three ')
    expect(screen.queryByTestId('SN-unknown1 unknown').textContent).toContain('SN-unknown1')
    expect(screen.queryByTestId('SN-unknown2 unknown').textContent).toContain('SN-unknown2')
  })

  test('user can quickly write an email with a ready-made template', () => {
    const drone = knownDrones[0]
    render(<InfoTable knownDrones={knownDrones} unknownDrones={unknownDrones} time={time} />)
    const emailInfo = screen.queryByText(drone.pilot.email).getAttribute('href')
    expect(emailInfo).toEqual(
      'mailto:' +
        drone.pilot.email +
        '?cc=registry.mmm@gov.fi&subject=Your drone violated NDZ!&body=Friends of Monadikuikka society informs you...'
    )
  })
})
