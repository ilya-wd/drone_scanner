import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import { getInfo } from './services/birdApi'
import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

function App() {
  // const [data, setData] = useState([])

  // setData(getInfo)

  return (
    <div className="App">
      <div>Hi</div>
    </div>
  )
}

export default App
