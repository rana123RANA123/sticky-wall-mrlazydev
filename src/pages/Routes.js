import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend';
// import AllPages from './Frontend/AllPages'
import Auth from './Auth'
import { useAuthContext } from '../contexts/AuthContext'
// import MakeSticky from './Frontend/AllPages/MakeSticky'
import PrivateRoute from '../contexts/PrivateRoute'

export default function Index() {

  const { isAuth } = useAuthContext()


  return (
    <div className='example'>
      <Routes>
        {/* <Route path='/*' element={<AllPages />} /> */}
        <Route path='/*' element={<PrivateRoute Component={Frontend} />} />
        {/* <Route path='/makesticky' element={<MakeSticky />} /> */}
        <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>
    </div>
  )
}
