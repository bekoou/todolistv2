import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'

const Main = () => {
  return (
    <div>
      <Head title="Hello" />
      <div id="title" className="mb-10 text-center">
        {' '}
        Main
      </div>
      {/* eslint-disable-next-line react/button-has-type */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        {' '}
        <Link to="/dashboard/profile/7ffsg-8trhfg-54bhhg-b70c-egfjiykjvF">Go To Profile</Link>
      </button>
      {/* eslint-disable-next-line react/button-has-type */}
      <button className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full ml-10">
        {' '}
        <Link to="/dashboard">Go To Root</Link>
      </button>
    </div>
  )
}

Main.propTypes = {}

export default Main
