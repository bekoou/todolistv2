import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Head from './head'

const Profile = () => {
  const { user: userName } = useParams()
  return (
    <div>
      <Head title="Hello" />
      <div id="title" className="mb-10 text-center">
        {' '}
        Profile
      </div>
      {/* eslint-disable-next-line react/button-has-type */}
      <button className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full">
        {' '}
        <Link to="/dashboard">Go To Root</Link>
      </button>
      {/* eslint-disable-next-line react/button-has-type */}
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-10">
        {' '}
        <Link to="/dashboard/main">Go To Main</Link>
      </button>
      <div id="username"> {userName}</div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile
