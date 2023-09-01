import { message } from 'antd'
import { signOut } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { auth } from '../config/firebase'

export default function Sidebar() {

    const { dispatch } = useAuthContext()

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                message.success("Signout successful")
                dispatch({ type: "SET_LOGGED_OUT" })
            })
            .catch(err => {
                message.error("Signout not successful")
            })
    }

    return (
        // <main>
            // <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <div className="sidebar" style={{position:"fixed"}}>
                            <h6 className='fw-bold ps-3 pt-3'>TASKS</h6>
                            <Link to='/upcoming'>Upcoming</Link>
                            <Link to='/today'>Today</Link>
                            <Link to='/calendar'>Calendar</Link>
                            <Link to="/">Sticky Wall</Link>
                            <hr />
                            <h6 className='fw-bold ps-3 pt-3'>LISTS</h6>
                            <div><Link to='/personal'><span className='bg-danger me-2 text-danger rounded'> -- </span> Personal</Link></div>
                            <div><Link to='/work'><span className='bg-primary me-2 text-primary rounded'> -- </span> Work</Link></div>
                            <div><Link to='/list1'><span className='bg-warning me-2 text-warning rounded'> -- </span> List</Link></div>
                            <div className="container mt-5">
                                <div className="row mt-5">
                                    <div className="col mt-5">
                                        <div className="containe mt-5">
                                            <div className="row">
                                                <div className="col">
                                                    <button className='btn btn-danger' id='logout' onClick={handleLogout}>Logout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='col-10'> 
                        
                    <div/> */}
                </div>
            // </div>
        // </main>
    )
}
