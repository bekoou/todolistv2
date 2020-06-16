import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'

const Dashboard = () => {
  return (
    <div>
      <Head title="Hello" />
      <div id="title" className="mb-10 text-center">
        {' '}
        Dashboard
      </div>
      {/* eslint-disable-next-line react/button-has-type */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        {' '}
        <Link to="/dashboard/profile/7ffsg-8trhfg-54bhhg-b70c-egfjiykjvF">Go To Profile</Link>
      </button>
      {/* eslint-disable-next-line react/button-has-type */}
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-10">
        {' '}
        <Link to="/dashboard/main">Go To Main</Link>
      </button>
    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard
