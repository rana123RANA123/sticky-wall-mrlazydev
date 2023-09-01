import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllPages from './AllPages'
import '../../App.scss'

export default function Index() {
  return (
    <>
    {/* <main> */}
    {/* <div className='mr-5'> */}

    <Routes>
        <Route path='/*' element={<AllPages />} />
    </Routes>
    {/* </div> */}
    {/* </main> */}
    </>
  )
}
