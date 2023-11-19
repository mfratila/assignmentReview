import React from 'react'
import { useLocalState } from '../util/useLocalStorage'

const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <div className="App">
    <h1>Hello There</h1>
    <div> JWT value is: {jwt}</div>
  </div>
  )
}

export default Dashboard