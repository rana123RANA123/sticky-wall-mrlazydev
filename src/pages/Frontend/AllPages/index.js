import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Calendar from './Calendar'
import '../../../App.scss'
import Lists from './Lists'
import Stickywall from './Stickywall'
// import Home from '../Home/Hero'
import Personal from './Personal'
import Today from './Today'
import Work from './Work'
import Upcoming from './Upcoming'
// import Sidebarrr from '../../../components/Sidebarrr'
import Sidebar from '../../../components/Sidebar'
import MakeSticky from './MakeSticky'
import Updatetodo from './Updatatodo'
// import Sidebar from '../../../components/Sidebar'
// import Footer from '../../../components/Footer'


export default function Index() {
  return (
    <>
      <div style={{ position: "" }}>
        <Sidebar />
      </div>
      <div className='offset-2 col-10'>

        <Routes>
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/list1' element={<Lists />} />
          <Route path='/personal' element={<Personal />} />
          <Route path='/' element={<Stickywall />} />
          <Route path='/today' element={<Today />} />
          <Route path='/work' element={<Work />} />
          <Route path='/update/:id' element={<Updatetodo />} />
          <Route path='/makeSticky' element={<MakeSticky />} />
          <Route path='/upcoming' element={<Upcoming />} />
        </Routes>
      </div>
      {/* <Footer /> */}
      {/* </div> */}
    </>
  )
}
