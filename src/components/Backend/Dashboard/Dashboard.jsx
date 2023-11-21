import React from 'react'
import './dashboard.scss'
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Link to="/">To User Page</Link>
    </div>
  )
}

export default Dashboard