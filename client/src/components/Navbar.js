import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({authenticated}) {
  return (
    <div className='navbar'>
        <div className='left-nav'>
            <p>Task Manager</p>
        </div>
        {authenticated?<div className='right-nav'>
            <div className='nav'>
            <Link to={"/"} className='btn'>Create Task</Link>
            </div>
            <div className='nav'>
            <Link to={"/tasks"} className='btn'>Task List</Link>
            </div>
            <div className='nav'>
            <Link to={"/logout"} className='btn btn-danger'>Logout</Link>
            </div>
        </div>:<div className='right-nav'>
            <div className='nav'>
            <Link to={"/register"} className='btn'>Register</Link>
            </div>
            <div className='nav'>
            <Link to={"/login"} className='btn'>Login</Link>
            </div>
        </div>}
    </div>
  )
}
